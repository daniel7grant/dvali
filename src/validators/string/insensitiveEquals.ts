import { Failure, Ignore, Success, ValidatorFunctionAsync } from '../../types.js';

const insensitiveEquals =
    (to: string): ValidatorFunctionAsync<string> =>
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
