import { describe, expect, test } from '@jest/globals';
import { ValidatorConfiguration } from '../../../src/types';
import gt from '../../../src/validators/number/gt';

const conf: ValidatorConfiguration = {
    name: 'numField',
    original: {},
    path: [],
    parent: {},
};

test('gt when the number is greater returns success', async () => {
    const validateGreaterThanTen = gt(10);

    await expect(validateGreaterThanTen(20, conf)).toBeUndefined();
    await expect(validateGreaterThanTen(500, conf)).toBeUndefined();
    await expect(validateGreaterThanTen(1000, conf)).toBeUndefined();
    await expect(validateGreaterThanTen(Infinity, conf)).toBeUndefined();
});

test('gt when the number is lower or equal fails', async () => {
    const validateGreaterThanTen = gt(10);

    try {
        await validateGreaterThanTen(10, conf);
    } catch (err) {
        expect(err).toBe('Field numField should be greater than 10.');
    }
    try {
        await validateGreaterThanTen(-5, conf);
    } catch (err) {
        expect(err).toBe('Field numField should be greater than 10.');
    }
    try {
        await validateGreaterThanTen(0, conf);
    } catch (err) {
        expect(err).toBe('Field numField should be greater than 10.');
    }
    try {
        await validateGreaterThanTen(-Infinity, conf);
    } catch (err) {
        expect(err).toBe('Field numField should be greater than 10.');
    }
});

test('gt ignores non-number inputs', async () => {
    const validateGreaterThanTen = gt(10);

    await expect(validateGreaterThanTen('6' as any, conf)).toBeUndefined();
    await expect(validateGreaterThanTen(NaN as any, conf)).toBeUndefined();
    await expect(validateGreaterThanTen(undefined as any, conf)).toBeUndefined();
    await expect(validateGreaterThanTen(null as any, conf)).toBeUndefined();
    await expect(validateGreaterThanTen({} as any, conf)).toBeUndefined();
});
