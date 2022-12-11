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

    await expect(validateLower('asdasd', conf)).toBe('asdasd');
    await expect(validateLower('Asdasd', conf)).toBe('asdasd');
    await expect(validateLower('aSdaSD', conf)).toBe('asdasd');
});

test('lower validator works with locale-strings', async () => {
    const validateLower = lower();

    await expect(validateLower('mÄdchEn', conf)).toBe('mädchen');
    await expect(validateLower('cSütÖrtÖk', conf)).toBe('csütörtök');
});

