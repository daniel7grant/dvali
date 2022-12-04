import { describe, expect, test } from '@jest/globals';
import { ValidatorConfiguration } from '../../../src/types';
import falsey from '../../../src/validators/boolean/falsey';

const conf: ValidatorConfiguration = {
    name: 'boolField',
    original: {},
    parent: {},
    path: [],
};

test('falsey with false, zero, empty string or nullish returns success', async () => {
    const validateFalsey = falsey();

    await expect(validateFalsey(false, conf)).toBeUndefined();
    await expect(validateFalsey(0 as any, conf)).toBeUndefined();
    await expect(validateFalsey(-0 as any, conf)).toBeUndefined();
    await expect(validateFalsey('' as any, conf)).toBeUndefined();
    await expect(validateFalsey(null as any, conf)).toBeUndefined();
    await expect(validateFalsey(undefined as any, conf)).toBeUndefined();
    await expect(validateFalsey(NaN as any, conf)).toBeUndefined();
});

test('falsey with anything other fails', async () => {
    const validateFalsey = falsey();

    try {
        await validateFalsey(true as any, conf);
    } catch (err) {
        expect(err).toBe('Field boolField should be falsey.');
    }

    try {
        await validateFalsey(-1 as any, conf);
    } catch (err) {
        expect(err).toBe('Field boolField should be falsey.');
    }

    try {
        await validateFalsey('string' as any, conf);
    } catch (err) {
        expect(err).toBe('Field boolField should be falsey.');
    }

    try {
        await validateFalsey({} as any, conf);
    } catch (err) {
        expect(err).toBe('Field boolField should be falsey.');
    }

    try {
        await validateFalsey([] as any, conf);
    } catch (err) {
        expect(err).toBe('Field boolField should be falsey.');
    }

    try {
        validateFalsey((() => {}) as any, conf);
    } catch (err) {
        expect(err).toBe('Field boolField should be falsey.');
    }
});
