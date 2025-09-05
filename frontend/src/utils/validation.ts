export interface ValidationResult {
    isValid: boolean;
    errors: string[];
}

export const validateEmail = (email: string): ValidationResult => {
    const errors: string[] = [];

    if (!email) {
        errors.push('Bạn cần nhập Email');
    } else if (!/^[^\s@]+@[^\s@]+.[^\s@]+$/.test(email)) {
        errors.push('Email không hợp lệ');
    }

    return {
        isValid: errors.length === 0,
        errors
    };
};

export const validatePassword = (password: string): ValidationResult => {
    const errors: string[] = [];

    if (!password) {
        errors.push('Bạn cần nhập Mật khẩu');
    } else if (password.length < 8) {
        errors.push('Mật khẩu phải có ít nhất 8 ký tự');
    }

    return {
        isValid: errors.length === 0,
        errors
    };
};

export const validateName = (name: string): ValidationResult => {
    const errors: string[] = [];

    if (!name) {
        errors.push('Bạn cần nhập Tên');
    } else if (name.length < 2) {
        errors.push('Tên phải có ít nhất 2 ký tự');
    }

    return {
        isValid: errors.length === 0,
        errors
    };
};

export const validateAuthForm = (data: {
    email: string;
    password: string;
    name?: string;
}, mode: 'login' | 'register'): ValidationResult => {
    const errors: string[] = [];

    const emailValidation = validateEmail(data.email);
    if (!emailValidation.isValid) {
        errors.push(...emailValidation.errors);
    }

    const passwordValidation = validatePassword(data.password);
    if (!passwordValidation.isValid) {
        errors.push(...passwordValidation.errors);
    }

    if (mode == 'register') {
        const nameValidation = validateName(data.name || '');
        if (!nameValidation.isValid) {
            errors.push(...nameValidation.errors);
        }
    }

    return {
        isValid: errors.length === 0,
        errors
    };
}