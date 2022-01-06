import { describe, expect, test } from '@jest/globals';
import { ValidatorConfiguration } from '../../../src/types';
import tryDate from '../../../src/validators/date/tryDate';

const conf: ValidatorConfiguration = {
    name: 'dateField',
    original: {},
    path: [],
    parent: {},
};

test('tryDate when date, string or number is passed returns the date', async () => {
    const sanitizeDate = tryDate();

    const dateString = '2021-08-27';
    const date = new Date(dateString);

    const dateByDate = await sanitizeDate(date, conf);
    expect(dateByDate?.getTime()).toBe(date.getTime());
    const dateByNumber = await sanitizeDate(date.getTime() as any, conf);
    expect(dateByNumber?.getTime()).toBe(date.getTime());
    const dateByString = await sanitizeDate(dateString as any, conf);
    expect(dateByString?.getTime()).toBe(date.getTime());
});

test('tryDate when invalid date is passed fails', async () => {
    const sanitizeDate = tryDate();

    const dateString = 'invalid';
    const date = new Date(dateString);
    try {
        await sanitizeDate(date, conf);
    } catch (err) {
        expect(err).toBe('Field dateField should be a valid date.');
    }

    try {
        await sanitizeDate(dateString as any, conf);
    } catch (err) {
        expect(err).toBe('Field dateField should be a valid date.');
    }
});

test('tryDate when other data is passed fails', async () => {
    const sanitizeDate = tryDate();

    try {
        await sanitizeDate({} as any, conf);
    } catch (err) {
        expect(err).toBe('Field dateField should be a valid date.');
    }

    try {
        await sanitizeDate([] as any, conf);
    } catch (err) {
        expect(err).toBe('Field dateField should be a valid date.');
    }
});
