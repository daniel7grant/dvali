import { ValidatorFunctionAsync } from '../../types.js';
import validateCondition from '../validateCondition.js';

const falsey = (): ValidatorFunctionAsync<boolean> =>
    validateCondition(
        (value) => !value,
        (_, conf) => `Field ${conf.name} should be falsey.`
    );

export default falsey;
