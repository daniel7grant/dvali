import { describe, expect, test } from '@jest/globals';
import arrayOf from '../../src/validators/arrayOf';
import validate from '../../src/validate';
import { SyncValidatorFunction, ValidatorFunction } from '../../src/types';

const testSuccessfulValidation = (): SyncValidatorFunction<number, number> =>
    function (value, _conf) {
        return value;
    };

const testSuccessfulValidationP = (): ValidatorFunction<number, number> =>
    async function (value, _conf) {
        return value;
    };

const testFailingValidation = (): SyncValidatorFunction<number, number> =>
    function (_value, _conf) {
        throw 'test failed';
    };

const testFailingValidationP = (): ValidatorFunction<number, number> =>
    async function (_value, _conf) {
        throw 'test failed';
    };

const testMinimumValidation = (): ValidatorFunction<number, number> =>
    async function (value, _conf) {
        if (value > 2) {
            return value;
        } else {
            throw 'test failed';
        }
    };

test('arrayOf function validates all items in an array with sync validator', async () => {
    const value = [1, 2, 3];
    const validateTest = validate(arrayOf(testSuccessfulValidation()));

    const result: number[] = validateTest(value);
    expect(result).toEqual(value);
});

test('arrayOf function validates all items in an array with async validator', async () => {
    const value = [1, 2, 3];
    const validateTest = validate(arrayOf(testSuccessfulValidationP()));

    const result: Promise<number[]> = validateTest(value);
    await expect(result).resolves.toEqual(value);
});

test('arrayOf function validates objects with sync validator', async () => {
    const value = [{ key: 1 }, { key: 2 }];
    const validateTest = validate(arrayOf({ key: testSuccessfulValidation() }));

    const result: { key: number }[] = validateTest(value);
    expect(result).toEqual(value);
});

test('arrayOf function validates objects with async validator', async () => {
    const value = [{ key: 1 }, { key: 2 }];
    const validateTest = validate(arrayOf({ key: testSuccessfulValidationP() }));

	const result: Promise<{ key: number }[]> = validateTest(value);
    await expect(result).resolves.toEqual(value);
});

test('arrayOf function throws error for every wrong item in array with sync validator', async () => {
    const value = [1, 2, 3];
    const validateTest = validate(arrayOf(testFailingValidation()));

    try {
        validateTest(value);
    } catch (err) {
        expect(err).toEqual(['test failed', 'test failed', 'test failed']);
    }
});

test('arrayOf function throws error for every wrong item in array with async validator', async () => {
    const value = [1, 2, 3];
    const validateTest = validate(arrayOf(testFailingValidationP()));

    try {
        await validateTest(value);
    } catch (err) {
        expect(err).toEqual(['test failed', 'test failed', 'test failed']);
    }
});

test('arrayOf function throws error if only part of the array is wrong', async () => {
    const value = [1, 2, 3];
    const validateTest = validate(arrayOf(testMinimumValidation()));

    try {
        await validateTest(value);
    } catch (err) {
        expect(err).toEqual(['test failed', 'test failed']);
    }
});

test('arrayOf function throws error if given data is not an array', async () => {
    const value = {};
    const validateTest = validate(arrayOf(testSuccessfulValidation()));

    try {
        validateTest(value as any);
    } catch (err) {
        expect(err).not.toBeUndefined();
    }
});
