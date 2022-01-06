import { describe, expect, test } from '@jest/globals';
import { ValidatorConfiguration } from '../../../src/types';
import floor from '../../../src/transformers/number/floor';

const conf: ValidatorConfiguration = {
    name: 'numField',
    original: {},
    path: [],
    parent: {},
};

test('floor validator rounds down the number to the nearest integer', async () => {
    const validateFloor = floor();

    await expect(validateFloor(5, conf)).resolves.toBe(5);
    await expect(validateFloor(6.1, conf)).resolves.toBe(6);
    await expect(validateFloor(6.9, conf)).resolves.toBe(6);
    await expect(validateFloor(7.00000000001, conf)).resolves.toBe(7);
});

test('floor ignores non-number inputs', async () => {
    const validateFloor = floor();

    expect(validateFloor('6' as any, conf)).resolves.toBe(undefined);
    await expect(validateFloor(NaN as any, conf)).resolves.toBe(undefined);
    await expect(validateFloor(undefined as any, conf)).resolves.toBe(undefined);
    await expect(validateFloor(null as any, conf)).resolves.toBe(undefined);
    await expect(validateFloor({} as any, conf)).resolves.toBe(undefined);
});
