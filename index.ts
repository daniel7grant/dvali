import { validateObject } from './dvali';
import { required, isEmail, minLength, containsAlpha, containsNumber, isUrl } from './validators';

const validateUser = validateObject({
    email: [required(), isEmail()],
    password: [required(), minLength(8), containsAlpha(), containsNumber()],
    picture: [isUrl()],
    address: {
        city: [required()],
        street: [required()],
    },
});

const validations = validateUser({
    email: 'asd@asd.asd',
    password: 'asdasd',
    picture: '',
    address: {
        city: 'asdasd',
        street: 'dsadsa',
    },
});

validations.then((p) => console.log(p));
