import { Success, SyncValidatorFunction } from '../../types.js';

const toBool = (): SyncValidatorFunction<unknown, boolean> => (value) => {
    return Success(!!value);
};

export default toBool;
