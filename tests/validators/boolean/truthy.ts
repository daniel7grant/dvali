import test from 'ava';
import { ValidatorConfiguration } from '../../../src/types';
import truthy from '../../../src/validators/boolean/truthy';

const conf: ValidatorConfiguration = {
    name: 'boolField',
    original: {},
    parent: {},
    path: [],
};

test('truthy with other values returns success', async (t) => {
    const validateTruthy = truthy();

    await validateTruthy(true, conf);
    await validateTruthy(1 as any, conf);
    await validateTruthy(-1 as any, conf);
    await validateTruthy('string' as any, conf);
    await validateTruthy({} as any, conf);
    await validateTruthy([] as any, conf);

    t.pass();
});

test('truthy with false, zero, empty string or nullish other fails', async (t) => {
    const validateTruthy = truthy();

    try {
        await validateTruthy(false, conf);
        t.fail("False is truthy didn't fail.");
    } catch (ex) {
        t.is('Field boolField should be truthy.', ex);
    }

    try {
        await validateTruthy(0 as any, conf);
        t.fail("Zero is truthy didn't fail.");
    } catch (ex) {
        t.is('Field boolField should be truthy.', ex);
    }

    try {
        await validateTruthy(-0 as any, conf);
        t.fail("Negative zero is truthy didn't fail.");
    } catch (ex) {
        t.is('Field boolField should be truthy.', ex);
    }

    try {
        await validateTruthy('' as any, conf);
        t.fail("Empty string is truthy didn't fail.");
    } catch (ex) {
        t.is('Field boolField should be truthy.', ex);
    }

    try {
        await validateTruthy(null as any, conf);
        t.fail("Null is truthy didn't fail.");
    } catch (ex) {
        t.is('Field boolField should be truthy.', ex);
    }

    try {
        await validateTruthy(undefined as any, conf);
        t.fail("Undefined is truthy didn't fail.");
    } catch (ex) {
        t.is('Field boolField should be truthy.', ex);
    }

    try {
        await validateTruthy(NaN as any, conf);
        t.fail("NaN is truthy didn't fail.");
    } catch (ex) {
        t.is('Field boolField should be truthy.', ex);
    }

    t.pass();
});
