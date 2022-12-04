import { describe, expect, test } from '@jest/globals';
import upper from '../../../src/transformers/string/upper';
import { ValidatorConfiguration } from '../../../src/types';

const conf: ValidatorConfiguration = {
    name: 'numField',
    original: {},
    path: [],
    parent: {},
};

test('upper validator changes every letter to the uppercase equivalent', async () => {
    const validateUpper = upper();

    await expect(validateUpper('asdasd', conf)).toBe('ASDASD');
    await expect(validateUpper('Asdasd', conf)).toBe('ASDASD');
    await expect(validateUpper('aSdaSD', conf)).toBe('ASDASD');
    await expect(validateUpper('ASDASD', conf)).toBe('ASDASD');
});

test('upper validator works with locale-strings', async () => {
    const validateUpper = upper();

    await expect(validateUpper('weiß', conf)).toBe('WEISS');
    await expect(validateUpper('cSütÖrtÖk', conf)).toBe('CSÜTÖRTÖK');
});
test('upper if passed word is not a string, ignores', async () => {
    const validateUpper = upper();

    await expect(validateUpper(8 as any, conf)).toBe(undefined);
    await expect(validateUpper(NaN as any, conf)).toBe(undefined);
    await expect(validateUpper(true as any, conf)).toBe(undefined);
    await expect(validateUpper([] as any, conf)).toBe(undefined);
    await expect(validateUpper(Array(8).fill('a') as any, conf)).toBe(undefined);
    await expect(validateUpper({} as any, conf)).toBe(undefined);
    await expect(validateUpper(undefined as any, conf)).toBe(undefined);
    await expect(validateUpper(null as any, conf)).toBe(undefined);
});
