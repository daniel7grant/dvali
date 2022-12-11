import { SyncValidatorFunction } from '../../types.js';

const toBool = (): SyncValidatorFunction<unknown, boolean> => (value) => {
    return !!value;
};

export default toBool;
