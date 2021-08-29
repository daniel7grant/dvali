import test from 'ava';
import { ValidatorConfiguration } from '../../../src/types';
import minLength from '../../../src/validators/string/minLength';

const conf: ValidatorConfiguration = {
    name: 'strField',
    original: {},
    parent: {},
    path: [],
};

test('minLength if passed words length is as at least long as the limit, returns success', async (t) => {
    const validateLength = minLength(5);

    await validateLength('smart', conf);
    await validateLength('serious', conf);
    await validateLength('attractive', conf);

    t.pass();
});

test('minLength if passed word is shorter, fails', async (t) => {
    const validateLength = minLength(5);

    try {
        await validateLength('', conf);
        t.fail("Shorter words doesn't fail.");
    } catch (ex) {
        t.is(ex, 'Field strField length should be at least 5 characters.');
    }

    try {
        await validateLength('dull', conf);
        t.fail("Shorter words doesn't fail.");
    } catch (ex) {
        t.is(ex, 'Field strField length should be at least 5 characters.');
    }
});

test('minLength if passed word is not a string, ignores', async (t) => {
    const validateLength = minLength(5);

    await validateLength(8 as any, conf);
    await validateLength(NaN as any, conf);
    await validateLength(true as any, conf);
    await validateLength([] as any, conf);
    await validateLength(Array(8).fill('a') as any, conf);
    await validateLength({} as any, conf);
    await validateLength(undefined as any, conf);
    await validateLength(null as any, conf);

    t.pass();
});
