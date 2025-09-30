import { ADKEvent, AgentLog, AIMessage, ChatRequest } from "@/types/aiagent";
import axios from "axios";
import { handleError } from "@/helpers/ErrorHandler";

const API_BASE_URL = import.meta.env.VITE_AI_API_URL || 'http://127.0.0.1:8000';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
const APP_NAME = 'book_review_agent';

const aiApiClient = axios.create({
    baseURL: API_BASE_URL,
    timeout: 180000,
    headers: {
        'Content-Type': 'application/json'
    }
});

interface SessionState {
    [key: string]: any;
}

interface SessionRequest {
    state?: SessionState;
    events?: ADKEvent[];
}

interface SessionResponse {
    id: string;
    appName: string;
    userId: number;
    state: SessionState;
    events: ADKEvent[];
    lastUpdateTime: number;
}

export const aiApi = {
    createAISession: async (userId: number, ideaId?: number): Promise<number> => {
        try {
            const payload: SessionRequest = {
                state: {
                    ideaId: ideaId || undefined
                },
                events: []
            };

            const response = await aiApiClient.post<SessionResponse>(
                `/apps/${APP_NAME}/users/${userId}/sessions/${ideaId}`,
                payload
            );

            return parseInt(response.data.id);
        } catch (error) {
            handleError(error)
            console.error("Failed to create AI session: ", error);
            throw new Error('Không thể tạo phiên chat với AI');
        }
    },

    deleteSession: async (userId: number, ideaId: number): Promise<void> => {
        await aiApiClient.delete(`/apps/${APP_NAME}/users/${userId}/sessions/${ideaId}`);
    },

    sendMessageToAI: async (
        userId: number,
        sessionId: number,
        message: string,
    ): Promise<AIMessage[]> => {
        const payload: ChatRequest = {
            appName: APP_NAME,
            userId: String(userId),
            sessionId: sessionId.toString(),
            newMessage: {
                role: 'user',
                parts: [{ text: message }]
            },
        };

        try {
            const response = await aiApiClient.post('/run', payload);
            const events: ADKEvent[] = response.data;
            console.log("Events from /run:", events);
            const aiMessages: AIMessage[] = [];
            let audioFilePath: string | undefined;

            for (const event of events) {
                // Defensive: check event.content and event.content.parts
                const content = event.content;
                const part = content?.parts && Array.isArray(content.parts) ? content.parts[0] : undefined;

                // Parse model/assistant text
                if (content?.role === 'model' && part?.text) {
                    aiMessages.push({
                        role: 'assistant',
                        content: part.text,
                        audioPath: undefined,
                        timestamp: event.timestamp ? new Date(event.timestamp * 1000).toISOString() : new Date().toISOString(),
                    });
                }

                // Parse functionResponse for audioPath
                if (part?.functionResponse) {
                    const responseText = part.functionResponse?.response?.result?.content?.[0]?.text;
                    if (responseText && responseText.includes("File saved as:")) {
                        audioFilePath = responseText.split("File saved as:")[1]?.trim().split(/\s+/)[0]?.replace('.', '');
                    }
                }
            }

            // If any message needs audioPath, update it
            if (audioFilePath && aiMessages.length > 0) {
                aiMessages[aiMessages.length - 1].audioPath = audioFilePath;
            }

            if (aiMessages.length === 0) {
                throw new Error('Không nhận được phản hồi từ AI');
            }

            // No need to save agent log, all history is managed by session API

            return aiMessages;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error("Failed to send message to AI: ", error);
            }
            throw new Error('Không thể gửi tin nhắn đến AI');
        }
    },

    listSessionId: async (userId: number): Promise<number[]> => {
        try {
            const response = await aiApiClient.get(`/apps/${APP_NAME}/users/${userId}/sessions`)
            if (Array.isArray(response.data)) {
                return response.data.map((session: any) => Number(session.id))
            }
            return []
        } catch (error) {
            handleError(error);
            return []
        }
    },

    getSessionLogs: async (userId: number, sessionId: string): Promise<AIMessage[]> => {
        try {
            const response = await aiApiClient.get(`/apps/${APP_NAME}/users/${userId}/sessions/${sessionId}`);
            const events: ADKEvent[] = response.data.events;

            const messages: AIMessage[] = events.map(event => {
                const part = event.content?.parts?.[0];
                let isAgent = false;
                let contentText = part?.text || "";

                // Step 1: Check author
                if ((event as any)?.author && (event as any).author !== 'user') {
                    isAgent = true;
                }

                // Step 2: If agent, handle functionResponse/functionCall/text
                if (isAgent) {
                    if (part?.functionResponse) {
                        const agentName = (event as any)?.actions?.transferToAgent || "";
                        contentText = `Chuyển hướng đến trợ lý ${agentName}`;
                    } else if (part?.functionCall) {
                        const funcCall = (part as any).functionCall;
                        console.log();
                        if (funcCall.args && Object.keys(funcCall.args).length > 0) {
                            contentText = `Thực hiện tác vụ: ${funcCall.name} với tham số ${JSON.stringify(funcCall.args)}`;
                        } else {
                            contentText = `Thực hiện tác vụ: ${funcCall.name}`;
                        }
                    } else if (contentText === "") {
                        contentText = "(Agent event không có nội dung)";
                    }
                } else {
                    // User message: only show text
                    if (!contentText) {
                        contentText = "";
                    }
                }

                return {
                    role: isAgent ? "assistant" : "user",
                    content: contentText,
                    timestamp: event.timestamp ? new Date(event.timestamp * 1000).toISOString() : new Date().toISOString(),
                };
            });

            return messages;
        } catch (error) {
            throw new Error('Không thể lấy log cuộc trò chuyện');
        }
    },
};