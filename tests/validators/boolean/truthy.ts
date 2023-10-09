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

    expect(validateTruthy(true, conf)).toEqual(true);
    expect(validateTruthy(1, conf)).toEqual(1);
    expect(validateTruthy(-1, conf)).toEqual(-1);
    expect(validateTruthy('string', conf)).toEqual('string');
    expect(validateTruthy({}, conf)).toEqual({});
    expect(validateTruthy([], conf)).toEqual([]);
});

test('truthy with false, zero, empty string or nullish other fails', async () => {
    const validateTruthy = truthy();

    try {
        validateTruthy(false, conf);
    } catch (err) {
        expect(err).toBe('Field boolField should be truthy.');
    }
    try {
        validateTruthy(0, conf);
    } catch (err) {
        expect(err).toBe('Field boolField should be truthy.');
    }
    try {
        validateTruthy(-0, conf);
    } catch (err) {
        expect(err).toBe('Field boolField should be truthy.');
    }
    try {
        validateTruthy('', conf);
    } catch (err) {
        expect(err).toBe('Field boolField should be truthy.');
    }
    try {
        validateTruthy(null, conf);
    } catch (err) {
        expect(err).toBe('Field boolField should be truthy.');
    }
    try {
        validateTruthy(undefined, conf);
    } catch (err) {
        expect(err).toBe('Field boolField should be truthy.');
    }
    try {
        validateTruthy(NaN, conf);
    } catch (err) {
        expect(err).toBe('Field boolField should be truthy.');
    }
});
