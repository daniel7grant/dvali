import { Failure, Success, ValidatorFunction } from '../../types';

const tryNumber = (): ValidatorFunction<number> => async (value, conf) => {
    const parsed = Number.parseFloat(value as any);
    if (!Number.isNaN(parsed)) {
        return Success(parsed);
    }
    return Failure(`Field ${conf.name} should be numeric.`);
};

export default tryNumber;
