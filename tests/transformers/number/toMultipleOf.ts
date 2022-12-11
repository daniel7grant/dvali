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

    await expect(validateMultipleOfFive(5, conf)).toBe(5);
    await expect(validateMultipleOfFive(6.1, conf)).toBe(5);
    await expect(validateMultipleOfFive(7.5, conf)).toBe(10);
    await expect(validateMultipleOfFive(10.00000000001, conf)).toBe(10);
    await expect(validateMultipleOfFive(-7.5, conf)).toBe(-5);
});

test('toMultipleOf validator rounds to the nearest multiple of n with the given function', async () => {
    const validateMultipleOfFive = toMultipleOf(5, Math.floor);

    await expect(validateMultipleOfFive(5, conf)).toBe(5);
    await expect(validateMultipleOfFive(6.1, conf)).toBe(5);
    await expect(validateMultipleOfFive(7.5, conf)).toBe(5);
    await expect(validateMultipleOfFive(10.00000000001, conf)).toBe(10);
    await expect(validateMultipleOfFive(-7.5, conf)).toBe(-10);
});
