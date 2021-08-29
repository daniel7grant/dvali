import test from 'ava';
import { ValidatorConfiguration } from '../../../src/types';
import maxLength from '../../../src/validators/string/maxLength';

const conf: ValidatorConfiguration = {
    name: 'strField',
    original: {},
    parent: {},
    path: [],
};

test('maxLength if passed words length is between its limits, returns success', async (t) => {
    const validateLength = maxLength(10);

    await validateLength('smart', conf);
    await validateLength('serious', conf);
    await validateLength('attractive', conf);

    t.pass();
});


test('maxLength if passed word is longer, fails', async (t) => {
    const validateLength = maxLength(10);

    try {
        await validateLength('professional', conf);
        t.fail("Longer words doesn't fail.");
    } catch (ex) {
        t.is(ex, 'Field strField length should be at most 10 characters.');
    }

    try {
        await validateLength('supercalifragilisticexpialidocious', conf);
        t.fail("Longer words doesn't fail.");
    } catch (ex) {
        t.is(ex, 'Field strField length should be at most 10 characters.');
    }
});

test('maxLength if passed word is not a string, ignores', async (t) => {
    const validateLength = maxLength(10);

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
