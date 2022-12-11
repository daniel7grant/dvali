import { describe, expect, test } from '@jest/globals';
import { ValidatorConfiguration } from '../../src/types';
import oneOf from '../../src/validators/oneOf';

const conf: ValidatorConfiguration = {
    name: 'strField',
    original: {},
    path: [],
    parent: {},
};

test('oneOf validator if the value is one of the list, returns successfully', async () => {
    const validateStringEquality = oneOf(['one', 'two', 'three']);
    expect(validateStringEquality('one', conf)).toEqual('one');
    expect(validateStringEquality('two', conf)).toEqual('two');
    expect(validateStringEquality('three', conf)).toEqual('three');

    const validateNumberEquality = oneOf([100, 101, 102]);
    expect(validateNumberEquality(100, conf)).toEqual(100);
    expect(validateNumberEquality(101, conf)).toEqual(101);
    expect(validateNumberEquality(102, conf)).toEqual(102);

    const validateBoolEquality = oneOf([true, false]);
    expect(validateBoolEquality(true, conf)).toEqual(true);
    expect(validateBoolEquality(false, conf)).toEqual(false);

    const obj = {};
    const validateObjectEquality = oneOf([obj]);
    expect(validateObjectEquality(obj, conf)).toEqual(obj);

    const validateNullEquality = oneOf([null, undefined]);
    expect(validateNullEquality(null, conf)).toEqual(null);
    expect(validateNullEquality(undefined, conf)).toEqual(undefined);
});

test('oneOf validator if the value is not in the list, fails', async () => {
    const validateStringEquality = oneOf(['one', 'two', 'three']);
    try {
        validateStringEquality('four', conf);
    } catch (err) {
        expect(err).toBe('Field strField should be one of one, two, three.');
    }

    const validateCapitalizedStringEquality = oneOf(['one', 'two', 'three']);
    try {
        validateCapitalizedStringEquality('ONE', conf);
    } catch (err) {
        expect(err).toBe('Field strField should be one of one, two, three.');
    }

    const validateEmptyStringEquality = oneOf(['one', 'two', 'three']);
    try {
        validateEmptyStringEquality('', conf);
    } catch (err) {
        expect(err).toBe('Field strField should be one of one, two, three.');
    }

    const validateNumberEquality = oneOf([100, 101, 102]);
    try {
        validateNumberEquality(99, conf);
    } catch (err) {
        expect(err).toBe('Field strField should be one of 100, 101, 102.');
    }

    const validateFloatNumberEquality = oneOf([0.1, 0.2, 0.3]);
    try {
        validateFloatNumberEquality(0.1 + 0.2, conf);
    } catch (err) {
        expect(err).toBe('Field strField should be one of 0.1, 0.2, 0.3.');
    }

    const validateBoolEquality = oneOf([true]);
    try {
        validateBoolEquality(false, conf);
    } catch (err) {
        expect(err).toBe('Field strField should be one of true.');
    }

    const validateNaNEquality = oneOf([NaN]);
    try {
        validateNaNEquality(NaN, conf);
    } catch (err) {
        expect(err).toBe('Field strField should be one of NaN.');
    }

    const validateObjectEquality = oneOf([{}]);
    try {
        validateObjectEquality({}, conf);
    } catch (err) {
        expect(err).toBe('Field strField should be one of [object Object].');
    }
});
