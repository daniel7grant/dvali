import { Failure, Ignore, Success, ValidatorFunction } from '../../types';

const lt =
    (max: number): ValidatorFunction<number> =>
    async (value, conf) => {
        if (typeof value !== 'number' || Number.isNaN(value)) {
            return Ignore();
        }

        if (value < max) {
            return Success();
        }

        return Failure(`Field ${conf.name} should be less than ${max}.`);
    };

export default lt;
