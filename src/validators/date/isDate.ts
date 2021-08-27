import { ValidatorFunction } from '../../types';

const isDate = (): ValidatorFunction<Date> => async (value, conf) => {
    throw 'Not implemented.';
};

export default isDate;
