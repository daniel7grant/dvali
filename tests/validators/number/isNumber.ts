import test from 'ava';
import { ValidatorConfiguration } from '../../../src/types';
import isNumber from '../../../src/validators/number/isNumber';

const conf: ValidatorConfiguration = {
    name: 'numField',
    original: {},
    path: [],
    parent: {},
};

test('isNumber, when number is passed, returns success', async (t) => {
    const validateNumber = isNumber();

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

test('isNumber, when not a number is passed, fails', async (t) => {
    const validateNumber = isNumber();

    try {
        await validateNumber('66' as any, conf);
        t.fail("String is number doesn't fail.");
    } catch (ex) {
        t.is(ex, 'Field numField should be a number.');
    }

    try {
        await validateNumber(NaN as any, conf);
        t.fail("NaN is number doesn't fail.");
    } catch (ex) {
        t.is(ex, 'Field numField should be a number.');
    }

    try {
        await validateNumber([] as any, conf);
        t.fail("Array is number doesn't fail.");
    } catch (ex) {
        t.is(ex, 'Field numField should be a number.');
    }

    try {
        await validateNumber({} as any, conf);
        t.fail("Object is number doesn't fail.");
    } catch (ex) {
        t.is(ex, 'Field numField should be a number.');
    }

    try {
        await validateNumber(null as any, conf);
        t.fail("Null is number doesn't fail.");
    } catch (ex) {
        t.is(ex, 'Field numField should be a number.');
    }
});
