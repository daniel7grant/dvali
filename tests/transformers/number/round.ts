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

test('round ignores non-number inputs', async () => {
    const validateRound = round();

    expect(validateRound('6' as any, conf)).toBe(undefined);
    await expect(validateRound(NaN as any, conf)).toBe(undefined);
    await expect(validateRound(undefined as any, conf)).toBe(undefined);
    await expect(validateRound(null as any, conf)).toBe(undefined);
    await expect(validateRound({} as any, conf)).toBe(undefined);
});
