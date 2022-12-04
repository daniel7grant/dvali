import { describe, expect, test } from '@jest/globals';
import { ValidatorConfiguration } from '../../../src/types';
import closeTo from '../../../src/validators/number/closeTo';

const conf: ValidatorConfiguration = {
    name: 'numField',
    original: {},
    path: [],
    parent: {},
};

test('closeTo when the two values are closer than an epsilon, returns the exact value', async () => {
    const validateCloseTo = closeTo(0.3);

    await expect(validateCloseTo(0.3, conf)).toBe(0.3);
    await expect(validateCloseTo(0.3 + 1e-16, conf)).toBe(0.3);
    await expect(validateCloseTo(0.2 + 0.1, conf)).toBe(0.3);
});

test('closeTo when the two values are farther than an epsilon, fails', async () => {
    const validateCloseTo = closeTo(0.3);

    try {
        await validateCloseTo(0.4, conf);
    } catch (err) {
        expect(err).toBe('Field numField should be approximately 0.3.');
    }

    try {
        await validateCloseTo(0.31, conf);
    } catch (err) {
        expect(err).toBe('Field numField should be approximately 0.3.');
    }

    try {
        await validateCloseTo(0.3 + 1e-10, conf);
    } catch (err) {
        expect(err).toBe('Field numField should be approximately 0.3.');
    }

    try {
        await validateCloseTo(Infinity, conf);
    } catch (err) {
        expect(err).toBe('Field numField should be approximately 0.3.');
    }
});

test('closeTo when can configure the epsilon', async () => {
    const validateCloseTo = closeTo(0.3, 0.001);

    await expect(validateCloseTo(0.3, conf)).toBe(0.3);
    await expect(validateCloseTo(0.3 + 1e-10, conf)).toBe(0.3);
    await expect(validateCloseTo(0.2 + 0.1, conf)).toBe(0.3);
    await expect(validateCloseTo(0.3 - 0.0001, conf)).toBe(0.3);

    try {
        await validateCloseTo(0.4, conf);
    } catch (err) {
        expect(err).toBe('Field numField should be approximately 0.3.');
    }
});

test('closeTo when the passed value is not a number, ignores', async () => {
    const validateCloseTo = closeTo(0.3);

    await expect(validateCloseTo('string' as any, conf)).toBeUndefined();
    await expect(validateCloseTo(null as any, conf)).toBeUndefined();
    await expect(validateCloseTo({} as any, conf)).toBeUndefined();
});
