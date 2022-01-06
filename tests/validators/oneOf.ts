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
    await expect(validateStringEquality('one', conf)).resolves.toBeUndefined();
    await expect(validateStringEquality('two', conf)).resolves.toBeUndefined();
    await expect(validateStringEquality('three', conf)).resolves.toBeUndefined();

    const validateNumberEquality = oneOf([100, 101, 102]);
    await expect(validateNumberEquality(100, conf)).resolves.toBeUndefined();
    await expect(validateNumberEquality(101, conf)).resolves.toBeUndefined();
    await expect(validateNumberEquality(102, conf)).resolves.toBeUndefined();

    const validateBoolEquality = oneOf([true, false]);
    await expect(validateBoolEquality(true, conf)).resolves.toBeUndefined();
    await expect(validateBoolEquality(false, conf)).resolves.toBeUndefined();

    const obj = {};
    const validateObjectEquality = oneOf([obj]);
    await expect(validateObjectEquality(obj, conf)).resolves.toBeUndefined();

    const validateNullEquality = oneOf([null, undefined]);
    await expect(validateNullEquality(null, conf)).resolves.toBeUndefined();
    await expect(validateNullEquality(undefined, conf)).resolves.toBeUndefined();
});

test('oneOf validator if the value is not in the list, fails', async () => {
    const validateStringEquality = oneOf(['one', 'two', 'three']);
    try {
        await validateStringEquality('four', conf);
    } catch (err) {
        expect(err).toBe('Field strField should be one of one, two, three.');
    }

    const validateCapitalizedStringEquality = oneOf(['one', 'two', 'three']);
    try {
        await validateCapitalizedStringEquality('ONE', conf);
    } catch (err) {
        expect(err).toBe('Field strField should be one of one, two, three.');
    }

    const validateEmptyStringEquality = oneOf(['one', 'two', 'three']);
    try {
        await validateEmptyStringEquality('', conf);
    } catch (err) {
        expect(err).toBe('Field strField should be one of one, two, three.');
    }

    const validateNumberEquality = oneOf([100, 101, 102]);
    try {
        await validateNumberEquality(99, conf);
    } catch (err) {
        expect(err).toBe('Field strField should be one of 100, 101, 102.');
    }

    const validateFloatNumberEquality = oneOf([0.1, 0.2, 0.3]);
    try {
        await validateFloatNumberEquality(0.1 + 0.2, conf);
    } catch (err) {
        expect(err).toBe('Field strField should be one of 0.1, 0.2, 0.3.');
    }

    const validateBoolEquality = oneOf([true]);
    try {
        await validateBoolEquality(false, conf);
    } catch (err) {
        expect(err).toBe('Field strField should be one of true.');
    }

    const validateNaNEquality = oneOf([NaN]);
    try {
        await validateNaNEquality(NaN, conf);
    } catch (err) {
        expect(err).toBe('Field strField should be one of NaN.');
    }

    const validateObjectEquality = oneOf([{}]);
    try {
        await validateObjectEquality({}, conf);
    } catch (err) {
        expect(err).toBe('Field strField should be one of [object Object].');
    }
});
