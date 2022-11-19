import { ValidatorFunction } from '../../types.js';
import validateCondition from '../validateCondition.js';

const isBool = (): ValidatorFunction<unknown, boolean> =>
    validateCondition(
        (v) => v === true || v === false,
        (_, conf) => `Field ${conf.name} should be a boolean.`
    );

export default isBool;
