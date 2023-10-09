import { describe, expect, test } from '@jest/globals';
import { ValidatorConfiguration } from '../../../src/types';
import after from '../../../src/validators/date/after';

const conf: ValidatorConfiguration = {
    name: 'dateField',
    original: {},
    path: [],
    parent: {},
};

test('after when the date is after the date returns success', async () => {
    const begin = new Date('2000-01-01');
    const validateInRange = after(begin);

    expect(validateInRange(new Date('2000-01-02'), conf)).toEqual(new Date('2000-01-02'));
    expect(validateInRange(new Date('2021-08-27'), conf)).toEqual(new Date('2021-08-27'));
    expect(validateInRange(new Date('2099-01-01'), conf)).toEqual(new Date('2099-01-01'));
});

test('after definition can convert from string or number', async () => {
    const validateInStringRange = after('2000-01-01');

    expect(validateInStringRange(new Date('2021-08-27'), conf)).toEqual(new Date('2021-08-27'));

    const validateInNumberRange = after(946684800000);

    expect(validateInNumberRange(new Date('2021-08-27'), conf)).toEqual(new Date('2021-08-27'));
});

test('after when the date is before or equal to the date, fails', async () => {
    const begin = new Date('2000-01-01');
    const validateInRange = after(begin);

    try {
        await validateInRange(new Date('1999-12-31'), conf);
    } catch (err) {
        expect(err).toBe(`Field dateField should be after ${begin.toString()}.`);
    }

    try {
        await validateInRange(new Date('2000-01-01'), conf);
    } catch (err) {
        expect(err).toBe(`Field dateField should be after ${begin.toString()}.`);
    }

    try {
        await validateInRange(new Date('invalid'), conf);
    } catch (err) {
        expect(err).toBe(`Field dateField should be after ${begin.toString()}.`);
    }
});

test('after, when both inclusives are set, returns success for and upper lower limit', async () => {
    const begin = new Date('2000-01-01');
    const validateInRange = after(begin, { inclusive: true });

    expect(validateInRange(new Date('2000-01-01'), conf)).toEqual(new Date('2000-01-01'));
});
