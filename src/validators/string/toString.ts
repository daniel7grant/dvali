import { Success, ValidatorFunctionAsync } from '../../types.js';

const toString = (): ValidatorFunctionAsync<string> => (value, conf) => {
    return Success('' + value);
};

export default toString;
