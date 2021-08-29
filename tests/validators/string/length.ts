import test from 'ava';
import { ValidatorConfiguration } from '../../../src/types';
import length from '../../../src/validators/string/length';

const conf: ValidatorConfiguration = {
    name: 'strField',
    original: {},
    parent: {},
    path: [],
};

test('length if passed words length is the same, returns success', async (t) => {
    const validateLength = length(5);

    await validateLength('smart', conf);
    await validateLength('young', conf);
    await validateLength('brave', conf);

    t.pass();
});

test('length if passed word is shorter or longer, fails', async (t) => {
    const validateLength = length(5);

    try {
        await validateLength('dull', conf);
        t.fail("Shorter words doesn't fail.");
    } catch (ex) {
        t.is(ex, 'Field strField length should be exactly 5 characters.');
    }

    try {
        await validateLength('supercalifragilisticexpialidocious', conf);
        t.fail("Longer words doesn't fail.");
    } catch (ex) {
        t.is(ex, 'Field strField length should be exactly 5 characters.');
    }
});

test('length if passed word is not a string, ignores', async (t) => {
    const validateLength = length(5);

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
