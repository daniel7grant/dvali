import { describe, expect, test } from '@jest/globals';
import { ValidatorConfiguration } from '../../../src/types';
import tryInt from '../../../src/validators/number/tryInt';

const conf: ValidatorConfiguration = {
    name: 'numField',
    original: {},
    path: [],
    parent: {},
};

test('tryInt, when integer is passed, returns the value', async () => {
    const validateInteger = tryInt();

    await expect(validateInteger(-1, conf)).resolves.toBe(-1);
    await expect(validateInteger(0, conf)).resolves.toBe(0);
    await expect(validateInteger(123, conf)).resolves.toBe(123);
    await expect(validateInteger(1e10, conf)).resolves.toBe(1e10);
});

test('tryInt, when numeric string is passed, returns the parsed value', async () => {
    const validateInteger = tryInt();

    await expect(validateInteger('-1' as any, conf)).resolves.toBe(-1);
    await expect(validateInteger('0' as any, conf)).resolves.toBe(0);
    await expect(validateInteger('123' as any, conf)).resolves.toBe(123);
});

test('tryInt, when decimal value is passed, returns the value floored to the integer part', async () => {
    const validateInteger = tryInt();

    await expect(validateInteger(1.1 as any, conf)).resolves.toBe(1);
    await expect(validateInteger('1.1' as any, conf)).resolves.toBe(1);
    await expect(validateInteger('123.99' as any, conf)).resolves.toBe(123);
    await expect(validateInteger('-123.99' as any, conf)).resolves.toBe(-123);
});

test('tryInt, when not an integer is passed, fails', async () => {
    const validateInteger = tryInt();

    try {
        await validateInteger(Infinity, conf);
    } catch (err) {
        expect(err).toBe('Field numField should be an integer.');
    }

    try {
        await validateInteger(-Infinity, conf);
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
