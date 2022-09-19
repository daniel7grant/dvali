import { Failure, Ignore, Success, ValidatorFunctionAsync } from '../../types.js';

const before: (
    date: string | number | Date,
    opts?: { inclusive?: boolean }
) => ValidatorFunctionAsync<Date> =
    (date, opts = { inclusive: false }): ValidatorFunctionAsync<Date> =>
    (value, conf) => {
        if (!(value instanceof Date)) {
            return Ignore();
        }

        const max = date instanceof Date ? date : new Date(date);

        if ((opts.inclusive && value <= max) || (!opts.inclusive && value < max)) {
            return Success();
        }

        return Failure(`Field ${conf.name} should be before ${max.toString()}.`);
    };

export default before;
