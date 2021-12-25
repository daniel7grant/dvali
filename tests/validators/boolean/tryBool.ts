import test from 'ava';
import { ValidatorConfiguration } from '../../../src/types';
import tryBool from '../../../src/validators/boolean/tryBool';

const conf: ValidatorConfiguration = {
    name: 'boolField',
    original: {},
    parent: {},
    path: [],
};

test('tryBool with with true, false, one and zero returns the correct value', async (t) => {
    const sanitizeBool = tryBool();

    t.is(await sanitizeBool(true, conf), true);
    t.is(await sanitizeBool(false, conf), false);
    t.is(await sanitizeBool(1 as any, conf), true);
    t.is(await sanitizeBool(0 as any, conf), false);

    t.pass();
});

test('tryBool with other things fails', async (t) => {
    const sanitizeBool = tryBool();

    try {
        await sanitizeBool('' as any, conf);
        t.fail("Converting empty string to boolean didn't fail.");
    } catch (ex) {
        t.is('Field boolField cannot be converted to boolean.', ex as any);
    }

    try {
        await sanitizeBool('asd' as any, conf);
        t.fail("Converting string to boolean didn't fail.");
    } catch (ex) {
        t.is('Field boolField cannot be converted to boolean.', ex as any);
    }

    try {
        await sanitizeBool({} as any, conf);
        t.fail("Converting object to boolean didn't fail.");
    } catch (ex) {
        t.is('Field boolField cannot be converted to boolean.', ex as any);
    }

    try {
        await sanitizeBool([] as any, conf);
        t.fail("Converting array to boolean didn't fail.");
    } catch (ex) {
        t.is('Field boolField cannot be converted to boolean.', ex as any);
    }

    try {
        await sanitizeBool(undefined as any, conf);
        t.fail("Converting undefined to boolean didn't fail.");
    } catch (ex) {
        t.is('Field boolField cannot be converted to boolean.', ex as any);
    }

    try {
        await sanitizeBool(null as any, conf);
        t.fail("Converting null to boolean didn't fail.");
    } catch (ex) {
        t.is('Field boolField cannot be converted to boolean.', ex as any);
    }

    t.pass();
});

test('tryBool can be customized to accept other truthy or falsey values', async (t) => {
    const sanitizeBool = tryBool([true, 1, 'true', 600], [true, 1, 'false', null]);

    t.is(await sanitizeBool('true' as any, conf), true);
    t.is(await sanitizeBool('false' as any, conf), false);
    t.is(await sanitizeBool(600 as any, conf), true);
    t.is(await sanitizeBool(null as any, conf), false);    

    t.pass();
});
