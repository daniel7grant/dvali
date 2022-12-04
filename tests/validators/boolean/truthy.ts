import { describe, expect, test } from '@jest/globals';
import { ValidatorConfiguration } from '../../../src/types';
import truthy from '../../../src/validators/boolean/truthy';

const conf: ValidatorConfiguration = {
    name: 'boolField',
    original: {},
    parent: {},
    path: [],
};

test('truthy with other values returns success', async () => {
    const validateTruthy = truthy();

    await expect(validateTruthy(true, conf)).toBeUndefined();
    await expect(validateTruthy(1 as any, conf)).toBeUndefined();
    await expect(validateTruthy(-1 as any, conf)).toBeUndefined();
    await expect(validateTruthy('string' as any, conf)).toBeUndefined();
    await expect(validateTruthy({} as any, conf)).toBeUndefined();
    await expect(validateTruthy([] as any, conf)).toBeUndefined();
});

test('truthy with false, zero, empty string or nullish other fails', async () => {
    const validateTruthy = truthy();

    try {
        await validateTruthy(false, conf);
    } catch (err) {
        expect(err).toBe('Field boolField should be truthy.');
    }
    try {
        await validateTruthy(0 as any, conf);
    } catch (err) {
        expect(err).toBe('Field boolField should be truthy.');
    }
    try {
        await validateTruthy(-0 as any, conf);
    } catch (err) {
        expect(err).toBe('Field boolField should be truthy.');
    }
    try {
        await validateTruthy('' as any, conf);
    } catch (err) {
        expect(err).toBe('Field boolField should be truthy.');
    }
    try {
        await validateTruthy(null as any, conf);
    } catch (err) {
        expect(err).toBe('Field boolField should be truthy.');
    }
    try {
        await validateTruthy(undefined as any, conf);
    } catch (err) {
        expect(err).toBe('Field boolField should be truthy.');
    }
    try {
        await validateTruthy(NaN as any, conf);
    } catch (err) {
        expect(err).toBe('Field boolField should be truthy.');
    }
});
