import { describe, expect, test } from '@jest/globals';
import { ValidatorConfiguration } from '../../../src/types';
import toDate from '../../../src/validators/date/toDate';

const conf: ValidatorConfiguration = {
    name: 'dateField',
    original: {},
    path: [],
    parent: {},
};

test('toDate when date, string or number is passed returns the date', async () => {
    const sanitizeDate = toDate();

    const dateString = '2021-08-27';
    const date = new Date(dateString);

    const dateByDate = await sanitizeDate(date, conf);
    expect(dateByDate?.getTime()).toBe(date.getTime());
    const dateByNumber = await sanitizeDate(date.getTime() as any, conf);
    expect(dateByNumber?.getTime()).toBe(date.getTime());
    const dateByString = await sanitizeDate(dateString as any, conf);
    expect(dateByString?.getTime()).toBe(date.getTime());
});

test('toDate with other values returns invalid date', async () => {
    const sanitizeDate = toDate();

    const dateString = 'invalid';
    const date = new Date(dateString);
    const dateByDate = await sanitizeDate(date, conf);
    expect(dateByDate?.getTime()).toBe(NaN);
    const dateByString = await sanitizeDate(dateString as any, conf);
    expect(dateByString?.getTime()).toBe(NaN);

    const dateByObject = await sanitizeDate({} as any, conf);
    expect(dateByObject?.getTime()).toBe(NaN);
    const dateByArray = await sanitizeDate({} as any, conf);
    expect(dateByArray?.getTime()).toBe(NaN);
});
