import test from 'ava';
import { ValidatorConfiguration } from '../../../src/types';
import isInt from '../../../src/validators/number/isInt';

const conf: ValidatorConfiguration = {
    name: 'numField',
    original: {},
    path: [],
    parent: {},
};

test('isInt, when integer is passed, returns success', async (t) => {
    const validateInteger = isInt();

    await validateInteger(-1, conf);
    await validateInteger(0, conf);
    await validateInteger(123, conf);
    await validateInteger(1e10, conf);

    t.pass();
});

test('isInt, when not an integer is passed, fails', async (t) => {
    const validateInteger = isInt();

    try {
        await validateInteger(Infinity as any, conf);
        t.fail("Infinity is integer doesn't fail.");
    } catch (ex) {
        t.is(ex, 'Field numField should be an integer.');
    }

    try {
        await validateInteger(-Infinity as any, conf);
        t.fail("Negative infinity is integer doesn't fail.");
    } catch (ex) {
        t.is(ex, 'Field numField should be an integer.');
    }

    try {
        await validateInteger(66.6 as any, conf);
        t.fail("Decimal is integer doesn't fail.");
    } catch (ex) {
        t.is(ex, 'Field numField should be an integer.');
    }

    try {
        await validateInteger('66' as any, conf);
        t.fail("String is integer doesn't fail.");
    } catch (ex) {
        t.is(ex, 'Field numField should be an integer.');
    }

    try {
        await validateInteger(NaN as any, conf);
        t.fail("NaN is integer doesn't fail.");
    } catch (ex) {
        t.is(ex, 'Field numField should be an integer.');
    }

    try {
        await validateInteger([] as any, conf);
        t.fail("Array is integer doesn't fail.");
    } catch (ex) {
        t.is(ex, 'Field numField should be an integer.');
    }

    try {
        await validateInteger({} as any, conf);
        t.fail("Object is integer doesn't fail.");
    } catch (ex) {
        t.is(ex, 'Field numField should be an integer.');
    }

    try {
        await validateInteger(null as any, conf);
        t.fail("Null is integer doesn't fail.");
    } catch (ex) {
        t.is(ex, 'Field numField should be an integer.');
    }
});
