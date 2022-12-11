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

    await expect(validateLength('smart', conf)).toEqual('smart');
    await expect(validateLength('serious', conf)).toEqual('serious');
    await expect(validateLength('attractive', conf)).toEqual('attractive');
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
