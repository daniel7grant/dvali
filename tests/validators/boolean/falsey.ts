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

    expect(validateFalsey(false, conf)).toEqual(false);
    expect(validateFalsey(0, conf)).toEqual(0);
    expect(validateFalsey(-0, conf)).toEqual(-0);
    expect(validateFalsey('', conf)).toEqual('');
    expect(validateFalsey(null, conf)).toEqual(null);
    expect(validateFalsey(undefined, conf)).toEqual(undefined);
    expect(validateFalsey(NaN, conf)).toEqual(NaN);
});

test('falsey with anything other fails', async () => {
    const validateFalsey = falsey();

    try {
        validateFalsey(true as any, conf);
    } catch (err) {
        expect(err).toBe('Field boolField should be falsey.');
    }

    try {
        validateFalsey(-1 as any, conf);
    } catch (err) {
        expect(err).toBe('Field boolField should be falsey.');
    }

    try {
        validateFalsey('string' as any, conf);
    } catch (err) {
        expect(err).toBe('Field boolField should be falsey.');
    }

    try {
        validateFalsey({} as any, conf);
    } catch (err) {
        expect(err).toBe('Field boolField should be falsey.');
    }

    try {
        validateFalsey([] as any, conf);
    } catch (err) {
        expect(err).toBe('Field boolField should be falsey.');
    }

    try {
        validateFalsey((() => {}) as any, conf);
    } catch (err) {
        expect(err).toBe('Field boolField should be falsey.');
    }
});
