import { describe, expect, test } from '@jest/globals';
import { ValidatorConfiguration } from '../../../src/types';
import clamp from '../../../src/transformers/number/clamp';

const conf: ValidatorConfiguration = {
    name: 'numField',
    original: {},
    path: [],
    parent: {},
};

test('clamp validator returns the number if it is between the two limits', async () => {
    const validateClamp = clamp(5, 7);

    await expect(validateClamp(5, conf)).resolves.toBe(5);
    await expect(validateClamp(5.5, conf)).resolves.toBe(5.5);
    await expect(validateClamp(6, conf)).resolves.toBe(6);
    await expect(validateClamp(7, conf)).resolves.toBe(7);
});

test('clamp validator returns the closest limit if the value is outside the limit', async () => {
    const validateClamp = clamp(5, 7);

    await expect(validateClamp(-Infinity, conf)).resolves.toBe(5);
    await expect(validateClamp(-1000, conf)).resolves.toBe(5);
    await expect(validateClamp(999, conf)).resolves.toBe(7);
    await expect(validateClamp(Infinity, conf)).resolves.toBe(7);
});

test('clamp validator works with decimal limits too', async () => {
    const validateClamp = clamp(5.1, 6.9);

    await expect(validateClamp(-1000, conf)).resolves.toBe(5.1);
    await expect(validateClamp(5.1, conf)).resolves.toBe(5.1);
    await expect(validateClamp(6, conf)).resolves.toBe(6);
    await expect(validateClamp(6.3, conf)).resolves.toBe(6.3);
    await expect(validateClamp(999, conf)).resolves.toBe(6.9);
});

test('clamp ignores non-number inputs', async () => {
    const validateClamp = clamp(5, 7);

    await expect(validateClamp('6' as any, conf)).resolves.toBe(undefined);
    await expect(validateClamp(NaN as any, conf)).resolves.toBe(undefined);
    await expect(validateClamp(undefined as any, conf)).resolves.toBe(undefined);
    await expect(validateClamp(null as any, conf)).resolves.toBe(undefined);
    await expect(validateClamp({} as any, conf)).resolves.toBe(undefined);
});
