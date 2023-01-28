export const nameValidator = (name) => name.length > 5
export const emailValidator = (email) => !!email.match(/^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i);
export const passwordValidator = (password) => password.length > 5;