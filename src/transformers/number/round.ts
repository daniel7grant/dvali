import { Success, SyncValidatorFunction } from '../../types.js';

const round = ():SyncValidatorFunction<number, number> => (value, conf) => {
    return Success(Math.round(value));
};

export default round;
