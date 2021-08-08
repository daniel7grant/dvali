import test from 'ava';
import arrayOf from '../src/arrayOf';
import validate from '../src/validate';
import { Failure, Success, ValidatorFunction } from '../src/types';

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

test('arrayOf function validates all items in an array', async (t) => {
    const value = [1, 2, 3];
    const validateTest = validate(arrayOf(testSuccessfulValidation()));

    try {
        const validatedValue = await validateTest(value);
        t.deepEqual(validatedValue, value);
    } catch (ex) {
        t.fail();
    }
});

test('arrayOf function validates objects', async (t) => {
    const value = [{ key: 'asdasd' }, { key: 'dsadsa' }];
    const validateTest = validate(arrayOf(testSuccessfulValidation()));

    try {
        const validatedValue = await validateTest(value);
        t.deepEqual(validatedValue, value);
    } catch (ex) {
        t.fail();
    }
});

test('arrayOf function throws error for every wrong item in array', async (t) => {
    const value = [1, 2, 3];
    const validateTest = validate(arrayOf(testFailingValidation()));

    try {
        await validateTest(value);
        t.fail();
    } catch (ex) {
        t.deepEqual(ex, ['test failed', 'test failed', 'test failed']);
    }
});

test('arrayOf function throws error if only part of the array is wrong', async (t) => {
    const value = [1, 2, 3];
    const validateTest = validate(arrayOf(testMinimumValidation()));

    try {
        await validateTest(value);
        t.fail();
    } catch (ex) {
        t.deepEqual(ex, ['test failed', 'test failed']);
    }
});

test('arrayOf function throws error if given data is not an array', async (t) => {
    const value = {};
    const validateTest = validate(arrayOf(testSuccessfulValidation()));

    try {
        await validateTest(value);
        t.fail();
    } catch (ex) {
        t.pass();
    }
});
