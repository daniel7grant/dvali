import { describe, expect, test } from '@jest/globals';
import { ValidatorConfiguration } from '../../../src/types';
import isBool from '../../../src/validators/boolean/isBool';

const conf: ValidatorConfiguration = {
    name: 'boolField',
    original: {},
    parent: {},
    path: [],
};

test('isBool with true or false returns success', async () => {
    const validateBool = isBool();

    expect(validateBool(true, conf)).toEqual(true);
    expect(validateBool(false, conf)).toEqual(false);
});

test('isBool with anything other fails', async () => {
    const validateBool = isBool();

    try {
        validateBool('string', conf);
    } catch (err) {
        expect(err).toBe('Field boolField should be a boolean.');
    }

    try {
        validateBool(123, conf);
    } catch (err) {
        expect(err).toBe('Field boolField should be a boolean.');
    }

    try {
        validateBool(null, conf);
    } catch (err) {
        expect(err).toBe('Field boolField should be a boolean.');
    }

    try {
        validateBool(undefined, conf);
    } catch (err) {
        expect(err).toBe('Field boolField should be a boolean.');
    }

    try {
        validateBool(NaN, conf);
    } catch (err) {
        expect(err).toBe('Field boolField should be a boolean.');
    }
});
