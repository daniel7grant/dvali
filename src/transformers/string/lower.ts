import { Ignore, Success, SyncValidatorFunction } from '../../types.js';

const lower = (): SyncValidatorFunction<string, string> => (value, conf) => {
    return Success(value.toLocaleLowerCase());
};

export default lower;
