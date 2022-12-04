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

    await expect(validateInRange(new Date('2000-01-02'), conf)).toBeUndefined();
    await expect(validateInRange(new Date('2021-08-27'), conf)).toBeUndefined();
    await expect(validateInRange(new Date('2099-01-01'), conf)).toBeUndefined();
});

test('before definition can convert from string or number', async () => {
    const validateInStringRange = before('2099-12-31');

    await expect(validateInStringRange(new Date('2021-08-27'), conf)).toBeUndefined();

    const validateInNumberRange = before(4102358400000);

    await expect(validateInNumberRange(new Date('2021-08-27'), conf)).toBeUndefined();
});

test('before when the date is after or equal to the date, fails', async () => {
    const end = new Date('2099-12-31');
    const validateInRange = before(end);

    try {
        await validateInRange(new Date('2222-12-31'), conf);
    } catch (err) {
        expect(err).toBe(`Field dateField should be before ${end.toString()}.`);
    }

    try {
        await validateInRange(new Date('2099-12-31'), conf);
    } catch (err) {
        expect(err).toBe(`Field dateField should be before ${end.toString()}.`);
    }

    try {
        await validateInRange(new Date('invalid'), conf);
    } catch (err) {
        expect(err).toBe(`Field dateField should be before ${end.toString()}.`);
    }
});

test('before, when inclusive is set, returns success for limit', async () => {
    const end = new Date('2099-12-31');
    const validateInRange = before(end, { inclusive: true });

    await expect(validateInRange(new Date('2099-12-31'), conf)).toBeUndefined();
});

test('before ignores non-date inputs', async () => {
    const end = new Date('2099-12-31');
    const validateInRange = before(end);

    await expect(validateInRange('string' as any, conf)).toBeUndefined();
    await expect(validateInRange(123 as any, conf)).toBeUndefined();
    await expect(validateInRange(NaN as any, conf)).toBeUndefined();
    await expect(validateInRange({} as any, conf)).toBeUndefined();
    await expect(validateInRange([] as any, conf)).toBeUndefined();
    await expect(validateInRange(null as any, conf)).toBeUndefined();
    await expect(validateInRange(undefined as any, conf)).toBeUndefined();
});
