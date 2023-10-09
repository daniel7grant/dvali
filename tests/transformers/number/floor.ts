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

    await expect(validateFloor(5, conf)).toBe(5);
    await expect(validateFloor(6.1, conf)).toBe(6);
    await expect(validateFloor(6.9, conf)).toBe(6);
    await expect(validateFloor(7.00000000001, conf)).toBe(7);
});
