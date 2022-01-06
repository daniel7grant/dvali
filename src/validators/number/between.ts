import { Failure, Ignore, Success, ValidatorFunction } from '../../types.js';

const between: (
    min: number,
    max: number,
    opts?: { minInclusive?: boolean; maxInclusive?: boolean }
) => ValidatorFunction<number> =
    (min, max, opts = { minInclusive: false, maxInclusive: false }) =>
    (value, conf) => {
        if (typeof value !== 'number' || Number.isNaN(value)) {
            return Ignore();
        }

        if (
            ((opts.minInclusive && value >= min) || (!opts.minInclusive && value > min)) &&
            ((opts.maxInclusive && value <= max) || (!opts.maxInclusive && value < max))
        ) {
            return Success();
        }

        return Failure(`Field ${conf.name} should be between ${min} and ${max}.`);
    };

export default between;
