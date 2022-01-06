import { describe, expect, test } from '@jest/globals';
import { ValidatorConfiguration } from '../../../src/types';
import minLength from '../../../src/validators/string/minLength';

const conf: ValidatorConfiguration = {
    name: 'strField',
    original: {},
    parent: {},
    path: [],
};

test('minLength if passed words length is as at least long as the limit, returns success', async () => {
    const validateLength = minLength(5);

    await expect(validateLength('smart', conf)).resolves.toBeUndefined();
    await expect(validateLength('serious', conf)).resolves.toBeUndefined();
    await expect(validateLength('attractive', conf)).resolves.toBeUndefined();
});

test('minLength if passed word is shorter, fails', async () => {
    const validateLength = minLength(5);

    try {
        await validateLength('', conf);
    } catch (err) {
        expect(err).toBe('Field strField length should be at least 5 characters.');
    }

    try {
        await validateLength('dull', conf);
    } catch (err) {
        expect(err).toBe('Field strField length should be at least 5 characters.');
    }
});

test('minLength if passed word is not a string, ignores', async () => {
    const validateLength = minLength(5);

    await expect(validateLength(8 as any, conf)).resolves.toBeUndefined();
    await expect(validateLength(NaN as any, conf)).resolves.toBeUndefined();
    await expect(validateLength(true as any, conf)).resolves.toBeUndefined();
    await expect(validateLength([] as any, conf)).resolves.toBeUndefined();
    await expect(validateLength(Array(8).fill('a') as any, conf)).resolves.toBeUndefined();
    await expect(validateLength({} as any, conf)).resolves.toBeUndefined();
    await expect(validateLength(undefined as any, conf)).resolves.toBeUndefined();
    await expect(validateLength(null as any, conf)).resolves.toBeUndefined();
});
