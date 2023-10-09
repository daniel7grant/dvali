import { describe, expect, test } from '@jest/globals';
import { ValidatorConfiguration } from '../../../src/types';
import between from '../../../src/validators/number/between';

const conf: ValidatorConfiguration = {
    name: 'numField',
    original: {},
    path: [],
    parent: {},
};

test('between, when the number is between the two values, return success', async () => {
    const validateBetween = between(1, 10);

    await expect(validateBetween(2, conf)).toEqual(2);
    await expect(validateBetween(5, conf)).toEqual(5);
    await expect(validateBetween(8, conf)).toEqual(8);
});

test('between, when the number is not between or equal the two values, throws', async () => {
    const validateBetween = between(1, 10);

    try {
        await validateBetween(-1, conf);
    } catch (err) {
        expect(err).toBe('Field numField should be between 1 and 10.');
    }

    try {
        await validateBetween(100, conf);
    } catch (err) {
        expect(err).toBe('Field numField should be between 1 and 10.');
    }

    try {
        await validateBetween(Infinity, conf);
    } catch (err) {
        expect(err).toBe('Field numField should be between 1 and 10.');
    }

    try {
        await validateBetween(-Infinity, conf);
    } catch (err) {
        expect(err).toBe('Field numField should be between 1 and 10.');
    }

    try {
        await validateBetween(1, conf);
    } catch (err) {
        expect(err).toBe('Field numField should be between 1 and 10.');
    }

    try {
        await validateBetween(10, conf);
    } catch (err) {
        expect(err).toBe('Field numField should be between 1 and 10.');
    }
});

test('between, when min inclusive is set, returns success for min and failure for max', async () => {
    const validateBetween = between(1, 10, { minInclusive: true });

    await expect(validateBetween(1, conf)).toEqual(1);

    try {
        await validateBetween(10, conf);
    } catch (err) {
        expect(err).toBe('Field numField should be between 1 and 10.');
    }
});

test('between, when max inclusive is set, returns failure for min and success for max', async () => {
    const validateBetween = between(1, 10, { maxInclusive: true });

    await expect(validateBetween(10, conf)).toEqual(10);

    try {
        await validateBetween(1, conf);
    } catch (err) {
        expect(err).toBe('Field numField should be between 1 and 10.');
    }
});

test('between, when both inclusive is set, returns success for both limits', async () => {
    const validateBetween = between(1, 10, { minInclusive: true, maxInclusive: true });

    await expect(validateBetween(1, conf)).toEqual(1);
    await expect(validateBetween(10, conf)).toEqual(10);
});
