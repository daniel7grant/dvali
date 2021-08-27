import { ValidatorFunction } from '../../types';

const minLength = (): ValidatorFunction<string> => async (value, conf) => {
    throw 'Not implemented.';
};

export default minLength;
