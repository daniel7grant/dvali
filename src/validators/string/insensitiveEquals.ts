import { Failure, Ignore, Success, ValidatorFunction } from '../../types.js';

const insensitiveEquals =
    (to: string): ValidatorFunction<string> =>
    (value, conf) => {
        if (typeof value !== 'string') {
            return Ignore();
        }
        if (value.toLocaleLowerCase() === to.toLocaleLowerCase()) {
            return Success();
        }
        return Failure(`Field ${conf.name} should be equal to ${to}.`);
    };

export default insensitiveEquals;
