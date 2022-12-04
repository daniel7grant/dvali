import { describe, expect, test } from '@jest/globals';
import { ValidatorConfiguration } from '../../../src/types';
import gte from '../../../src/validators/number/gte';

const conf: ValidatorConfiguration = {
    name: 'numField',
    original: {},
    path: [],
    parent: {},
};

test('gte when the number is greater or equal returns success', async () => {
    const validateGreaterThanOrEqualToTen = gte(10);

    await expect(validateGreaterThanOrEqualToTen(10, conf)).toBeUndefined();
    await expect(validateGreaterThanOrEqualToTen(20, conf)).toBeUndefined();
    await expect(validateGreaterThanOrEqualToTen(500, conf)).toBeUndefined();
    await expect(validateGreaterThanOrEqualToTen(1000, conf)).toBeUndefined();
    await expect(validateGreaterThanOrEqualToTen(Infinity, conf)).toBeUndefined();
});

test('gte when the number is lower fails', async () => {
    const validateGreaterThanOrEqualToTen = gte(10);

    try {
        await validateGreaterThanOrEqualToTen(-5, conf);
    } catch (err) {
        expect(err).toBe('Field numField should be greater than or equal to 10.');
    }
    try {
        await validateGreaterThanOrEqualToTen(0, conf);
    } catch (err) {
        expect(err).toBe('Field numField should be greater than or equal to 10.');
    }
    try {
        await validateGreaterThanOrEqualToTen(-Infinity, conf);
    } catch (err) {
        expect(err).toBe('Field numField should be greater than or equal to 10.');
    }
});

test('gte ignores non-number inputs', async () => {
    const validateGreaterThanOrEqualToTen = gte(10);

    await expect(validateGreaterThanOrEqualToTen('6' as any, conf)).toBeUndefined();
    await expect(validateGreaterThanOrEqualToTen(NaN as any, conf)).toBeUndefined();
    await expect(validateGreaterThanOrEqualToTen(undefined as any, conf)).toBeUndefined();
    await expect(validateGreaterThanOrEqualToTen(null as any, conf)).toBeUndefined();
    await expect(validateGreaterThanOrEqualToTen({} as any, conf)).toBeUndefined();
});
