import { describe, expect, test } from '@jest/globals';
import { ValidatorConfiguration } from '../../../src/types';
import trim from '../../../src/transformers/string/trim';

const conf: ValidatorConfiguration = {
    name: 'numField',
    original: {},
    path: [],
    parent: {},
};

test('trim validator removes whitespace from the start and end', async () => {
    const validateTrim = trim();

    await expect(validateTrim(' asdasd    ', conf)).resolves.toBe('asdasd');
    await expect(validateTrim(' asdasd\r\n\t', conf)).resolves.toBe('asdasd');
    await expect(validateTrim(' asd asd\t', conf)).resolves.toBe('asd asd');
    await expect(validateTrim(' asd\r\nasd\t', conf)).resolves.toBe('asd\r\nasd');
});

test('trim if passed word is not a string, ignores', async () => {
    const validateTrim = trim();

    await expect(validateTrim(8 as any, conf)).resolves.toBe(undefined);
    await expect(validateTrim(NaN as any, conf)).resolves.toBe(undefined);
    await expect(validateTrim(true as any, conf)).resolves.toBe(undefined);
    await expect(validateTrim([] as any, conf)).resolves.toBe(undefined);
    await expect(validateTrim(Array(8).fill('a') as any, conf)).resolves.toBe(undefined);
    await expect(validateTrim({} as any, conf)).resolves.toBe(undefined);
    await expect(validateTrim(undefined as any, conf)).resolves.toBe(undefined);
    await expect(validateTrim(null as any, conf)).resolves.toBe(undefined);
});
