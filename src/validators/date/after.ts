import { SyncValidatorFunction } from '../../types.js';

const after: (
    date: string | number | Date,
    opts?: { inclusive: boolean }
) => SyncValidatorFunction<Date, Date> =
    (date, opts = { inclusive: false }) =>
    (value, conf) => {
        const min = date instanceof Date ? date : new Date(date);

        if ((opts.inclusive && value >= min) || (!opts.inclusive && value > min)) {
            return value;
        }

        throw `Field ${conf.name} should be after ${min.toString()}.`
    };

export default after;
