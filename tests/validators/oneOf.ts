import test from 'ava';
import { ValidatorConfiguration } from '../../src/types';
import oneOf from '../../src/validators/oneOf';

const conf: ValidatorConfiguration = {
    name: 'strField',
    original: {},
    path: [],
    parent: {},
};

test('oneOf validator if the value is one of the list, returns successfully', async (t) => {
    const validateStringEquality = oneOf(['one', 'two', 'three']);
    await validateStringEquality('one', conf);
    await validateStringEquality('two', conf);
    await validateStringEquality('three', conf);

    const validateNumberEquality = oneOf([100, 101, 102]);
    await validateNumberEquality(100, conf);
    await validateNumberEquality(101, conf);
    await validateNumberEquality(102, conf);

    const validateBoolEquality = oneOf([true, false]);
    await validateBoolEquality(true, conf);
    await validateBoolEquality(false, conf);

    const obj = {};
    const validateObjectEquality = oneOf([obj]);
    await validateObjectEquality(obj, conf);

    const validateNullEquality = oneOf([null, undefined]);
    await validateNullEquality(null, conf);
    await validateNullEquality(undefined, conf);

    t.pass();
});

test('oneOf validator if the value is not in the list, fails', async (t) => {
    try {
        const validateStringEquality = oneOf(['one', 'two', 'three']);
        await validateStringEquality('four', conf);
        t.fail("Not equal strings doesn't fail.");
    } catch (ex) {
        t.is(ex, 'Field strField should be one of one, two, three.');
    }

    try {
        const validateStringEquality = oneOf(['one', 'two', 'three']);
        await validateStringEquality('ONE', conf);
        t.fail("Differently cased strings doesn't fail.");
    } catch (ex) {
        t.is(ex, 'Field strField should be one of one, two, three.');
    }

    try {
        const validateStringEquality = oneOf(['one', 'two', 'three']);
        await validateStringEquality('', conf);
        t.fail("Empty strings doesn't fail.");
    } catch (ex) {
        t.is(ex, 'Field strField should be one of one, two, three.');
    }

    try {
        const validateNumberEquality = oneOf([100, 101, 102]);
        await validateNumberEquality(99, conf);
        t.fail("Not equal numbers doesn't fail.");
    } catch (ex) {
        t.is(ex, 'Field strField should be one of 100, 101, 102.');
    }

    try {
        const validateNumberEquality = oneOf([0.1, 0.2, 0.3]);
        await validateNumberEquality(0.1 + 0.2, conf);
        t.fail("Floating point error doesn't fail.");
    } catch (ex) {
        t.is(ex, 'Field strField should be one of 0.1, 0.2, 0.3.');
    }

    try {
        const validateBoolEquality = oneOf([true]);
        await validateBoolEquality(false, conf);
        t.fail("Not equal booleans doesn't fail.");
    } catch (ex) {
        t.is(ex, 'Field strField should be one of true.');
    }

    try {
        const validateNaNEquality = oneOf([NaN]);
        await validateNaNEquality(NaN, conf);
        t.fail("NaN equality doesn't fail.");
    } catch (ex) {
        t.is(ex, 'Field strField should be one of NaN.');
    }

    try {
        const validateObjectEquality = oneOf([{}]);
        await validateObjectEquality({}, conf);
        t.fail("Object equality doesn't fail.");
    } catch (ex) {
        t.is(ex, 'Field strField should be one of [object Object].');
    }
});
