import test from 'ava';
import { ValidatorConfiguration } from '../../../src/types';
import tryInt from '../../../src/validators/number/tryInt';

const conf: ValidatorConfiguration = {
    name: 'numField',
    original: {},
    path: [],
    parent: {},
};

test('tryInt, when integer is passed, returns the value', async (t) => {
    const validateInteger = tryInt();

    t.is(await validateInteger(-1, conf), -1);
    t.is(await validateInteger(0, conf), 0);
    t.is(await validateInteger(123, conf), 123);
    t.is(await validateInteger(1e10, conf), 1e10);

    t.pass();
});

test('tryInt, when numeric string is passed, returns the parsed value', async (t) => {
    const validateInteger = tryInt();

    t.is(await validateInteger('-1' as any, conf), -1);
    t.is(await validateInteger('0' as any, conf), 0);
    t.is(await validateInteger('123' as any, conf), 123);
});

test('tryInt, when decimal value is passed, returns the value floored to the integer part', async (t) => {
    const validateInteger = tryInt();

    t.is(await validateInteger(1.1 as any, conf), 1);
    t.is(await validateInteger('1.1' as any, conf), 1);
    t.is(await validateInteger('123.99' as any, conf), 123);
    t.is(await validateInteger('-123.99' as any, conf), -123);
});

test('tryInt, when not an integer is passed, fails', async (t) => {
    const validateInteger = tryInt();

    try {
        await validateInteger(Infinity, conf);
        t.fail("Infinity is integer doesn't fail.");
    } catch (ex) {
        t.is(ex, 'Field numField should be an integer.');
    }

    try {
        await validateInteger(-Infinity, conf);
        t.fail("Negative infinity is integer doesn't fail.");
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
