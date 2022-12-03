import { Failure, Success, SyncValidatorFunction } from '../../types.js';

const tryInt = (): SyncValidatorFunction<unknown, number> => (value, conf) => {
    const parsed = Number.parseInt(value as any);
    if (!Number.isNaN(parsed)) {
        return Success(parsed);
    }
    return Failure(`Field ${conf.name} should be an integer.`);
};

export default tryInt;
