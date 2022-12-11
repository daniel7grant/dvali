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

    await expect(validateLength('smart', conf)).toEqual('smart');
    await expect(validateLength('serious', conf)).toEqual('serious');
    await expect(validateLength('attractive', conf)).toEqual('attractive');
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
