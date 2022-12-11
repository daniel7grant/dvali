import { Ignore, Success, SyncValidatorFunction } from '../../types.js';

const floor = (): SyncValidatorFunction<number, number> => (value, conf) => {
    return Success(Math.floor(value));
};

export default floor;
