import { describe, expect, test } from '@jest/globals';
import { ValidatorConfiguration } from '../../../src/types';
import normalize from '../../../src/transformers/string/normalize';

const conf: ValidatorConfiguration = {
    name: 'numField',
    original: {},
    path: [],
    parent: {},
};

test('normalize validator normalizes the Unicode representation of a string', async () => {
    const validateNormalize = normalize();

    await expect(validateNormalize('\u006E\u0303', conf)).resolves.toBe('\u00F1'); // ñ
});

test('normalize validator normalizes the string with another normalization form', async () => {
    const validateNormalize = normalize('NFD');

    await expect(validateNormalize('\u00F1', conf)).resolves.toBe('\u006E\u0303'); // ñ
});

test('normalize if passed word is not a string, ignores', async () => {
    const validateNormalize = normalize();

    await expect(validateNormalize(8 as any, conf)).resolves.toBe(undefined);
    await expect(validateNormalize(NaN as any, conf)).resolves.toBe(undefined);
    await expect(validateNormalize(true as any, conf)).resolves.toBe(undefined);
    await expect(validateNormalize([] as any, conf)).resolves.toBe(undefined);
    await expect(validateNormalize(Array(8).fill('a') as any, conf)).resolves.toBe(undefined);
    await expect(validateNormalize({} as any, conf)).resolves.toBe(undefined);
    await expect(validateNormalize(undefined as any, conf)).resolves.toBe(undefined);
    await expect(validateNormalize(null as any, conf)).resolves.toBe(undefined);
});
