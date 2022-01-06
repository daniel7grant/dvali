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

    await expect(validateBool(true, conf)).resolves.toBeUndefined();
    await expect(validateBool(false, conf)).resolves.toBeUndefined();
});

test('isBool with anything other fails', async () => {
    const validateBool = isBool();

    try {
        await validateBool('string' as any, conf);
    } catch (err) {
        expect(err).toBe('Field boolField should be a boolean.');
    }

    try {
        await validateBool(123 as any, conf);
    } catch (err) {
        expect(err).toBe('Field boolField should be a boolean.');
    }

    try {
        await validateBool(null as any, conf);
    } catch (err) {
        expect(err).toBe('Field boolField should be a boolean.');
    }

    try {
        await validateBool(undefined as any, conf);
    } catch (err) {
        expect(err).toBe('Field boolField should be a boolean.');
    }

    try {
        await validateBool(NaN as any, conf);
    } catch (err) {
        expect(err).toBe('Field boolField should be a boolean.');
    }
});
