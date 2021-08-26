import { ValidatorFunction } from '../../types';
import validateCondition from '../validateCondition';

const falsey = (): ValidatorFunction<boolean> =>
    validateCondition(
        (value) => !value,
        (_, conf) => `Field ${conf.name} should be falsey.`
    );

export default falsey;
