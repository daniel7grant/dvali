import { describe, expect, test } from '@jest/globals';
import { ValidatorConfiguration } from '../../../src/types';
import toMultipleOf from '../../../src/transformers/number/toMultipleOf';

const conf: ValidatorConfiguration = {
    name: 'numField',
    original: {},
    path: [],
    parent: {},
};

test('toMultipleOf validator rounds to the nearest multiple of n mathematically', async () => {
    const validateMultipleOfFive = toMultipleOf(5);

    await expect(validateMultipleOfFive(5, conf)).resolves.toBe(5);
    await expect(validateMultipleOfFive(6.1, conf)).resolves.toBe(5);
    await expect(validateMultipleOfFive(7.5, conf)).resolves.toBe(10);
    await expect(validateMultipleOfFive(10.00000000001, conf)).resolves.toBe(10);
    await expect(validateMultipleOfFive(-7.5, conf)).resolves.toBe(-5);
});

test('toMultipleOf validator rounds to the nearest multiple of n with the given function', async () => {
    const validateMultipleOfFive = toMultipleOf(5, Math.floor);

    await expect(validateMultipleOfFive(5, conf)).resolves.toBe(5);
    await expect(validateMultipleOfFive(6.1, conf)).resolves.toBe(5);
    await expect(validateMultipleOfFive(7.5, conf)).resolves.toBe(5);
    await expect(validateMultipleOfFive(10.00000000001, conf)).resolves.toBe(10);
    await expect(validateMultipleOfFive(-7.5, conf)).resolves.toBe(-10);
});

test('toMultipleOf ignores non-number inputs', async () => {
    const validateMultipleOfFive = toMultipleOf(5);

    await expect(validateMultipleOfFive('10' as any, conf)).resolves.toBe(undefined);
    await expect(validateMultipleOfFive(NaN as any, conf)).resolves.toBe(undefined);
    await expect(validateMultipleOfFive(undefined as any, conf)).resolves.toBe(undefined);
    await expect(validateMultipleOfFive(null as any, conf)).resolves.toBe(undefined);
    await expect(validateMultipleOfFive({} as any, conf)).resolves.toBe(undefined);
});
