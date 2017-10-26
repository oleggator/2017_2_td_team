import View from '../view/index.js';
import Button from '../../blocks/button/button.js';
import Form from '../../blocks/form/form.js';
import SubmitButton from '../../blocks/form/__submit-button/form__submit-button.js';
import InputBlock from '../../blocks/form/__input-block/form__input-block.js';
import UserService from '../../services/user-service.js';
import Auth from '../../modules/auth.js';
import {globalEventBus} from '../../modules/globalEventBus.js';
import {SigninButton, SigninFields} from '../../configs/signin-fields.js';

export default class SigninView extends View {
    render() {
        const signinButton = new SubmitButton(SigninButton);
        const signinInputs = Array.from(SigninFields.values()).map(field => new InputBlock(field));
        this.signinForm = new Form(signinButton, signinInputs, {action: '', method: 'post'}, ['default-form', 'box']);

        const toSignupButton = new Button({
            attrs: {
                type: 'button',
                href: '/signup'
            },
            text: 'Sign Up',
            classes: ['form__submit-button'],
        });
        this.signinForm.append(toSignupButton);

        this.signinForm.injectTo(this._element);
        this.signinForm.onSubmit(formdata => {
            Auth
                .requestSignIn(formdata)
                .then(user => {
                    UserService.currentUser = user;

                    this.signinForm.reset();
                    globalEventBus.emit('router:redirect', {path: '/'});
                })
                .catch(err => {
                    err.incorrectRequestDataErrors.forEach(err => {
                        let inputName = '';

                        switch (err.fieldName) {
                            case 'email':
                                inputName = 'email-field';
                                break;
                            case 'password':
                                inputName = 'password-field';
                                break;
                        }

                        this.signinForm._element[inputName].setCustomValidity(err.description);
                        this.signinForm._element[inputName].reportValidity();
                    });
                });
        });

        this.signinForm.onInput(input => {
            if (input.value) {
                input.setCustomValidity('');
            } else {
                input.setCustomValidity('Field is empty');
            }
        });
    }

    start() {

    }
}