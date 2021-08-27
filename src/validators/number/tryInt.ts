import { Failure, Success, ValidatorFunction } from '../../types';

const tryInt = (): ValidatorFunction<number> => async (value, conf) => {
    const parsed = Number.parseInt(value as any);
    if (!Number.isNaN(parsed)) {
        return Success(parsed);
    }
    return Failure(`Field ${conf.name} should be an integer.`)
};

export default tryInt;
