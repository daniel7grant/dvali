import test from 'ava';
import { Failure, Success, validate, ValidatorFunction } from '../src/dvali';

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

test('validate with function returns the value on success', async (t) => {
    const value = 'asdasd';
    const validateTest = validate(testSuccessfulValidation());

    try {
        const validatedValue = await validateTest(value);
        t.is(validatedValue, value);
    } catch {
        t.fail();
    }
});

test('validate with function throws array of error messages on failure', async (t) => {
    const value = 'asdasd';
    const validateTest = validate(testFailingValidation());

    try {
        await validateTest(value);
        t.fail();
    } catch (ex) {
        t.deepEqual(ex, ['test failed']);
    }
});

test('validate with function transforms the value on success', async (t) => {
    const value = 'asdasd';
    const validateTest = validate(testTransformValidation());

    try {
        const validatedValue = await validateTest(value);
        t.is(validatedValue, value + value);
    } catch {
        t.fail();
    }
});

test('validate with array of functions returns the value on success', async (t) => {
    const value = 'asdasd';
    const validateTest = validate([testSuccessfulValidation()]);

    try {
        const validatedValue = await validateTest(value);
        t.is(validatedValue, value);
    } catch {
        t.fail();
    }
});

test('validate with array of functions throws array of error messages', async (t) => {
    const value = 'asdasd';
    const validateTest = validate([testFailingValidation()]);

    try {
        await validateTest(value);
        t.fail();
    } catch (ex) {
        t.deepEqual(ex, ['test failed']);
    }
});

test('validate with array of functions can throw multiple error messages', async (t) => {
    const value = 'asdasd';
    const validateTest = validate([testFailingValidation(), testFailingValidation()]);

    try {
        await validateTest(value);
        t.fail();
    } catch (ex) {
        t.deepEqual(ex, ['test failed', 'test failed']);
    }
});

test('validate with array of functions throws when one of them fails', async (t) => {
    const value = 'asdasd';
    const validateTest = validate([testSuccessfulValidation(), testFailingValidation()]);

    try {
        await validateTest(value);
        t.fail();
    } catch (ex) {
        t.deepEqual(ex, ['test failed']);
    }
});

test('validate with array of functions transforms the value on success', async (t) => {
    const value = 'asdasd';
    const validateTest = validate([testTransformValidation()]);

    try {
        const validatedValue = await validateTest(value);
        t.is(validatedValue, value + value);
    } catch {
        t.fail();
    }
});

test('validate with array of functions can transform multiple times', async (t) => {
    const value = 'asdasd';
    const validateTest = validate([testTransformValidation(), testTransformValidation()]);

    try {
        const validatedValue = await validateTest(value);
        t.is(validatedValue, value + value + value + value);
    } catch {
        t.fail();
    }
});

test('validate with object returns the value on success', async (t) => {
    const value = { key: 'asdasd', another: 'dsadas' };
    const validateTest = validate({
        key: [testSuccessfulValidation()],
        another: testSuccessfulValidation(),
    });

    try {
        const validatedValue = await validateTest(value);
        t.deepEqual(validatedValue, value);
    } catch {
        t.fail();
    }
});

test('validate with object works with nested objects', async (t) => {
    const value = { key: 'asdasd', nested: { and: 'tested' } };
    const validateTest = validate({
        key: [testSuccessfulValidation()],
        nested: {
            and: testSuccessfulValidation(),
        },
    });

    try {
        const validatedValue = await validateTest(value);
        t.deepEqual(validatedValue, value);
    } catch {
        t.fail();
    }
});

test('validate with object throws array of error messages', async (t) => {
    const value = { key: 'asdasd', another: 'dsadas' };
    const validateTest = validate({
        key: [testFailingValidation()],
        another: testFailingValidation(),
    });

    try {
        await validateTest(value);
        t.fail();
    } catch (ex) {
        t.deepEqual(ex, ['test failed', 'test failed']);
    }
});

test('validate with object throws if value is not an object', async (t) => {
    const value = 'asdasd';
    const validateTest = validate({
        key: [testSuccessfulValidation()],
        another: testSuccessfulValidation(),
    });

    try {
        await validateTest(value);
        t.fail();
    } catch (ex) {
        t.pass();
    }
});

test('validate with object strips extraneous keys', async (t) => {
    const value = { key: 'asdasd', another: 'dsadas', extraKey: 'asd' };
    const strippedValue = { key: 'asdasd', another: 'dsadas' };
    const validateTest = validate({
        key: [testSuccessfulValidation()],
        another: testSuccessfulValidation(),
    });

    try {
        const validatedValue = await validateTest(value);
        t.deepEqual(validatedValue, strippedValue);
    } catch {
        t.fail();
    }
});

test('validate should throw if validator is not an object, function or array', async (t) => {
    const value = 'asdasd';
    const validateTest = validate(
        'asdasd' as any // TypeScript is pretty cool
    );
    try {
        await validateTest(value);
        t.fail();
    } catch {
        t.pass();
    }
});
