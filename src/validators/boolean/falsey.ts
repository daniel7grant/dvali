import { SyncValidatorFunction } from '../../types.js';
import validateCondition from '../validateCondition.js';

const falsey = (): SyncValidatorFunction<unknown, boolean> =>
    validateCondition(
        (value) => !value,
        (_, conf) => `Field ${conf.name} should be falsey.`
    );

export default falsey;
