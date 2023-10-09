import { SyncValidatorFunction } from '../../types.js';

const round = ():SyncValidatorFunction<number, number> => (value, conf) => {
    return Math.round(value);
};

export default round;
