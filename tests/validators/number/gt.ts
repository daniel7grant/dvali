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

    await expect(validateGreaterThanTen(20, conf)).toEqual(20);
    await expect(validateGreaterThanTen(500, conf)).toEqual(500);
    await expect(validateGreaterThanTen(1000, conf)).toEqual(1000);
    await expect(validateGreaterThanTen(Infinity, conf)).toEqual(Infinity);
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
