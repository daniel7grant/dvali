import { Failure, Ignore, Success, SyncValidatorFunction } from '../../types.js';

const betweenLength =
    (min: number, max: number): SyncValidatorFunction<unknown, string> =>
    (value, conf) => {
        if (typeof value !== 'string') {
            return Ignore();
        }

        const minLength = Math.min(min, max);
        const maxLength = Math.max(min, max);
        if (minLength <= value.length && value.length <= maxLength) {
            return Success();
        }
        return Failure(
            `Field ${conf.name} length should be between ${minLength} and ${maxLength} characters.`
        );
    };

export default betweenLength;
