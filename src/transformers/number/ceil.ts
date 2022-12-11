import { SyncValidatorFunction } from '../../types.js';

const ceil = (): SyncValidatorFunction<number, number> => (value, conf) => {
    return Math.ceil(value);
};

export default ceil;
