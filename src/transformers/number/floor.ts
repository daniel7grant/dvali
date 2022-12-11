import { SyncValidatorFunction } from '../../types.js';

const floor = (): SyncValidatorFunction<number, number> => (value, conf) => {
    return Math.floor(value);
};

export default floor;
