import test from 'ava';
import { ValidatorConfiguration } from '../../../src/types';
import tryNumber from '../../../src/validators/number/tryNumber';

const conf: ValidatorConfiguration = {
    name: 'numField',
    original: {},
    path: [],
    parent: {},
};

test('tryNumber, when number is passed, returns the value', async (t) => {
    const validateNumber = tryNumber();

    await validateNumber(-1, conf);
    await validateNumber(0, conf);
    await validateNumber(123, conf);
    await validateNumber(1e10, conf);
    await validateNumber(123.45, conf);
    await validateNumber(1 / 10, conf);
    await validateNumber(Infinity, conf);
    await validateNumber(-Infinity, conf);

    t.pass();
});

test('tryNumber, when numeric string is passed, returns the parsed value', async (t) => {
    const validateNumber = tryNumber();

    t.is(await validateNumber('-1' as any, conf), -1);
    t.is(await validateNumber('0' as any, conf), 0);
    t.is(await validateNumber('123' as any, conf), 123);
    t.is(await validateNumber('1e10' as any, conf), 1e10);
    t.is(await validateNumber('123.45' as any, conf), 123.45);
});

test('tryNumber, when not a number is passed, fails', async (t) => {
    const validateNumber = tryNumber();

    try {
        await validateNumber(NaN as any, conf);
        t.fail("NaN is number doesn't fail.");
    } catch (ex) {
        t.is(ex, 'Field numField should be numeric.');
    }

    try {
        await validateNumber([] as any, conf);
        t.fail("Array is number doesn't fail.");
    } catch (ex) {
        t.is(ex, 'Field numField should be numeric.');
    }

    try {
        await validateNumber({} as any, conf);
        t.fail("Object is number doesn't fail.");
    } catch (ex) {
        t.is(ex, 'Field numField should be numeric.');
    }

    try {
        await validateNumber(null as any, conf);
        t.fail("Null is number doesn't fail.");
    } catch (ex) {
        t.is(ex, 'Field numField should be numeric.');
    }
});
