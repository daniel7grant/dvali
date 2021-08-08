import test from 'ava';
import { ValidatorConfiguration } from '../../src/dvali';
import validateRegex from '../../src/validators/validateRegex';

const conf: ValidatorConfiguration = { name: 'object', original: {}, parent: {}, path: [] };

test('validateRegex function returns undefined if regex applies', async (t) => {
    const validateTest = validateRegex(/[a-z].*/);
    try {
        const validated = await validateTest('asdasd', conf);
        t.is(typeof validated, 'undefined');
    } catch (ex) {
        t.fail();
    }
});

test('validateRegex function throws error if regex fails', async (t) => {
    const validateTest = validateRegex(/[a-z].*/);
    try {
        await validateTest('123', conf);
        t.fail();
    } catch (ex) {
        t.pass();
    }
});

test('validateRegex function ignores if passed value is not a string', async (t) => {
    const validateTest = validateRegex(/[a-z].*/);
    try {
        const validated = await validateTest(123 as any, conf);
        t.is(typeof validated, 'undefined');
    } catch (ex) {
        t.fail();
    }
});
