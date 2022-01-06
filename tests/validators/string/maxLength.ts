import { describe, expect, test } from '@jest/globals';
import { ValidatorConfiguration } from '../../../src/types';
import maxLength from '../../../src/validators/string/maxLength';

const conf: ValidatorConfiguration = {
    name: 'strField',
    original: {},
    parent: {},
    path: [],
};

test('maxLength if passed words length is between its limits, returns success', async () => {
    const validateLength = maxLength(10);

    await expect(validateLength('smart', conf)).resolves.toBeUndefined();
    await expect(validateLength('serious', conf)).resolves.toBeUndefined();
    await expect(validateLength('attractive', conf)).resolves.toBeUndefined();
});

test('maxLength if passed word is longer, fails', async () => {
    const validateLength = maxLength(10);

    try {
        await validateLength('professional', conf);
    } catch (err) {
        expect(err).toBe('Field strField length should be at most 10 characters.');
    }

    try {
        await validateLength('supercalifragilisticexpialidocious', conf);
    } catch (err) {
        expect(err).toBe('Field strField length should be at most 10 characters.');
    }
});

test('maxLength if passed word is not a string, ignores', async () => {
    const validateLength = maxLength(10);

    await expect(validateLength(8 as any, conf)).resolves.toBeUndefined();
    await expect(validateLength(NaN as any, conf)).resolves.toBeUndefined();
    await expect(validateLength(true as any, conf)).resolves.toBeUndefined();
    await expect(validateLength([] as any, conf)).resolves.toBeUndefined();
    await expect(validateLength(Array(8).fill('a') as any, conf)).resolves.toBeUndefined();
    await expect(validateLength({} as any, conf)).resolves.toBeUndefined();
    await expect(validateLength(undefined as any, conf)).resolves.toBeUndefined();
    await expect(validateLength(null as any, conf)).resolves.toBeUndefined();
});
