import { ValidatorFunction } from '../../types';
import validateCondition from '../validateCondition';

const isBool = (): ValidatorFunction<boolean> =>
    validateCondition(
        (v) => v === true || v === false,
        (_, conf) => `Field ${conf.name} should be a boolean.`
    );

export default isBool;
