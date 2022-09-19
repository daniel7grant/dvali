import { ValidatorFunctionAsync } from '../../types.js';
import validateCondition from '../validateCondition.js';

const truthy = (): ValidatorFunctionAsync<boolean> =>
    validateCondition(
        (val) => !!val,
        (_, conf) => `Field ${conf.name} should be truthy.`
    );

export default truthy;
