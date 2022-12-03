import { Success, SyncValidatorFunction } from '../../types.js';

const toNumber = (): SyncValidatorFunction<unknown, number> => (value, conf) => {
    return Success(Number.parseFloat(value as any));
};

export default toNumber;
