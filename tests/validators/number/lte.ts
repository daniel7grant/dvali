import test from 'ava';
import { ValidatorConfiguration } from '../../../src/types';
import lte from '../../../src/validators/number/lte';

const conf: ValidatorConfiguration = {
    name: 'numField',
    original: {},
    path: [],
    parent: {},
};

test('lte when the number is less or equal returns success', async (t) => {
    const validateLessThanOrEqualToTen = lte(10);

    await validateLessThanOrEqualToTen(10, conf);
    await validateLessThanOrEqualToTen(0, conf);
    await validateLessThanOrEqualToTen(-5, conf);
    await validateLessThanOrEqualToTen(-Infinity, conf);
    
    t.pass();
});

test('lte when the number is lower fails', async (t) => {
    const validateLessThanOrEqualToTen = lte(10);

    try {
        await validateLessThanOrEqualToTen(100, conf);
        t.fail("Higher number doesn't fail.");
    } catch (ex) {
        t.is(ex, 'Field numField should be less than or equal to 10.');
    }
    try {
        await validateLessThanOrEqualToTen(Infinity, conf);
        t.fail("Infinity doesn't fail.");
    } catch (ex) {
        t.is(ex, 'Field numField should be less than or equal to 10.');
    }
    
    t.pass();
});

test('lte ignores non-number inputs', async (t) => {
    const validateLessThanOrEqualToTen = lte(10);

    await validateLessThanOrEqualToTen('6' as any, conf);
    await validateLessThanOrEqualToTen(NaN as any, conf);
    await validateLessThanOrEqualToTen(undefined as any, conf);
    await validateLessThanOrEqualToTen(null as any, conf);
    await validateLessThanOrEqualToTen({} as any, conf);
    
    t.pass();
});