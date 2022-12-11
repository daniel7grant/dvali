import { SyncValidatorFunction } from '../../types.js';

const toInt = (): SyncValidatorFunction<unknown, number> => (value) => {
    return Number.parseInt(value as any);
};

export default toInt;
