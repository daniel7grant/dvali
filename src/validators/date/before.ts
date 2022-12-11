import { Failure, Ignore, Success, SyncValidatorFunction } from '../../types.js';

const before: (
    date: string | number | Date,
    opts?: { inclusive?: boolean }
) => SyncValidatorFunction<Date, Date> =
    (date, opts = { inclusive: false }) =>
    (value, conf) => {
        const max = date instanceof Date ? date : new Date(date);

        if ((opts.inclusive && value <= max) || (!opts.inclusive && value < max)) {
            return Success(value);
        }

        return Failure(`Field ${conf.name} should be before ${max.toString()}.`);
    };

export default before;
