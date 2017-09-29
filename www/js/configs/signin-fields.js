export const SigninFields = new Map([
    ['EmailField', {
        type: 'email',
        label: 'E-Mail',
        name: 'email-field',
        classes: ['input-block'],
    }],
    ['PasswordField', {
        type: 'password',
        label: 'Password',
        name: 'password-field',
        classes: ['input-block'],
    }],
]);

export const SigninButton = {
    attrs: {
        type: 'submit'
    },
    text: 'Sign In',
    classes: ['button', 'form-button'],
};
