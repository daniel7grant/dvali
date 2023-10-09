import { describe, expect, test } from '@jest/globals';
import { ValidatorConfiguration } from '../../../src/types';
import betweenLength from '../../../src/validators/string/betweenLength';

const conf: ValidatorConfiguration = {
    name: 'strField',
    original: {},
    parent: {},
    path: [],
};

test('betweenLength if passed words length is between its limits, returns success', async () => {
    const validateLength = betweenLength(5, 10);

    await expect(validateLength('smart', conf)).toEqual('smart');
    await expect(validateLength('serious', conf)).toEqual('serious');
    await expect(validateLength('attractive', conf)).toEqual('attractive');
});

test('betweenLength still works if the parameters are switched up', async () => {
    const validateLength = betweenLength(10, 5);

    await expect(validateLength('smart', conf)).toEqual('smart');
    await expect(validateLength('serious', conf)).toEqual('serious');
    await expect(validateLength('attractive', conf)).toEqual('attractive');
});

test('betweenLength if passed word is shorter or longer, fails', async () => {
    const validateLength = betweenLength(5, 10);

    try {
        await validateLength('dull', conf);
    } catch (err) {
        expect(err).toBe('Field strField length should be between 5 and 10 characters.');
    }

    try {
        await validateLength('supercalifragilisticexpialidocious', conf);
    } catch (err) {
        expect(err).toBe('Field strField length should be between 5 and 10 characters.');
    }
});
