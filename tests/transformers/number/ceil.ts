import { describe, expect, test } from '@jest/globals';
import { ValidatorConfiguration } from '../../../src/types';
import ceil from '../../../src/transformers/number/ceil';

const conf: ValidatorConfiguration = {
    name: 'numField',
    original: {},
    path: [],
    parent: {},
};

test('ceil validator rounds up the number to the nearest integer', async () => {
    const validateCeil = ceil();

    await expect(validateCeil(5, conf)).toBe(5);
    await expect(validateCeil(6.1, conf)).toBe(7);
    await expect(validateCeil(6.5, conf)).toBe(7);
    await expect(validateCeil(6.9, conf)).toBe(7);
    await expect(validateCeil(7.999999999999901, conf)).toBe(8);
});
