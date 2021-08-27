import test from 'ava';
import { ValidatorConfiguration } from '../../../src/types';
import gt from '../../../src/validators/number/gt';

const conf: ValidatorConfiguration = {
    name: 'numField',
    original: {},
    path: [],
    parent: {},
};

test('gt when the number is greater returns success', async (t) => {
    const validateGreaterThanTen = gt(10);

    await validateGreaterThanTen(20, conf);
    await validateGreaterThanTen(500, conf);
    await validateGreaterThanTen(1000, conf);
    await validateGreaterThanTen(Infinity, conf);
    
    t.pass();
});

test('gt when the number is lower or equal fails', async (t) => {
    const validateGreaterThanTen = gt(10);

    try {
        await validateGreaterThanTen(10, conf);
        t.fail("Equal number to the limit doesn't fail.");
    } catch (ex) {
        t.is(ex, 'Field numField should be greater than 10.');
    }
    try {
        await validateGreaterThanTen(-5, conf);
        t.fail("Negative number doesn't fail.");
    } catch (ex) {
        t.is(ex, 'Field numField should be greater than 10.');
    }
    try {
        await validateGreaterThanTen(0, conf);
        t.fail("Zero doesn't fail.");
    } catch (ex) {
        t.is(ex, 'Field numField should be greater than 10.');
    }
    try {
        await validateGreaterThanTen(-Infinity, conf);
        t.fail("Negative infinity doesn't fail.");
    } catch (ex) {
        t.is(ex, 'Field numField should be greater than 10.');
    }
    
    t.pass();
});

test('gt ignores non-number inputs', async (t) => {
    const validateGreaterThanTen = gt(10);

    await validateGreaterThanTen('6' as any, conf);
    await validateGreaterThanTen(NaN as any, conf);
    await validateGreaterThanTen(undefined as any, conf);
    await validateGreaterThanTen(null as any, conf);
    await validateGreaterThanTen({} as any, conf);
    
    t.pass();
});
