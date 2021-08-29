import { Failure, Ignore, Success, ValidatorFunction } from '../../types';

const length = (n: number): ValidatorFunction<string> => async (value, conf) => {
    if (typeof value !== 'string') {
        return Ignore();
    }
    
    if (value.length === n) {
        return Success();
    }
    return Failure(`Field ${conf.name} length should be exactly ${n} characters.`)
};

export default length;
