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
    app_name: string;
    user_id: number;
    session_id: string;
    idea_id?: number;
    new_message: {
        role: 'user',
        parts: Array<{text: string}>
    }
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
