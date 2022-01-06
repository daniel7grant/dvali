import { Failure, Ignore, Success, ValidatorFunction } from '../../types.js';

const closeTo: (v: number, e?: number) => ValidatorFunction<number> =
    (exactValue, epsilon = Number.EPSILON) =>
    (value, conf) => {
        if (typeof value !== 'number') {
            return Ignore();
        }
        if (Math.abs(value - exactValue) < epsilon) {
            return Success(exactValue);
        }
        return Failure(`Field ${conf.name} should be approximately ${exactValue}.`);
    };

export default closeTo;
