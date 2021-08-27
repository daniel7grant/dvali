import { ValidatorFunction } from '../../types';

const isString = (): ValidatorFunction<string> => async (value, conf) => {
    throw 'Not implemented.';
};

export default isString;
