export interface AIMessage {
    role: 'user' | 'assistant';
    content: string;
    timestamp: string;
    audioPath?: string;
}

export interface AgentLog {
    log_id: number;
    idea_id: number;
    user_prompt: string;
    ai_response: string;
    timestamp: string;
}

export interface ChatRequest {
    appName: string;
    userId: string;
    sessionId: string;
    newMessage: {
        role: string;
        parts: Array<{
            text?: string;
            videoMetadata?: {
                fps?: number;
                startOffset?: string;
                endOffset?: string;
            };
            thought?: boolean;
            inlineData?: {
                displayName?: string;
                data?: string;
                mimeType?: string;
            };
            fileData?: {
                displayName?: string;
                fileUri?: string;
                mimeType?: string;
            };
            thoughtSignature?: string;
            functionCall?: {
                id?: string;
                name?: string;
                args?: Record<string, any>;
            };
            codeExecutionResult?: {
                outcome?: string;
                output?: string;
            };
            executableCode?: {
                code?: string;
                language?: string;
            };
            functionResponse?: {
                willContinue?: boolean;
                scheduling?: string;
                id?: string;
                name?: string;
                response?: Record<string, any>;
            };
        }>;
    };
    streaming?: boolean;
    stateDelta?: Record<string, any>;
}

export interface ADKPart {
    text?: string;
    functionResponse?: {
        name: string;
        response: {
            result: {
                content: Array<{ text: string }>
            }
        }
    }
}

export interface ADKContent {
    role: 'model' | 'user';
    parts: ADKPart[];
}

export interface ADKEvent {
    content: ADKContent;
}

export interface AISession {
    session_id: string;
    user_id: number;
    idea_id?: string;
    created_at: string;
}
