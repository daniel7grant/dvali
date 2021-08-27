import test from 'ava';
import { ValidatorConfiguration } from '../../../src/types';
import between from '../../../src/validators/number/between';

const conf: ValidatorConfiguration = {
    name: 'numField',
    original: {},
    path: [],
    parent: {},
};

test('between, when the number is between the two values, return success', async (t) => {
    const validateBetween = between(1, 10);

    await validateBetween(2, conf);
    await validateBetween(5, conf);
    await validateBetween(8, conf);
    
    t.pass();
});

test('between, when the number is not between or equal the two values, throws', async (t) => {
    const validateBetween = between(1, 10);

    try {
        await validateBetween(-1, conf);
        t.fail("Number not below the limits doesn't fail.");
    } catch (ex) {
        t.is(ex, 'Field numField should be between 1 and 10.');
    }

    try {
        await validateBetween(100, conf);
        t.fail("Number not above the limits doesn't fail.");
    } catch (ex) {
        t.is(ex, 'Field numField should be between 1 and 10.');
    }

    try {
        await validateBetween(Infinity, conf);
        t.fail("Infinity doesn't fail.");
    } catch (ex) {
        t.is(ex, 'Field numField should be between 1 and 10.');
    }

    try {
        await validateBetween(-Infinity, conf);
        t.fail("Negative infinity doesn't fail.");
    } catch (ex) {
        t.is(ex, 'Field numField should be between 1 and 10.');
    }

    try {
        await validateBetween(1, conf);
        t.fail("Lower limit doesn't fail.");
    } catch (ex) {
        t.is(ex, 'Field numField should be between 1 and 10.');
    }

    try {
        await validateBetween(10, conf);
        t.fail("Upper limit doesn't fail.");
    } catch (ex) {
        t.is(ex, 'Field numField should be between 1 and 10.');
    }
});

test('between, when min inclusive is set, returns success for min and failure for max', async (t) => {
    const validateBetween = between(1, 10, { minInclusive: true });

    await validateBetween(1, conf);

    try {
        await validateBetween(10, conf);
        t.fail("Upper limit doesn't fail.");
    } catch (ex) {
        t.is(ex, 'Field numField should be between 1 and 10.');
    }

    t.pass();
});

test('between, when max inclusive is set, returns failure for min and success for max', async (t) => {
    const validateBetween = between(1, 10, { maxInclusive: true });

    await validateBetween(10, conf);

    try {
        await validateBetween(1, conf);
        t.fail("Lower limit doesn't fail.");
    } catch (ex) {
        t.is(ex, 'Field numField should be between 1 and 10.');
    }

    t.pass();
});

test('between, when both inclusive is set, returns success for both limits', async (t) => {
    const validateBetween = between(1, 10, { minInclusive: true, maxInclusive: true });

    await validateBetween(1, conf);
    await validateBetween(10, conf);

    t.pass();
});

test('between ignores non-number inputs', async (t) => {
    const validateBetween = between(1, 10);

    await validateBetween('6' as any, conf);
    await validateBetween(NaN as any, conf);
    await validateBetween(undefined as any, conf);
    await validateBetween(null as any, conf);
    await validateBetween({} as any, conf);
    
    t.pass();
});
