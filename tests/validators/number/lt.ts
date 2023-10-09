import { describe, expect, test } from '@jest/globals';
import { ValidatorConfiguration } from '../../../src/types';
import lt from '../../../src/validators/number/lt';

const conf: ValidatorConfiguration = {
    name: 'numField',
    original: {},
    path: [],
    parent: {},
};

test('lt when the number is lower returns success', async () => {
    const validateLessThanTen = lt(10);

    await expect(validateLessThanTen(0, conf)).toEqual(0);
    await expect(validateLessThanTen(-5, conf)).toEqual(-5);
    await expect(validateLessThanTen(-Infinity, conf)).toEqual(-Infinity);
});

test('lt when the number is greater or equal fails', async () => {
    const validateLessThanTen = lt(10);

    try {
        await validateLessThanTen(10, conf);
    } catch (err) {
        expect(err).toBe('Field numField should be less than 10.');
    }
    try {
        await validateLessThanTen(50, conf);
    } catch (err) {
        expect(err).toBe('Field numField should be less than 10.');
    }
    try {
        await validateLessThanTen(Infinity, conf);
    } catch (err) {
        expect(err).toBe('Field numField should be less than 10.');
    }
});
