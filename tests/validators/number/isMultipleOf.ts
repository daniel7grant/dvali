import { describe, expect, test } from '@jest/globals';
import { ValidatorConfiguration } from '../../../src/types';
import isMultipleOf from '../../../src/validators/number/isMultipleOf';

const conf: ValidatorConfiguration = {
    name: 'numField',
    original: {},
    path: [],
    parent: {},
};

test('isMultipleOf when the number is multiple of the given param returns success', async () => {
    const validateMultipleOfFive = isMultipleOf(5);

    await expect(validateMultipleOfFive(10, conf)).toEqual(10);
    await expect(validateMultipleOfFive(0, conf)).toEqual(0);
    await expect(validateMultipleOfFive(-5, conf)).toEqual(-5);
});

test('isMultipleOf when the number is not the multiple of the given param fails', async () => {
    const validateMultipleOfFive = isMultipleOf(5);

    try {
        await validateMultipleOfFive(69, conf);
    } catch (err) {
        expect(err).toBe('Field numField should be the multiple of 5.');
    }
    try {
        await validateMultipleOfFive(10.5, conf);
    } catch (err) {
        expect(err).toBe('Field numField should be the multiple of 5.');
    }
    try {
        await validateMultipleOfFive(10.00000000001, conf);
    } catch (err) {
        expect(err).toBe('Field numField should be the multiple of 5.');
    }
    try {
        await validateMultipleOfFive(Infinity, conf);
    } catch (err) {
        expect(err).toBe('Field numField should be the multiple of 5.');
    }
});

