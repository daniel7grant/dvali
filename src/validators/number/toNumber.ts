import { SyncValidatorFunction } from '../../types.js';

const toNumber = (): SyncValidatorFunction<unknown, number> => (value, conf) => {
    return Number.parseFloat(value as string);
};

export default toNumber;
