import { describe, expect, test } from '@jest/globals';
import { ValidatorConfiguration } from '../../../src/types';
import truncate from '../../../src/transformers/string/truncate';

const conf: ValidatorConfiguration = {
    name: 'numField',
    original: {},
    path: [],
    parent: {},
};

test('truncate validator cuts the string to a maximum number of characters', async () => {
    const validateTruncate = truncate(6);

    await expect(validateTruncate('123', conf)).toBe('123');
    await expect(validateTruncate('123456', conf)).toBe('123456');
    await expect(validateTruncate('123456789', conf)).toBe('123456');
});

test('truncate validator cuts from the end of the string if n is negative', async () => {
    const validateTruncate = truncate(-6);

    await expect(validateTruncate('123', conf)).toBe('123');
    await expect(validateTruncate('123456', conf)).toBe('123456');
    await expect(validateTruncate('123456789', conf)).toBe('456789');
});

test('truncate validator returns empty if n is zero', async () => {
    const validateTruncate = truncate(0);

    await expect(validateTruncate('123', conf)).toBe('');
});
