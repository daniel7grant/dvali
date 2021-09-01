import { Success, ValidatorFunction } from '../../types';

const toString = (): ValidatorFunction<string> => (value, conf) => {
    return Success("" + value);
};

export default toString;
