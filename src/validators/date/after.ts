import { Failure, Ignore, Success, ValidatorFunction } from '../../types';

const after: (
    date: string | number | Date,
    opts?: { inclusive: boolean }
) => ValidatorFunction<Date> =
    (date, opts = { inclusive: false }) =>
    (value, conf) => {
        if (!(value instanceof Date)) {
            return Ignore();
        }

        const min = date instanceof Date ? date : new Date(date);
        if ((opts.inclusive && value >= min) || (!opts.inclusive && value > min)) {
            return Success();
        }

        return Failure(`Field ${conf.name} should be after ${min.toString()}.`);
    };

export default after;
