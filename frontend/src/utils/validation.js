export const validateEmail = (email) => {
    const errors = [];
    if (!email) {
        errors.push('Bạn cần nhập Email');
    }
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.push('Email không hợp lệ');
    }
    return {
        isValid: errors.length === 0,
        errors
    };
};
export const validatePassword = (password) => {
    const errors = [];
    if (!password) {
        errors.push('Bạn cần nhập Mật khẩu');
    }
    else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password)) {
        errors.push('Mật khẩu không hợp lệ');
    }
    return {
        isValid: errors.length === 0,
        errors
    };
};
export const validateName = (name) => {
    const errors = [];
    if (!name) {
        errors.push('Bạn cần nhập Tên');
    }
    else if (name.length < 2) {
        errors.push('Tên phải có ít nhất 2 ký tự');
    }
    return {
        isValid: errors.length === 0,
        errors
    };
};
export const validateAuthForm = (data, mode) => {
    const errors = [];
    if (mode == 'register') {
        const nameValidation = validateName(data.name || '');
        if (!nameValidation.isValid) {
            errors.push(...nameValidation.errors);
        }
    }
    const emailValidation = validateEmail(data.email);
    if (!emailValidation.isValid) {
        errors.push(...emailValidation.errors);
    }
    const passwordValidation = validatePassword(data.password);
    if (!passwordValidation.isValid) {
        errors.push(...passwordValidation.errors);
    }
    return {
        isValid: errors.length === 0,
        errors
    };
};
