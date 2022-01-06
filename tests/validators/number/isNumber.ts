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

    await expect(validateNumber(-1, conf)).resolves.toBeUndefined();
    await expect(validateNumber(0, conf)).resolves.toBeUndefined();
    await expect(validateNumber(123, conf)).resolves.toBeUndefined();
    await expect(validateNumber(1e10, conf)).resolves.toBeUndefined();
    await expect(validateNumber(123.45, conf)).resolves.toBeUndefined();
    await expect(validateNumber(1 / 10, conf)).resolves.toBeUndefined();
    await expect(validateNumber(Infinity, conf)).resolves.toBeUndefined();
    await expect(validateNumber(-Infinity, conf)).resolves.toBeUndefined();
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
