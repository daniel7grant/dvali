import test from 'ava';
import { ValidatorConfiguration } from '../../src/types';
import equals from '../../src/validators/equals';

const conf: ValidatorConfiguration = {
    name: 'strField',
    original: {},
    path: [],
    parent: {},
};

test('equals validator if the value is equals to the param, returns successfully', async (t) => {
    const validateStringEquality = equals('asdasd');
    await validateStringEquality('asdasd', conf);

    const validateNumberEquality = equals(100);
    await validateNumberEquality(100, conf);

    const validateBoolEquality = equals(true);
    await validateBoolEquality(true, conf);

    const obj = {};
    const validateObjectEquality = equals(obj);
    await validateObjectEquality(obj, conf);

    const validateNullEquality = equals(null);
    await validateNullEquality(null, conf);

    const validateUndefinedEquality = equals(undefined);
    await validateUndefinedEquality(undefined, conf);

    t.pass();
});

test('equals validator if the value is not equals, fails', async (t) => {
    try {
        const validateStringEquality = equals('asdasd');
        await validateStringEquality('dsadsa', conf);
        t.fail("Not equal strings doesn't fail.");
    } catch (ex) {
        t.is(ex, 'Field strField should be equal to asdasd.');
    }

    try {
        const validateStringEquality = equals('asdasd');
        await validateStringEquality('ASDASD', conf);
        t.fail("Differently cased strings doesn't fail.");
    } catch (ex) {
        t.is(ex, 'Field strField should be equal to asdasd.');
    }

    try {
        const validateNumberEquality = equals(100);
        await validateNumberEquality(101, conf);
        t.fail("Not equal numbers doesn't fail.");
    } catch (ex) {
        t.is(ex, 'Field strField should be equal to 100.');
    }

    try {
        const validateNumberEquality = equals(0.3);
        await validateNumberEquality(0.1 + 0.2, conf);
        t.fail("Floating point error doesn't fail.");
    } catch (ex) {
        t.is(ex, 'Field strField should be equal to 0.3.');
    }

    try {
        const validateBoolEquality = equals(true);
        await validateBoolEquality(false, conf);
        t.fail("Not equal booleans doesn't fail.");
    } catch (ex) {
        t.is(ex, 'Field strField should be equal to true.');
    }

    try {
        const validateNaNEquality = equals(NaN);
        await validateNaNEquality(NaN, conf);
        t.fail("NaN equality doesn't fail.");
    } catch (ex) {
        t.is(ex, 'Field strField should be equal to NaN.');
    }

    try {
        const validateObjectEquality = equals({});
        await validateObjectEquality({}, conf);
        t.fail("Object equality doesn't fail.");
    } catch (ex) {
        t.is(ex, 'Field strField should be equal to [object Object].');
    }
});
