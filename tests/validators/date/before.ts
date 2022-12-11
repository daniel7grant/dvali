import { describe, expect, test } from '@jest/globals';
import { ValidatorConfiguration } from '../../../src/types';
import before from '../../../src/validators/date/before';

const conf: ValidatorConfiguration = {
    name: 'dateField',
    original: {},
    path: [],
    parent: {},
};

test('before when the date is before the date returns success', async () => {
    const end = new Date('2099-12-31');
    const validateInRange = before(end);

    expect(validateInRange(new Date('2000-01-02'), conf)).toEqual(new Date('2000-01-02'));
    expect(validateInRange(new Date('2021-08-27'), conf)).toEqual(new Date('2021-08-27'));
    expect(validateInRange(new Date('2099-01-01'), conf)).toEqual(new Date('2099-01-01'));
});

test('before definition can convert from string or number', async () => {
    const validateInStringRange = before('2099-12-31');

    expect(validateInStringRange(new Date('2021-08-27'), conf)).toEqual(new Date('2021-08-27'));

    const validateInNumberRange = before(4102358400000);

    expect(validateInNumberRange(new Date('2021-08-27'), conf)).toEqual(new Date('2021-08-27'));
});

test('before when the date is after or equal to the date, fails', async () => {
    const end = new Date('2099-12-31');
    const validateInRange = before(end);

    try {
        validateInRange(new Date('2222-12-31'), conf);
    } catch (err) {
        expect(err).toBe(`Field dateField should be before ${end.toString()}.`);
    }

    try {
        validateInRange(new Date('2099-12-31'), conf);
    } catch (err) {
        expect(err).toBe(`Field dateField should be before ${end.toString()}.`);
    }

    try {
        validateInRange(new Date('invalid'), conf);
    } catch (err) {
        expect(err).toBe(`Field dateField should be before ${end.toString()}.`);
    }
});

test('before, when inclusive is set, returns success for limit', async () => {
    const end = new Date('2099-12-31');
    const validateInRange = before(end, { inclusive: true });

    expect(validateInRange(new Date('2099-12-31'), conf)).toEqual(new Date('2099-12-31'));
});
