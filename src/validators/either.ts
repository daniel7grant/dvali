import { Success, Validator, ValidatorFunction } from '../types.js';
import validate from '../validate.js';

const either =
    <T, U>(validatorT: Validator<T>, validatorU: Validator<U>): ValidatorFunction<T | U> =>
    async (value, conf) => {
        const [valueT, valueU] = await Promise.allSettled([
            validate(validatorT, conf)(value, conf),
            validate(validatorU, conf)(value, conf),
        ]);
        if (valueT.status === 'fulfilled') {
            return Success(valueT.value);
        }
        if (valueU.status === 'fulfilled') {
            return Success(valueU.value);
        }
        throw [].concat(valueT.reason).concat(valueU.reason);
    };

export default either;
