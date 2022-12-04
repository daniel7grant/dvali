import { describe, expect, test } from '@jest/globals';
import { ValidatorConfiguration } from '../../src/types';
import equals from '../../src/validators/equals';

const conf: ValidatorConfiguration = {
    name: 'strField',
    original: {},
    path: [],
    parent: {},
};

test('equals validator if the value is equals to the param, returns successfully', async () => {
    const validateStringEquality = equals('asdasd');
    await expect(validateStringEquality('asdasd', conf)).toBeUndefined();

    const validateNumberEquality = equals(100);
    await expect(validateNumberEquality(100, conf)).toBeUndefined();

    const validateBoolEquality = equals(true);
    await expect(validateBoolEquality(true, conf)).toBeUndefined();

    const obj = {};
    const validateObjectEquality = equals(obj);
    await expect(validateObjectEquality(obj, conf)).toBeUndefined();

    const validateNullEquality = equals(null);
    await expect(validateNullEquality(null, conf)).toBeUndefined();

    const validateUndefinedEquality = equals(undefined);
    await expect(validateUndefinedEquality(undefined, conf)).toBeUndefined();
});

test('equals validator if the value is not equals, fails', async () => {
    const validateStringEquality = equals('asdasd');
    try {
        await validateStringEquality('dsadsa', conf);
    } catch (err) {
        expect(err).toBe('Field strField should be equal to asdasd.');
    }

    const validateCapitalizedStringEquality = equals('asdasd');
    try {
        await validateCapitalizedStringEquality('ASDASD', conf);
    } catch (err) {
        expect(err).toBe('Field strField should be equal to asdasd.');
    }

    const validateNumberEquality = equals(100);
    try {
        await validateNumberEquality(101, conf);
    } catch (err) {
        expect(err).toBe('Field strField should be equal to 100.');
    }

    const validateFloatEquality = equals(0.3);
    try {
        await validateFloatEquality(0.1 + 0.2, conf);
    } catch (err) {
        expect(err).toBe('Field strField should be equal to 0.3.');
    }

    const validateBoolEquality = equals(true);
    try {
        await validateBoolEquality(false, conf);
    } catch (err) {
        expect(err).toBe('Field strField should be equal to true.');
    }

    const validateNaNEquality = equals(NaN);
    try {
        await validateNaNEquality(NaN, conf);
    } catch (err) {
        expect(err).toBe('Field strField should be equal to NaN.');
    }

    const validateObjectEquality = equals({});
    try {
        await validateObjectEquality({}, conf);
    } catch (err) {
        expect(err).toBe('Field strField should be equal to [object Object].');
    }
});
