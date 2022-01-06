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

    await expect(validateLength('smart', conf)).resolves.toBeUndefined();
    await expect(validateLength('serious', conf)).resolves.toBeUndefined();
    await expect(validateLength('attractive', conf)).resolves.toBeUndefined();
});

test('betweenLength still works if the parameters are switched up', async () => {
    const validateLength = betweenLength(10, 5);

    await expect(validateLength('smart', conf)).resolves.toBeUndefined();
    await expect(validateLength('serious', conf)).resolves.toBeUndefined();
    await expect(validateLength('attractive', conf)).resolves.toBeUndefined();
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

test('betweenLength if passed word is not a string, ignores', async () => {
    const validateLength = betweenLength(5, 10);

    await expect(validateLength(8 as any, conf)).resolves.toBeUndefined();
    await expect(validateLength(NaN as any, conf)).resolves.toBeUndefined();
    await expect(validateLength(true as any, conf)).resolves.toBeUndefined();
    await expect(validateLength([] as any, conf)).resolves.toBeUndefined();
    await expect(validateLength(Array(8).fill('a') as any, conf)).resolves.toBeUndefined();
    await expect(validateLength({} as any, conf)).resolves.toBeUndefined();
    await expect(validateLength(undefined as any, conf)).resolves.toBeUndefined();
    await expect(validateLength(null as any, conf)).resolves.toBeUndefined();
});
