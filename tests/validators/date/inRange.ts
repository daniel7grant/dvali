import { describe, expect, test } from '@jest/globals';
import { ValidatorConfiguration } from '../../../src/types';
import inRange from '../../../src/validators/date/inRange';

const conf: ValidatorConfiguration = {
    name: 'dateField',
    original: {},
    path: [],
    parent: {},
};

test('inRange when the date is between the two dates returns success', async () => {
    const begin = new Date('2000-01-01');
    const end = new Date('2099-12-31');
    const validateInRange = inRange(begin, end);

    await expect(validateInRange(new Date('2000-01-02'), conf)).resolves.toBeUndefined();
    await expect(validateInRange(new Date('2021-08-27'), conf)).resolves.toBeUndefined();
    await expect(validateInRange(new Date('2099-01-01'), conf)).resolves.toBeUndefined();
});

test('inRange definition can convert from string or number', async () => {
    const validateInStringRange = inRange('2000-01-01', '2099-12-31');

    await expect(validateInStringRange(new Date('2021-08-27'), conf)).resolves.toBeUndefined();

    const validateInNumberRange = inRange(946684800000, 4102358400000);

    await expect(validateInNumberRange(new Date('2021-08-27'), conf)).resolves.toBeUndefined();
});

test('inRange when the date is before, after or equal to the two dates, fails', async () => {
    const begin = new Date('2000-01-01');
    const end = new Date('2099-12-31');
    const validateInRange = inRange(begin, end);

    try {
        await validateInRange(new Date('1999-12-31'), conf);
    } catch (err) {
        expect(err).toBe(
            `Field dateField should be between ${begin.toString()} and ${end.toString()}.`
        );
    }

    try {
        await validateInRange(new Date('2222-12-31'), conf);
    } catch (err) {
        expect(err).toBe(
            `Field dateField should be between ${begin.toString()} and ${end.toString()}.`
        );
    }

    try {
        await validateInRange(new Date('2000-01-01'), conf);
    } catch (err) {
        expect(err).toBe(
            `Field dateField should be between ${begin.toString()} and ${end.toString()}.`
        );
    }

    try {
        await validateInRange(new Date('2099-12-31'), conf);
    } catch (err) {
        expect(err).toBe(
            `Field dateField should be between ${begin.toString()} and ${end.toString()}.`
        );
    }

    try {
        await validateInRange(new Date('invalid'), conf);
    } catch (err) {
        expect(err).toBe(
            `Field dateField should be between ${begin.toString()} and ${end.toString()}.`
        );
    }
});

test('inRange, when minInclusive is set, returns success for lower limit and fails for upper', async () => {
    const begin = new Date('2000-01-01');
    const end = new Date('2099-12-31');
    const validateInRange = inRange(begin, end, { minInclusive: true });

    await expect(validateInRange(new Date('2000-01-01'), conf)).resolves.toBeUndefined();

    try {
        await validateInRange(new Date('2099-12-31'), conf);
    } catch (err) {
        expect(err).toBe(
            `Field dateField should be between ${begin.toString()} and ${end.toString()}.`
        );
    }
});

test('inRange, when maxInclusive is set, fails for lower limit and returns success for upper', async () => {
    const begin = new Date('2000-01-01');
    const end = new Date('2099-12-31');
    const validateInRange = inRange(begin, end, { maxInclusive: true });

    try {
        await validateInRange(new Date('2000-01-01'), conf);
    } catch (err) {
        expect(err).toBe(
            `Field dateField should be between ${begin.toString()} and ${end.toString()}.`
        );
    }

    await expect(validateInRange(new Date('2099-12-31'), conf)).resolves.toBeUndefined();
});

test('inRange, when both inclusives are set, returns success for and upper lower limit', async () => {
    const begin = new Date('2000-01-01');
    const end = new Date('2099-12-31');
    const validateInRange = inRange(begin, end, { minInclusive: true, maxInclusive: true });

    await expect(validateInRange(new Date('2000-01-01'), conf)).resolves.toBeUndefined();
    await expect(validateInRange(new Date('2099-12-31'), conf)).resolves.toBeUndefined();
});

test('inRange ignores non-date inputs', async () => {
    const begin = new Date('2000-01-01');
    const end = new Date('2099-12-31');
    const validateInRange = inRange(begin, end);

    await expect(validateInRange('string' as any, conf)).resolves.toBeUndefined();
    await expect(validateInRange(123 as any, conf)).resolves.toBeUndefined();
    await expect(validateInRange(NaN as any, conf)).resolves.toBeUndefined();
    await expect(validateInRange({} as any, conf)).resolves.toBeUndefined();
    await expect(validateInRange([] as any, conf)).resolves.toBeUndefined();
    await expect(validateInRange(null as any, conf)).resolves.toBeUndefined();
    await expect(validateInRange(undefined as any, conf)).resolves.toBeUndefined();
});
