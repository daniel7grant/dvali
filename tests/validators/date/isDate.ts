import { describe, expect, test } from '@jest/globals';
import { ValidatorConfiguration } from '../../../src/types';
import isDate from '../../../src/validators/date/isDate';

const conf: ValidatorConfiguration = {
    name: 'dateField',
    original: {},
    path: [],
    parent: {},
};

test('isDate when date is passed returns successfully', async () => {
    const sanitizeDate = isDate();

    const dateString = '2021-08-27';
    const date = new Date(dateString);

    await expect(sanitizeDate(date, conf)).resolves.toBeUndefined();
});

test('isDate when invalid date is passed fails', async () => {
    const sanitizeDate = isDate();

    const dateString = 'invalid';
    const date = new Date(dateString);
    try {
        await sanitizeDate(date, conf);
    } catch (err) {
        expect(err).toBe('Field dateField should be a valid date.');
    }
});

test('isDate when other data is passed fails', async () => {
    const sanitizeDate = isDate();

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
