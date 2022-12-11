import { Failure, Ignore, Success, SyncValidatorFunction } from '../../types.js';

const inRange: (
    minDate: string | number | Date,
    maxDate: string | number | Date,
    opts?: { minInclusive?: boolean; maxInclusive?: boolean }
) => SyncValidatorFunction<Date, Date> =
    (minDate, maxDate, opts = { minInclusive: false, maxInclusive: false }) =>
    (value, conf) => {
        const min = minDate instanceof Date ? minDate : new Date(minDate);
        const max = maxDate instanceof Date ? maxDate : new Date(maxDate);

        if (
            ((opts.minInclusive && value >= min) || (!opts.minInclusive && value > min)) &&
            ((opts.maxInclusive && value <= max) || (!opts.maxInclusive && value < max))
        ) {
            return Success(value);
        }

        return Failure(
            `Field ${conf.name} should be between ${min.toString()} and ${max.toString()}.`
        );
    };

export default inRange;
