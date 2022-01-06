import { describe, expect, test } from '@jest/globals';
import { ValidatorConfiguration } from '../../../src/types';
import lt from '../../../src/validators/number/lt';

const conf: ValidatorConfiguration = {
    name: 'numField',
    original: {},
    path: [],
    parent: {},
};

test('lt when the number is lower returns success', async () => {
    const validateLessThanTen = lt(10);

    await expect(validateLessThanTen(0, conf)).resolves.toBeUndefined();
    await expect(validateLessThanTen(-5, conf)).resolves.toBeUndefined();
    await expect(validateLessThanTen(-Infinity, conf)).resolves.toBeUndefined();
});

test('lt when the number is greater or equal fails', async () => {
    const validateLessThanTen = lt(10);

    try {
        await validateLessThanTen(10, conf);
    } catch (err) {
        expect(err).toBe('Field numField should be less than 10.');
    }
    try {
        await validateLessThanTen(50, conf);
    } catch (err) {
        expect(err).toBe('Field numField should be less than 10.');
    }
    try {
        await validateLessThanTen(Infinity, conf);
    } catch (err) {
        expect(err).toBe('Field numField should be less than 10.');
    }
});

test('lt ignores non-number inputs', async () => {
    const validateLessThanTen = lt(10);

    await expect(validateLessThanTen('6' as any, conf)).resolves.toBeUndefined();
    await expect(validateLessThanTen(NaN as any, conf)).resolves.toBeUndefined();
    await expect(validateLessThanTen(undefined as any, conf)).resolves.toBeUndefined();
    await expect(validateLessThanTen(null as any, conf)).resolves.toBeUndefined();
    await expect(validateLessThanTen({} as any, conf)).resolves.toBeUndefined();
});
