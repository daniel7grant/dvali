import { validate } from './dvali';
import { required, isEmail, minLength, containsAlpha, containsNumber, isUrl } from './validators';

const validateAddress = validate({
    city: required(),
    street: required(),
});

const validateUser = validate({
    email: [required(), isEmail()],
    password: [required(), minLength(8), containsAlpha(), containsNumber()],
    picture: [isUrl()],
    address: validateAddress
});

const validations = validateUser({
    email: 'asd@asd.asd',
    password: 'asdasd69',
    picture: 'http://asd.as/',
    address: {
        city: 'asdasd',
        street: 'dsadsa',
    },
});

validations.then((p) => console.log(p)).catch((p) => console.log(p));
