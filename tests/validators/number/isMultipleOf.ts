import test from 'ava';
import { ValidatorConfiguration } from '../../../src/types';
import isMultipleOf from '../../../src/validators/number/isMultipleOf';

const conf: ValidatorConfiguration = {
    name: 'numField',
    original: {},
    path: [],
    parent: {},
};

test('isMultipleOf when the number is multiple of the given param returns success', async (t) => {
    const validateMultipleOfFive = isMultipleOf(5);

    await validateMultipleOfFive(10, conf);
    await validateMultipleOfFive(0, conf);
    await validateMultipleOfFive(-5, conf);
    
    t.pass();
});

test('isMultipleOf when the number is not the multiple of the given param fails', async (t) => {
    const validateMultipleOfFive = isMultipleOf(5);

    try {
        await validateMultipleOfFive(69, conf);
        t.fail("Non-multiple number doesn't fail.");
    } catch (ex) {
        t.is(ex, 'Field numField should be the multiple of 5.');
    }
    try {
        await validateMultipleOfFive(10.5, conf);
        t.fail("Non-multiple float doesn't fail.");
    } catch (ex) {
        t.is(ex, 'Field numField should be the multiple of 5.');
    }
    try {
        await validateMultipleOfFive(10.00000000001, conf);
        t.fail("Floating point difference number doesn't fail.");
    } catch (ex) {
        t.is(ex, 'Field numField should be the multiple of 5.');
    }
    try {
        await validateMultipleOfFive(Infinity, conf);
        t.fail("Infinity doesn't fail.");
    } catch (ex) {
        t.is(ex, 'Field numField should be the multiple of 5.');
    }
    
    t.pass();
});

test('isMultipleOf ignores non-number inputs', async (t) => {
    const validateMultipleOfFive = isMultipleOf(5);

    await validateMultipleOfFive('10' as any, conf);
    await validateMultipleOfFive(NaN as any, conf);
    await validateMultipleOfFive(undefined as any, conf);
    await validateMultipleOfFive(null as any, conf);
    await validateMultipleOfFive({} as any, conf);
    
    t.pass();
});