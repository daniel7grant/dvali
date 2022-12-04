import { describe, expect, test } from '@jest/globals';
import { ValidatorConfiguration } from '../../../src/types';
import length from '../../../src/validators/string/length';

const conf: ValidatorConfiguration = {
    name: 'strField',
    original: {},
    parent: {},
    path: [],
};

test('length if passed words length is the same, returns success', async () => {
    const validateLength = length(5);

    await expect(validateLength('smart', conf)).toBeUndefined();
    await expect(validateLength('young', conf)).toBeUndefined();
    await expect(validateLength('brave', conf)).toBeUndefined();
});

test('length if passed word is shorter or longer, fails', async () => {
    const validateLength = length(5);

    try {
        await validateLength('dull', conf);
    } catch (err) {
        expect(err).toBe('Field strField length should be exactly 5 characters.');
    }

    try {
        await validateLength('supercalifragilisticexpialidocious', conf);
    } catch (err) {
        expect(err).toBe('Field strField length should be exactly 5 characters.');
    }
});

test('length if passed word is not a string, ignores', async () => {
    const validateLength = length(5);

    await expect(validateLength(8 as any, conf)).toBeUndefined();
    await expect(validateLength(NaN as any, conf)).toBeUndefined();
    await expect(validateLength(true as any, conf)).toBeUndefined();
    await expect(validateLength([] as any, conf)).toBeUndefined();
    await expect(validateLength(Array(8).fill('a') as any, conf)).toBeUndefined();
    await expect(validateLength({} as any, conf)).toBeUndefined();
    await expect(validateLength(undefined as any, conf)).toBeUndefined();
    await expect(validateLength(null as any, conf)).toBeUndefined();
});
