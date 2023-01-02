import { SyncValidatorFunction } from '../../types.js';

const toInt = (): SyncValidatorFunction<unknown, number> => (value) => {
    return Number.parseInt(value as string);
};

export default toInt;
