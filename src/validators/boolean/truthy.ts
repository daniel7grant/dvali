import { ValidatorFunction } from '../../types';
import validateCondition from '../validateCondition';

const truthy = (): ValidatorFunction<boolean> => validateCondition(val => !!val, (_, conf) => `Field ${conf.name} should be truthy.`)

export default truthy;
