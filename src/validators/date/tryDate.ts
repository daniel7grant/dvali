import { ValidatorFunction } from '../../types';

const tryDate = (): ValidatorFunction<Date> => async (value, conf) => {
    throw 'Not implemented.';
};

export default tryDate;
