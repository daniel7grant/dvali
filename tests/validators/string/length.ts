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

    await expect(validateLength('smart', conf)).toEqual('smart');
    await expect(validateLength('young', conf)).toEqual('young');
    await expect(validateLength('brave', conf)).toEqual('brave');
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
