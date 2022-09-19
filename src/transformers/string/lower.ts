import { Ignore, Success, ValidatorFunctionAsync } from '../../types.js';

const lower = (): ValidatorFunctionAsync<string> => (value, conf) => {
    if (typeof value !== 'string') {
        return Ignore();
    }
    return Success(value.toLocaleLowerCase());
};

export default lower;
