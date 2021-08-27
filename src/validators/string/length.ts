import { ValidatorFunction } from '../../types';

const length = (): ValidatorFunction<string> => async (value, conf) => {
    throw 'Not implemented.';
};

export default length;
