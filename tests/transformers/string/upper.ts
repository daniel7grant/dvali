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

    await expect(validateUpper('asdasd', conf)).resolves.toBe('ASDASD');
    await expect(validateUpper('Asdasd', conf)).resolves.toBe('ASDASD');
    await expect(validateUpper('aSdaSD', conf)).resolves.toBe('ASDASD');
    await expect(validateUpper('ASDASD', conf)).resolves.toBe('ASDASD');
});

test('upper validator works with locale-strings', async () => {
    const validateUpper = upper();

    await expect(validateUpper('weiß', conf)).resolves.toBe('WEISS');
    await expect(validateUpper('cSütÖrtÖk', conf)).resolves.toBe('CSÜTÖRTÖK');
});
test('upper if passed word is not a string, ignores', async () => {
    const validateUpper = upper();

    await expect(validateUpper(8 as any, conf)).resolves.toBe(undefined);
    await expect(validateUpper(NaN as any, conf)).resolves.toBe(undefined);
    await expect(validateUpper(true as any, conf)).resolves.toBe(undefined);
    await expect(validateUpper([] as any, conf)).resolves.toBe(undefined);
    await expect(validateUpper(Array(8).fill('a') as any, conf)).resolves.toBe(undefined);
    await expect(validateUpper({} as any, conf)).resolves.toBe(undefined);
    await expect(validateUpper(undefined as any, conf)).resolves.toBe(undefined);
    await expect(validateUpper(null as any, conf)).resolves.toBe(undefined);
});
