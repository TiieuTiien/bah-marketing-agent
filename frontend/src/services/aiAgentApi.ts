

import { ADKEvent, AgentLog, AIMessage, ChatRequest } from "@/types/aiagent";
import axios from "axios";
import { mockAgentApi } from "./mockApi";

const API_BASE_URL = import.meta.env.VITE_AI_API_URL || 'http://127.0.0.1:8000';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
const APP_NAME = 'book_review_agent';

const aiApiClient = axios.create({
    baseURL: API_BASE_URL,
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json'
    }
});

const backendApiClient = axios.create({
    baseURL: API_URL,
    timeout: 10000,
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
    createAISession: async (userId: number, ideaId?: number): Promise<string> => {
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

            return response.data.id;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error("Failed to create AI session: ", error.response?.data?.detail);
            }
            throw new Error('Không thể tạo phiên chat với AI');
        }
    },

    sendMessageToAI: async (
        userId: number,
        sessionId: string,
        message: string,
        ideaId?: number,
    ): Promise<AIMessage> => {
        const payload: ChatRequest = {
            app_name: APP_NAME,
            user_id: userId,
            session_id: sessionId,
            idea_id: ideaId,
            new_message: {
                role: 'user',
                parts: [{ text: message }]
            }
        };

        try {
            const response = await aiApiClient.post('/run', payload);
            const events: ADKEvent[] = response.data;

            let assistantText: string | undefined;
            let audioFilePath: string | undefined;

            for (const event of events) {
                const part = event.content?.parts?.[0];
                if (!part) continue;

                if (event.content.role === 'model' && part.text) {
                    assistantText = part.text;
                }

                if (part.functionResponse) {
                    const responseText = part.functionResponse.response.result.content[0]?.text;
                    if (responseText && responseText.includes("File saved as:")) {
                        audioFilePath = responseText.split("File saved as:")[1]?.trim().split(/\s+/)[0]?.replace('.', '');
                    }
                }
            }

            if (!assistantText) {
                throw new Error('Không nhận được phản hồi từ AI');
            }

            const aiMessage: AIMessage = {
                role: 'assistant',
                content: assistantText,
                audioPath: audioFilePath,
                timestamp: new Date().toISOString(),
            };

            if (ideaId) {
                await aiAgentApi.saveAgentLog(ideaId, message, assistantText);
            }

            return aiMessage;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error("Failed to send message to AI: ", error.response?.data?.detail);
            }
            throw new Error('Không thể gửi tin nhắn đến AI');
        }
    },
};

const USE_MOCK_API = true;

export const aiAgentApi = USE_MOCK_API ? mockAgentApi : {
    saveAgentLog: async (
        ideaId: number,
        userPrompt: string,
        aiResponse: string
    ): Promise<void> => {
        try {
            await backendApiClient.post('/agent-logs', {
                idea_id: ideaId,
                user_prompt: userPrompt,
                ai_response: aiResponse,
                timestamp: new Date().toISOString(),
            });
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error("Failed to save agent log: ", error.response?.data?.detail);
            }
        }
    },

    getAgentLogs: async (ideaId: number): Promise<AgentLog[]> => {
        try {
            const response = await backendApiClient.get(`/ideas/${ideaId}/agent-logs`);
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error("Failed to get agent logs: ", error.response?.data?.detail);
            }
            return [];
        }
    },

    clearAgentLogs: async (ideaId: number): Promise<void> => {
        try {
            await backendApiClient.delete(`/ideas/${ideaId}/agent-logs`);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error("Failed to clear agent logs: ", error.response?.data?.detail);
            }
            throw new Error('Không thể xóa lịch sử chat');
        }
    },
};