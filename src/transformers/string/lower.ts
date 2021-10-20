import { Ignore, Success, ValidatorFunction } from '../../types';

const lower = (): ValidatorFunction<string> => (value, conf) => {
    if (typeof value !== 'string') {
        return Ignore();
    }
    return Success(value.toLocaleLowerCase());
};

export default lower;
