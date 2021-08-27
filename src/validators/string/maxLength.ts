import { ValidatorFunction } from '../../types';

const maxLength = (): ValidatorFunction<string> => async (value, conf) => {
    throw 'Not implemented.';
};

export default maxLength;
