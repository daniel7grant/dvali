import test from 'ava';
import { ValidatorConfiguration } from '../../../src/types';
import isBool from '../../../src/validators/boolean/isBool';

const conf: ValidatorConfiguration = {
    name: 'boolField',
    original: {},
    parent: {},
    path: [],
};

test('isBool with true or false returns success', async (t) => {
    const validateBool = isBool();

    await validateBool(true, conf);
    await validateBool(false, conf);
    t.pass();
});

test('isBool with anything other fails', async (t) => {
    const validateBool = isBool();

    try {
        await validateBool('string' as any, conf);
        t.fail("Validating string didn't fail.");
    } catch (ex) {
        t.is('Field boolField should be a boolean.', ex as any);
    }

    try {
        await validateBool(123 as any, conf);
        t.fail("Validating number didn't fail.");
    } catch (ex) {
        t.is('Field boolField should be a boolean.', ex as any);
    }

    try {
        await validateBool(null as any, conf);
        t.fail("Validating null didn't fail.");
    } catch (ex) {
        t.is('Field boolField should be a boolean.', ex as any);
    }

    try {
        await validateBool(undefined as any, conf);
        t.fail("Validating null didn't fail.");
    } catch (ex) {
        t.is('Field boolField should be a boolean.', ex as any);
    }

    try {
        await validateBool(NaN as any, conf);
        t.fail("Validating NaN didn't fail.");
    } catch (ex) {
        t.is('Field boolField should be a boolean.', ex as any);
    }

    t.pass();
});
