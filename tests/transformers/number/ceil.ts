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

    await expect(validateCeil(5, conf)).resolves.toBe(5);
    await expect(validateCeil(6.1, conf)).resolves.toBe(7);
    await expect(validateCeil(6.5, conf)).resolves.toBe(7);
    await expect(validateCeil(6.9, conf)).resolves.toBe(7);
    await expect(validateCeil(7.999999999999901, conf)).resolves.toBe(8);
});

test('ceil ignores non-number inputs', async () => {
    const validateCeil = ceil();

    expect(validateCeil('6' as any, conf)).resolves.toBe(undefined);
    await expect(validateCeil(NaN as any, conf)).resolves.toBe(undefined);
    await expect(validateCeil(undefined as any, conf)).resolves.toBe(undefined);
    await expect(validateCeil(null as any, conf)).resolves.toBe(undefined);
    await expect(validateCeil({} as any, conf)).resolves.toBe(undefined);
});
