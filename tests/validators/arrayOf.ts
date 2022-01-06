import { describe, expect, test } from '@jest/globals';
import arrayOf from '../../src/validators/arrayOf';
import validate from '../../src/validate';
import { Failure, Success, ValidatorFunction } from '../../src/types';

const testSuccessfulValidation = (): ValidatorFunction =>
    async function (_value, _conf) {
        return Success();
    };

const testFailingValidation = (): ValidatorFunction =>
    async function (_value, _conf) {
        return Failure('test failed');
    };

const testMinimumValidation = (): ValidatorFunction =>
    async function (value, _conf) {
        if (value > 2) {
            return Success();
        } else {
            return Failure('test failed');
        }
    };

test('arrayOf function validates all items in an array', async () => {
    const value = [1, 2, 3];
    const validateTest = validate(arrayOf(testSuccessfulValidation()));

    await expect(validateTest(value)).resolves.toEqual(value);
});

test('arrayOf function validates objects', async () => {
    const value = [{ key: 'asdasd' }, { key: 'dsadsa' }];
    const validateTest = validate(arrayOf(testSuccessfulValidation()));

    await expect(validateTest(value)).resolves.toEqual(value);
});

test('arrayOf function throws error for every wrong item in array', async () => {
    const value = [1, 2, 3];
    const validateTest = validate(arrayOf(testFailingValidation()));

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
        await validateTest(value);
    } catch (err) {
        expect(err).not.toBeUndefined();
    }
});
