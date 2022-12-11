import { Failure, Ignore, Success, SyncValidatorFunction } from '../../types.js';

const between: (
    min: number,
    max: number,
    opts?: { minInclusive?: boolean; maxInclusive?: boolean }
) => SyncValidatorFunction<number, number> =
    (min, max, opts = { minInclusive: false, maxInclusive: false }) =>
    (value, conf) => {
        if (
            ((opts.minInclusive && value >= min) || (!opts.minInclusive && value > min)) &&
            ((opts.maxInclusive && value <= max) || (!opts.maxInclusive && value < max))
        ) {
            return Success(value);
        }

        return Failure(`Field ${conf.name} should be between ${min} and ${max}.`);
    };

export default between;
