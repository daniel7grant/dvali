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
    expect(validateStringEquality('asdasd', conf)).toEqual('asdasd');

    const validateNumberEquality = equals(100);
    expect(validateNumberEquality(100, conf)).toEqual(100);

    const validateBoolEquality = equals(true);
    expect(validateBoolEquality(true, conf)).toEqual(true);

    const obj = {};
    const validateObjectEquality = equals(obj);
    expect(validateObjectEquality(obj, conf)).toEqual(obj);

    const validateNullEquality = equals(null);
    expect(validateNullEquality(null, conf)).toEqual(null);

    const validateUndefinedEquality = equals(undefined);
    expect(validateUndefinedEquality(undefined, conf)).toEqual(undefined);
});

test('equals validator if the value is not equals, fails', async () => {
    const validateStringEquality = equals('asdasd');
    try {
        validateStringEquality('dsadsa', conf);
    } catch (err) {
        expect(err).toBe('Field strField should be equal to asdasd.');
    }

    const validateCapitalizedStringEquality = equals('asdasd');
    try {
        validateCapitalizedStringEquality('ASDASD', conf);
    } catch (err) {
        expect(err).toBe('Field strField should be equal to asdasd.');
    }

    const validateNumberEquality = equals(100);
    try {
        validateNumberEquality(101, conf);
    } catch (err) {
        expect(err).toBe('Field strField should be equal to 100.');
    }

    const validateFloatEquality = equals(0.3);
    try {
        validateFloatEquality(0.1 + 0.2, conf);
    } catch (err) {
        expect(err).toBe('Field strField should be equal to 0.3.');
    }

    const validateBoolEquality = equals(true);
    try {
        validateBoolEquality(false, conf);
    } catch (err) {
        expect(err).toBe('Field strField should be equal to true.');
    }

    const validateNaNEquality = equals(NaN);
    try {
        validateNaNEquality(NaN, conf);
    } catch (err) {
        expect(err).toBe('Field strField should be equal to NaN.');
    }

    const validateObjectEquality = equals({});
    try {
        validateObjectEquality({}, conf);
    } catch (err) {
        expect(err).toBe('Field strField should be equal to [object Object].');
    }
});
