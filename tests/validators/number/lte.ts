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

    await expect(validateLessThanOrEqualToTen(10, conf)).toEqual(10);
    await expect(validateLessThanOrEqualToTen(0, conf)).toEqual(0);
    await expect(validateLessThanOrEqualToTen(-5, conf)).toEqual(-5);
    await expect(validateLessThanOrEqualToTen(-Infinity, conf)).toEqual(-Infinity);
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
