import test from 'ava';
import { ValidatorConfiguration } from '../../../src/types';
import falsey from '../../../src/validators/boolean/falsey';

const conf: ValidatorConfiguration = {
    name: 'boolField',
    original: {},
    parent: {},
    path: [],
};

test('falsey with false, zero, empty string or nullish returns success', async (t) => {
    const validateFalsey = falsey();

    await validateFalsey(false, conf);
    await validateFalsey(0 as any, conf);
    await validateFalsey(-0 as any, conf);
    await validateFalsey('' as any, conf);
    await validateFalsey(null as any, conf);
    await validateFalsey(undefined as any, conf);
    await validateFalsey(NaN as any, conf);

    t.pass();
});

test('falsey with anything other fails', async (t) => {
    const validateFalsey = falsey();

    try {
        await validateFalsey(true as any, conf);
        t.fail("True is falsey didn't fail.");
    } catch (ex) {
        t.is('Field boolField should be falsey.', ex as any);
    }

    try {
        await validateFalsey(-1 as any, conf);
        t.fail("Number is falsey didn't fail.");
    } catch (ex) {
        t.is('Field boolField should be falsey.', ex as any);
    }

    try {
        await validateFalsey("string" as any, conf);
        t.fail("String is falsey didn't fail.");
    } catch (ex) {
        t.is('Field boolField should be falsey.', ex as any);
    }

    try {
        await validateFalsey({} as any, conf);
        t.fail("Object is falsey didn't fail.");
    } catch (ex) {
        t.is('Field boolField should be falsey.', ex as any);
    }

    try {
        await validateFalsey([] as any, conf);
        t.fail("Array is falsey didn't fail.");
    } catch (ex) {
        t.is('Field boolField should be falsey.', ex as any);
    }

    try {
        await validateFalsey((() => {}) as any, conf);
        t.fail("Function is falsey didn't fail.");
    } catch (ex) {
        t.is('Field boolField should be falsey.', ex as any);
    }

    t.pass();
});
