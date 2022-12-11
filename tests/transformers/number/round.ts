import { describe, expect, test } from '@jest/globals';
import { ValidatorConfiguration } from '../../../src/types';
import round from '../../../src/transformers/number/round';

const conf: ValidatorConfiguration = {
    name: 'numField',
    original: {},
    path: [],
    parent: {},
};

test('round validator rounds the number to the nearest integer mathematically', async () => {
    const validateRound = round();

    await expect(validateRound(5, conf)).toBe(5);
    await expect(validateRound(6.1, conf)).toBe(6);
    await expect(validateRound(6.5, conf)).toBe(7);
    await expect(validateRound(6.9, conf)).toBe(7);
    await expect(validateRound(7.00000000001, conf)).toBe(7);
});
