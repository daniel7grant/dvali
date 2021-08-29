import test from 'ava';
import { ValidatorConfiguration } from '../../../src/types';
import betweenLength from '../../../src/validators/string/betweenLength';

const conf: ValidatorConfiguration = {
    name: 'strField',
    original: {},
    parent: {},
    path: [],
};

test('betweenLength if passed words length is between its limits, returns success', async (t) => {
    const validateLength = betweenLength(5, 10);

    await validateLength('smart', conf);
    await validateLength('serious', conf);
    await validateLength('attractive', conf);

    t.pass();
});

test('betweenLength still works if the parameters are switched up', async (t) => {
    const validateLength = betweenLength(10, 5);

    await validateLength('smart', conf);
    await validateLength('serious', conf);
    await validateLength('attractive', conf);

    t.pass();
});

test('betweenLength if passed word is shorter or longer, fails', async (t) => {
    const validateLength = betweenLength(5, 10);

    try {
        await validateLength('dull', conf);
        t.fail("Shorter words doesn't fail.");
    } catch (ex) {
        t.is(ex, 'Field strField length should be between 5 and 10 characters.');
    }

    try {
        await validateLength('supercalifragilisticexpialidocious', conf);
        t.fail("Longer words doesn't fail.");
    } catch (ex) {
        t.is(ex, 'Field strField length should be between 5 and 10 characters.');
    }
});

test('betweenLength if passed word is not a string, ignores', async (t) => {
    const validateLength = betweenLength(5, 10);

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
