import { Success, SyncValidatorFunction } from '../../types.js';

const toInt = (): SyncValidatorFunction<unknown, number> => (value) => {
    return Success(Number.parseInt(value as any));
};

export default toInt;
