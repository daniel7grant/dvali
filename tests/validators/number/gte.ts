import test from 'ava';
import { ValidatorConfiguration } from '../../../src/types';
import gte from '../../../src/validators/number/gte';

const conf: ValidatorConfiguration = {
    name: 'numField',
    original: {},
    path: [],
    parent: {},
};

test('gte when the number is greater or equal returns success', async (t) => {
    const validateGreaterThanOrEqualToTen = gte(10);

    await validateGreaterThanOrEqualToTen(10, conf);
    await validateGreaterThanOrEqualToTen(20, conf);
    await validateGreaterThanOrEqualToTen(500, conf);
    await validateGreaterThanOrEqualToTen(1000, conf);
    await validateGreaterThanOrEqualToTen(Infinity, conf);
    
    t.pass();
});

test('gte when the number is lower fails', async (t) => {
    const validateGreaterThanOrEqualToTen = gte(10);

    try {
        await validateGreaterThanOrEqualToTen(-5, conf);
        t.fail("Negative number doesn't fail.");
    } catch (ex) {
        t.is(ex, 'Field numField should be greater than or equal to 10.');
    }
    try {
        await validateGreaterThanOrEqualToTen(0, conf);
        t.fail("Zero doesn't fail.");
    } catch (ex) {
        t.is(ex, 'Field numField should be greater than or equal to 10.');
    }
    try {
        await validateGreaterThanOrEqualToTen(-Infinity, conf);
        t.fail("Negative infinity doesn't fail.");
    } catch (ex) {
        t.is(ex, 'Field numField should be greater than or equal to 10.');
    }
    
    t.pass();
});

test('gte ignores non-number inputs', async (t) => {
    const validateGreaterThanOrEqualToTen = gte(10);

    await validateGreaterThanOrEqualToTen('6' as any, conf);
    await validateGreaterThanOrEqualToTen(NaN as any, conf);
    await validateGreaterThanOrEqualToTen(undefined as any, conf);
    await validateGreaterThanOrEqualToTen(null as any, conf);
    await validateGreaterThanOrEqualToTen({} as any, conf);
    
    t.pass();
});