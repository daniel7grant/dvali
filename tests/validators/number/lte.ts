import { describe, expect, test } from '@jest/globals';
import { ValidatorConfiguration } from '../../../src/types';
import lte from '../../../src/validators/number/lte';

const conf: ValidatorConfiguration = {
    name: 'numField',
    original: {},
    path: [],
    parent: {},
};

test('lte when the number is less or equal returns success', async () => {
    const validateLessThanOrEqualToTen = lte(10);

    await expect(validateLessThanOrEqualToTen(10, conf)).toBeUndefined();
    await expect(validateLessThanOrEqualToTen(0, conf)).toBeUndefined();
    await expect(validateLessThanOrEqualToTen(-5, conf)).toBeUndefined();
    await expect(validateLessThanOrEqualToTen(-Infinity, conf)).toBeUndefined();
});

test('lte when the number is lower fails', async () => {
    const validateLessThanOrEqualToTen = lte(10);

    try {
        await validateLessThanOrEqualToTen(100, conf);
    } catch (err) {
        expect(err).toBe('Field numField should be less than or equal to 10.');
    }
    try {
        await validateLessThanOrEqualToTen(Infinity, conf);
    } catch (err) {
        expect(err).toBe('Field numField should be less than or equal to 10.');
    }
});

test('lte ignores non-number inputs', async () => {
    const validateLessThanOrEqualToTen = lte(10);

    await expect(validateLessThanOrEqualToTen('6' as any, conf)).toBeUndefined();
    await expect(validateLessThanOrEqualToTen(NaN as any, conf)).toBeUndefined();
    await expect(validateLessThanOrEqualToTen(undefined as any, conf)).toBeUndefined();
    await expect(validateLessThanOrEqualToTen(null as any, conf)).toBeUndefined();
    await expect(validateLessThanOrEqualToTen({} as any, conf)).toBeUndefined();
});
