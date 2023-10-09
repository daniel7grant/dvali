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

    await expect(validateNormalize('\u006E\u0303', conf)).toBe('\u00F1'); // ñ
});

test('normalize validator normalizes the string with another normalization form', async () => {
    const validateNormalize = normalize('NFD');

    await expect(validateNormalize('\u00F1', conf)).toBe('\u006E\u0303'); // ñ
});
