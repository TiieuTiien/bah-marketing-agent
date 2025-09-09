export interface User {
    user_id: string;
    email: string;
    username: string;
}

export interface AuthFormData {
    email: string;
    password: string;
    name?: string;
}

export type AuthMode = 'login' | 'register';