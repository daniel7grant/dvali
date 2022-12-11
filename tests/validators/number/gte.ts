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

    await expect(validateGreaterThanOrEqualToTen(10, conf)).toEqual(10);
    await expect(validateGreaterThanOrEqualToTen(20, conf)).toEqual(20);
    await expect(validateGreaterThanOrEqualToTen(500, conf)).toEqual(500);
    await expect(validateGreaterThanOrEqualToTen(1000, conf)).toEqual(1000);
    await expect(validateGreaterThanOrEqualToTen(Infinity, conf)).toEqual(Infinity);
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
