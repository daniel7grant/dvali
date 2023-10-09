import { SyncValidatorFunction } from '../../types.js';

const closeTo: (v: number, e?: number) => SyncValidatorFunction<number, number> =
    (exactValue, epsilon = Number.EPSILON) =>
    (value, conf) => {
        if (Math.abs(value - exactValue) < epsilon) {
            return exactValue;
        }
        throw `Field ${conf.name} should be approximately ${exactValue}.`
    };

export default closeTo;
