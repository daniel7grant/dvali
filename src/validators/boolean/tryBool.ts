import { Failure, Success, SyncValidatorFunction } from '../../types.js';

const tryBool: (t?: any[], f?: any[]) => SyncValidatorFunction<unknown, boolean> =
    (truthy = [true, 1], falsey = [false, 0]) =>
    (value, conf) => {
        if (truthy.indexOf(value) !== -1) {
            return Success(true);
        }
        if (falsey.indexOf(value) !== -1) {
            return Success(false);
        }
        throw Failure(`Field ${conf.name} cannot be converted to boolean.`);
    };

export default tryBool;
