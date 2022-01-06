import { describe, expect, test } from '@jest/globals';
import { ValidatorConfiguration } from '../../../src/types';
import lower from '../../../src/transformers/string/lower';

const conf: ValidatorConfiguration = {
    name: 'numField',
    original: {},
    path: [],
    parent: {},
};

test('lower validator changes every letter to the lowercase equivalent', async () => {
    const validateLower = lower();

    await expect(validateLower('asdasd', conf)).resolves.toBe('asdasd');
    await expect(validateLower('Asdasd', conf)).resolves.toBe('asdasd');
    await expect(validateLower('aSdaSD', conf)).resolves.toBe('asdasd');
});

test('lower validator works with locale-strings', async () => {
    const validateLower = lower();

    await expect(validateLower('mÄdchEn', conf)).resolves.toBe('mädchen');
    await expect(validateLower('cSütÖrtÖk', conf)).resolves.toBe('csütörtök');
});

test('lower if passed word is not a string, ignores', async () => {
    const validateLower = lower();

    await expect(validateLower(8 as any, conf)).resolves.toBe(undefined);
    await expect(validateLower(NaN as any, conf)).resolves.toBe(undefined);
    await expect(validateLower(true as any, conf)).resolves.toBe(undefined);
    await expect(validateLower([] as any, conf)).resolves.toBe(undefined);
    await expect(validateLower(Array(8).fill('a') as any, conf)).resolves.toBe(undefined);
    await expect(validateLower({} as any, conf)).resolves.toBe(undefined);
    await expect(validateLower(undefined as any, conf)).resolves.toBe(undefined);
    await expect(validateLower(null as any, conf)).resolves.toBe(undefined);
});
