import { ValidatorFunction } from '../../types';
import validateCondition from '../validateCondition';

const isString = (): ValidatorFunction<string> =>
    validateCondition(
        (value) => typeof value === 'string',
        (_, conf) => `Field ${conf.name} should be string.`
    );

export default isString;
