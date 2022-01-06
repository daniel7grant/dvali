import { describe, expect, test } from '@jest/globals';
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

const testTransformValidation = (): ValidatorFunction =>
    async function (value, _conf) {
        return Success(value + value);
    };

test('validate with function returns the value on success', async () => {
    const value = 'asdasd';
    const validateTest = validate(testSuccessfulValidation());

    await expect(validateTest(value)).resolves.toBe(value);
});

test('validate with function throws array of error messages on failure', async () => {
    const value = 'asdasd';
    const validateTest = validate(testFailingValidation());

    try {
        await validateTest(value);
    } catch (err) {
        expect(err).toEqual(['test failed']);
    }
});

test('validate with function transforms the value on success', async () => {
    const value = 'asdasd';
    const validateTest = validate(testTransformValidation());

    await expect(validateTest(value)).resolves.toBe(value + value);
});

test('validate with array of functions returns the value on success', async () => {
    const value = 'asdasd';
    const validateTest = validate([testSuccessfulValidation()]);

    await expect(validateTest(value)).resolves.toBe(value);
});

test('validate with array of functions throws array of error messages', async () => {
    const value = 'asdasd';
    const validateTest = validate([testFailingValidation()]);

    try {
        await validateTest(value);
    } catch (err) {
        expect(err).toEqual(['test failed']);
    }
});

test('validate with array of functions can throw multiple error messages', async () => {
    const value = 'asdasd';
    const validateTest = validate([testFailingValidation(), testFailingValidation()]);

    try {
        await validateTest(value);
    } catch (err) {
        expect(err).toEqual(['test failed', 'test failed']);
    }
});

test('validate with array of functions throws when one of them fails', async () => {
    const value = 'asdasd';
    const validateTest = validate([testSuccessfulValidation(), testFailingValidation()]);

    try {
        await validateTest(value);
    } catch (err) {
        expect(err).toEqual(['test failed']);
    }
});

test('validate with array of functions transforms the value on success', async () => {
    const value = 'asdasd';
    const validateTest = validate([testTransformValidation()]);

    await expect(validateTest(value)).resolves.toBe(value + value);
});

test('validate with array of functions can transform multiple times', async () => {
    const value = 'asdasd';
    const validateTest = validate([testTransformValidation(), testTransformValidation()]);

    await expect(validateTest(value)).resolves.toBe(value + value + value + value);
});

test('validate with object returns the value on success', async () => {
    const value = { key: 'asdasd', another: 'dsadas' };
    const validateTest = validate({
        key: [testSuccessfulValidation()],
        another: testSuccessfulValidation(),
    });

    await expect(validateTest(value)).resolves.toEqual(value);
});

test('validate with object works with nested objects', async () => {
    const value = { key: 'asdasd', nested: { and: 'tested' } };
    const validateTest = validate({
        key: [testSuccessfulValidation()],
        nested: {
            and: testSuccessfulValidation(),
        },
    });

    await expect(validateTest(value)).resolves.toEqual(value);
});

test('validate with object throws array of error messages', async () => {
    const value = { key: 'asdasd', another: 'dsadas' };
    const validateTest = validate({
        key: [testFailingValidation()],
        another: testFailingValidation(),
    });

    try {
        await validateTest(value);
    } catch (err) {
        expect(err).toEqual(['test failed', 'test failed']);
    }
});

test('validate with object throws if value is not an object', async () => {
    const value = 'asdasd';
    const validateTest = validate({
        key: [testSuccessfulValidation()],
        another: testSuccessfulValidation(),
    });

    try {
        await validateTest(value);
    } catch (err) {
        expect(err).not.toBeUndefined();
    }
});

test('validate with object strips extraneous keys', async () => {
    const value = { key: 'asdasd', another: 'dsadas', extraKey: 'asd' };
    const strippedValue = { key: 'asdasd', another: 'dsadas' };
    const validateTest = validate({
        key: [testSuccessfulValidation()],
        another: testSuccessfulValidation(),
    });

    await expect(validateTest(value)).resolves.toEqual(strippedValue);
});

test('validate should throw if validator is not an object, function or array', async () => {
    const value = 'asdasd';
    const validateTest = validate(
        'asdasd' as any // TypeScript is pretty cool
    );
    try {
        await validateTest(value);
    } catch (err) {
        expect(err).not.toBeUndefined();
    }
});
