import { describe, expect, test } from '@jest/globals';
import { ValidatorConfiguration } from '../../../src/types';
import isString from '../../../src/validators/string/isString';

const conf: ValidatorConfiguration = {
    name: 'strField',
    original: {},
    path: [],
    parent: {},
};

test('isString, when passed value is string returns success', async () => {
    const sanitizeString = isString();

    await expect(sanitizeString('string', conf)).toEqual('string');
    await expect(sanitizeString('0', conf)).toEqual('0');
});

test('isString, when passed value is not string, fails', async () => {
    const sanitizeString = isString();

    try {
        await sanitizeString(123 as any, conf);
    } catch (err) {
        expect(err).toBe('Field strField should be string.');
    }
    try {
        await sanitizeString(9.9 as any, conf);
    } catch (err) {
        expect(err).toBe('Field strField should be string.');
    }
    try {
        await sanitizeString([1, 2, 3] as any, conf);
    } catch (err) {
        expect(err).toBe('Field strField should be string.');
    }
    try {
        await sanitizeString({} as any, conf);
    } catch (err) {
        expect(err).toBe('Field strField should be string.');
    }
    const date = new Date('2021-08-29');
    try {
        await sanitizeString(date as any, conf);
    } catch (err) {
        expect(err).toBe('Field strField should be string.');
    }
    try {
        await sanitizeString(null as any, conf);
    } catch (err) {
        expect(err).toBe('Field strField should be string.');
    }
    try {
        await sanitizeString(undefined as any, conf);
    } catch (err) {
        expect(err).toBe('Field strField should be string.');
    }
});
