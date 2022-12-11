import { Success, SyncValidatorFunction } from '../../types.js';

const ceil = (): SyncValidatorFunction<number, number> => (value, conf) => {
    return Success(Math.ceil(value));
};

export default ceil;
