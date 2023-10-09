import { describe, expect, test } from '@jest/globals';
import { ValidatorConfiguration } from '../../../src/types';
import tryNumber from '../../../src/validators/number/tryNumber';

const conf: ValidatorConfiguration = {
    name: 'numField',
    original: {},
    path: [],
    parent: {},
};

test('tryNumber, when number is passed, returns the value', async () => {
    const validateNumber = tryNumber();

    await expect(validateNumber(-1, conf)).toBe(-1);
    await expect(validateNumber(0, conf)).toBe(0);
    await expect(validateNumber(123, conf)).toBe(123);
    await expect(validateNumber(1e10, conf)).toBe(1e10);
    await expect(validateNumber(123.45, conf)).toBe(123.45);
    await expect(validateNumber(1 / 10, conf)).toBe(1 / 10);
    await expect(validateNumber(Infinity, conf)).toBe(Infinity);
    await expect(validateNumber(-Infinity, conf)).toBe(-Infinity);
});

test('tryNumber, when numeric string is passed, returns the parsed value', async () => {
    const validateNumber = tryNumber();

    await expect(validateNumber('-1' as any, conf)).toBe(-1);
    await expect(validateNumber('0' as any, conf)).toBe(0);
    await expect(validateNumber('123' as any, conf)).toBe(123);
    await expect(validateNumber('1e10' as any, conf)).toBe(1e10);
    await expect(validateNumber('123.45' as any, conf)).toBe(123.45);
});

test('tryNumber, when not a number is passed, fails', async () => {
    const validateNumber = tryNumber();

    try {
        await validateNumber(NaN as any, conf);
    } catch (err) {
        expect(err).toBe('Field numField should be numeric.');
    }

    try {
        await validateNumber([] as any, conf);
    } catch (err) {
        expect(err).toBe('Field numField should be numeric.');
    }

    try {
        await validateNumber({} as any, conf);
    } catch (err) {
        expect(err).toBe('Field numField should be numeric.');
    }

    try {
        await validateNumber(null as any, conf);
    } catch (err) {
        expect(err).toBe('Field numField should be numeric.');
    }
});
