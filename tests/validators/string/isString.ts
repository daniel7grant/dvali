import test from 'ava';
import { ValidatorConfiguration } from '../../../src/types';
import isString from '../../../src/validators/string/isString';

const conf: ValidatorConfiguration = {
    name: 'strField',
    original: {},
    path: [],
    parent: {},
};

test('isString, when passed value is string returns success', async (t) => {
    const sanitizeString = isString();

    await sanitizeString('string', conf);
    await sanitizeString('0', conf);

    t.pass();
});

test('isString, when passed value is not string, fails', async (t) => {
    const sanitizeString = isString();

    try {
        await sanitizeString(123 as any, conf);
        t.fail("Integer is string doesn't fail.");
    } catch (ex) {
        t.is(ex, 'Field strField should be string.');
    }

    try {
        await sanitizeString(9.9 as any, conf);
        t.fail("Float is string doesn't fail.");
    } catch (ex) {
        t.is(ex, 'Field strField should be string.');
    }

    try {
        await sanitizeString([1, 2, 3] as any, conf);
        t.fail("Array is string doesn't fail.");
    } catch (ex) {
        t.is(ex, 'Field strField should be string.');
    }

    try {
        await sanitizeString({} as any, conf);
        t.fail("Object is string doesn't fail.");
    } catch (ex) {
        t.is(ex, 'Field strField should be string.');
    }
    
    try {
        const date = new Date('2021-08-29');
        await sanitizeString(date as any, conf);
        t.fail("Date is string doesn't fail.");
    } catch (ex) {
        t.is(ex, 'Field strField should be string.');
    }

    try {
        await sanitizeString(null as any, conf);
        t.fail("Null is string doesn't fail.");
    } catch (ex) {
        t.is(ex, 'Field strField should be string.');
    }

    try {
        await sanitizeString(undefined as any, conf);
        t.fail("Undefined is string doesn't fail.");
    } catch (ex) {
        t.is(ex, 'Field strField should be string.');
    }
});
