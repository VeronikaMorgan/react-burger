export const nameValidator = (name: string): boolean => name.length > 5
export const emailValidator = (email: string): boolean => !!email.match(/^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i);
export const passwordValidator = (password: string): boolean => password.length > 5;
export const codeValidator = (code: string): boolean => !!code.match(/^[a-z0-9]{8}-([a-z0-9]{4}-){3}[a-z0-9]{12}$/)
