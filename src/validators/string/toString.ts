import { ValidatorFunction } from '../../types';

const toString = (): ValidatorFunction<string> => async (value, conf) => {
    throw 'Not implemented.';
};

export default toString;
