import { describe, expect, test } from '@jest/globals';
import { ValidatorConfiguration } from '../../../src/types';
import isInt from '../../../src/validators/number/isInt';

const conf: ValidatorConfiguration = {
    name: 'numField',
    original: {},
    path: [],
    parent: {},
};

test('isInt, when integer is passed, returns success', async () => {
    const validateInteger = isInt();

    await expect(validateInteger(-1, conf)).toEqual(-1);
    await expect(validateInteger(0, conf)).toEqual(0);
    await expect(validateInteger(123, conf)).toEqual(123);
    await expect(validateInteger(1e10, conf)).toEqual(1e10);
});

test('isInt, when not an integer is passed, fails', async () => {
    const validateInteger = isInt();

    try {
        await validateInteger(Infinity as any, conf);
    } catch (err) {
        expect(err).toBe('Field numField should be an integer.');
    }

    try {
        await validateInteger(-Infinity as any, conf);
    } catch (err) {
        expect(err).toBe('Field numField should be an integer.');
    }

    try {
        await validateInteger(66.6 as any, conf);
    } catch (err) {
        expect(err).toBe('Field numField should be an integer.');
    }

    try {
        await validateInteger('66' as any, conf);
    } catch (err) {
        expect(err).toBe('Field numField should be an integer.');
    }

    try {
        await validateInteger(NaN as any, conf);
    } catch (err) {
        expect(err).toBe('Field numField should be an integer.');
    }

    try {
        await validateInteger([] as any, conf);
    } catch (err) {
        expect(err).toBe('Field numField should be an integer.');
    }

    try {
        await validateInteger({} as any, conf);
    } catch (err) {
        expect(err).toBe('Field numField should be an integer.');
    }

    try {
        await validateInteger(null as any, conf);
    } catch (err) {
        expect(err).toBe('Field numField should be an integer.');
    }
});
