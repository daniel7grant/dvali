import test from 'ava';
import { ValidatorConfiguration } from '../../../src/types';
import lt from '../../../src/validators/number/lt';

const conf: ValidatorConfiguration = {
    name: 'numField',
    original: {},
    path: [],
    parent: {},
};

test('lt when the number is lower returns success', async (t) => {
    const validateLessThanTen = lt(10);

    await validateLessThanTen(0, conf);
    await validateLessThanTen(-5, conf);
    await validateLessThanTen(-Infinity, conf);
    
    t.pass();
});

test('lt when the number is greater or equal fails', async (t) => {
    const validateLessThanTen = lt(10);

    try {
        await validateLessThanTen(10, conf);
        t.fail("Equal number to the limit doesn't fail.");
    } catch (ex) {
        t.is(ex, 'Field numField should be less than 10.');
    }
    try {
        await validateLessThanTen(50, conf);
        t.fail("Higher number doesn't fail.");
    } catch (ex) {
        t.is(ex, 'Field numField should be less than 10.');
    }
    try {
        await validateLessThanTen(Infinity, conf);
        t.fail("Infinity doesn't fail.");
    } catch (ex) {
        t.is(ex, 'Field numField should be less than 10.');
    }
    
    t.pass();
});

test('lt ignores non-number inputs', async (t) => {
    const validateLessThanTen = lt(10);

    await validateLessThanTen('6' as any, conf);
    await validateLessThanTen(NaN as any, conf);
    await validateLessThanTen(undefined as any, conf);
    await validateLessThanTen(null as any, conf);
    await validateLessThanTen({} as any, conf);
    
    t.pass();
});