import { ValidatorFunction } from '../../types';

const toDate = (): ValidatorFunction<Date> => async (value, conf) => {
    throw 'Not implemented.';
};

export default toDate;
