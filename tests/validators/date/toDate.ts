import test from 'ava';
import { ValidatorConfiguration } from '../../../src/types';
import toDate from '../../../src/validators/date/toDate';

const conf: ValidatorConfiguration = {
    name: 'dateField',
    original: {},
    path: [],
    parent: {},
};

test('toDate when date, string or number is passed returns the date', async (t) => {
    const sanitizeDate = toDate();

    const dateString = '2021-08-27';
    const date = new Date(dateString);

    const dateByDate = await sanitizeDate(date, conf);
    t.is(dateByDate?.getTime(), date.getTime());
    const dateByNumber = await sanitizeDate(date.getTime() as any, conf);
    t.is(dateByNumber?.getTime(), date.getTime());
    const dateByString = await sanitizeDate(dateString as any, conf);
    t.is(dateByString?.getTime(), date.getTime());
});

test('toDate with other values returns invalid date', async (t) => {
    const sanitizeDate = toDate();

    const dateString = 'invalid';
    const date = new Date(dateString);
    const dateByDate = await sanitizeDate(date, conf);
    t.is(dateByDate?.getTime(), NaN);
    const dateByString = await sanitizeDate(dateString as any, conf);
    t.is(dateByString?.getTime(), NaN);

    const dateByObject = await sanitizeDate({} as any, conf);
    t.is(dateByObject?.getTime(), NaN);
    const dateByArray = await sanitizeDate({} as any, conf);
    t.is(dateByArray?.getTime(), NaN);
});
