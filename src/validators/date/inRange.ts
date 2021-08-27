import { Failure, Ignore, Success, ValidatorFunction } from '../../types';

const inRange: (
    minDate: string | number | Date,
    maxDate: string | number | Date,
    opts?: { minInclusive?: boolean; maxInclusive?: boolean }
) => ValidatorFunction<Date> =
    (
        minDate,
        maxDate,
        opts = { minInclusive : false, maxInclusive : false }
    ): ValidatorFunction<Date> =>
    async (value, conf) => {
        if (!(value instanceof Date)) {
            return Ignore();
        }

        const min = minDate instanceof Date ? minDate : new Date(minDate);
        const max = maxDate instanceof Date ? maxDate : new Date(maxDate);

        if (
            ((opts.minInclusive && value >= min) || (!opts.minInclusive && value > min)) &&
            ((opts.maxInclusive && value <= max) || (!opts.maxInclusive && value < max))
        ) {
            return Success();
        }

        return Failure(
            `Field ${conf.name} should be between ${min.toString()} and ${max.toString()}.`
        );
    };

export default inRange;
