import { Failure, Ignore, Success, SyncValidatorFunction } from '../../types.js';

const closeTo: (v: number, e?: number) => SyncValidatorFunction<number, number> =
    (exactValue, epsilon = Number.EPSILON) =>
    (value, conf) => {
        if (Math.abs(value - exactValue) < epsilon) {
            return Success(exactValue);
        }
        return Failure(`Field ${conf.name} should be approximately ${exactValue}.`);
    };

export default closeTo;
