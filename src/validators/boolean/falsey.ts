import { ValidatorFunction } from '../../types.js';
import validateCondition from '../validateCondition.js';

const falsey = (): ValidatorFunction<unknown, boolean> =>
    validateCondition(
        (value) => !value,
        (_, conf) => `Field ${conf.name} should be falsey.`
    );

export default falsey;
