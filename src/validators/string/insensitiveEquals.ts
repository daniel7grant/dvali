import { Failure, Success, SyncValidatorFunction } from '../../types.js';

const insensitiveEquals =
    (to: string): SyncValidatorFunction<string, string> =>
    (value, conf) => {
        if (value.toLocaleLowerCase() === to.toLocaleLowerCase()) {
            return Success(value);
        }
        return Failure(`Field ${conf.name} should be equal to ${to}.`);
    };

export default insensitiveEquals;
