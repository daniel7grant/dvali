import test from 'ava';
import { ValidatorConfiguration } from '../../../src/types';
import closeTo from '../../../src/validators/number/closeTo';

const conf: ValidatorConfiguration = {
    name: 'numField',
    original: {},
    path: [],
    parent: {},
};

test('closeTo when the two values are closer than an epsilon, returns the exact value', async (t) => {
    const validateCloseTo = closeTo(0.3);

    t.is(await validateCloseTo(0.3, conf), 0.3);
    t.is(await validateCloseTo(0.3 + 1e-16, conf), 0.3);
    t.is(await validateCloseTo(0.2 + 0.1, conf), 0.3);
});

test('closeTo when the two values are farther than an epsilon, fails', async (t) => {
    const validateCloseTo = closeTo(0.3);

    try {
        await validateCloseTo(0.4, conf);
    } catch (ex) {
        t.is(ex, 'Field numField should be approximately 0.3.');
    }

    try {
        await validateCloseTo(0.31, conf);
    } catch (ex) {
        t.is(ex, 'Field numField should be approximately 0.3.');
    }

    try {
        await validateCloseTo(0.3 + 1e-10, conf);
    } catch (ex) {
        t.is(ex, 'Field numField should be approximately 0.3.');
    }

    try {
        await validateCloseTo(Infinity, conf);
    } catch (ex) {
        t.is(ex, 'Field numField should be approximately 0.3.');
    }
});

test('closeTo when can configure the epsilon', async (t) => {
    const validateCloseTo = closeTo(0.3, 0.001);

    t.is(await validateCloseTo(0.3, conf), 0.3);
    t.is(await validateCloseTo(0.3 + 1e-10, conf), 0.3);
    t.is(await validateCloseTo(0.2 + 0.1, conf), 0.3);
    t.is(await validateCloseTo(0.3 - 0.0001, conf), 0.3);

    try {
        await validateCloseTo(0.4, conf);
    } catch (ex) {
        t.is(ex, 'Field numField should be approximately 0.3.');
    }
});

test('closeTo when the passed value is not a number, ignores', async (t) => {
    const validateCloseTo = closeTo(0.3);

    await validateCloseTo('string' as any, conf);
    await validateCloseTo(null as any, conf);
    await validateCloseTo({} as any, conf);

    t.pass();
});
