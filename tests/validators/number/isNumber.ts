import { describe, expect, test } from '@jest/globals';
import { ValidatorConfiguration } from '../../../src/types';
import isNumber from '../../../src/validators/number/isNumber';

const conf: ValidatorConfiguration = {
    name: 'numField',
    original: {},
    path: [],
    parent: {},
};

test('isNumber, when number is passed, returns success', async () => {
    const validateNumber = isNumber();

    await expect(validateNumber(-1, conf)).toEqual(-1);
    await expect(validateNumber(0, conf)).toEqual(0);
    await expect(validateNumber(123, conf)).toEqual(123);
    await expect(validateNumber(1e10, conf)).toEqual(1e10);
    await expect(validateNumber(123.45, conf)).toEqual(123.45);
    await expect(validateNumber(1 / 10, conf)).toEqual(1 / 10);
    await expect(validateNumber(Infinity, conf)).toEqual(Infinity);
    await expect(validateNumber(-Infinity, conf)).toEqual(-Infinity);
});

test('isNumber, when not a number is passed, fails', async () => {
    const validateNumber = isNumber();

    try {
        await validateNumber('66' as any, conf);
    } catch (err) {
        expect(err).toBe('Field numField should be a number.');
    }

    try {
        await validateNumber(NaN as any, conf);
    } catch (err) {
        expect(err).toBe('Field numField should be a number.');
    }

    try {
        await validateNumber([] as any, conf);
    } catch (err) {
        expect(err).toBe('Field numField should be a number.');
    }

    try {
        await validateNumber({} as any, conf);
    } catch (err) {
        expect(err).toBe('Field numField should be a number.');
    }

    try {
        await validateNumber(null as any, conf);
    } catch (err) {
        expect(err).toBe('Field numField should be a number.');
    }
});
