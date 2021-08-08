import test from 'ava';
import { ValidatorConfiguration } from '../../src/dvali';
import validateCondition from '../../src/validators/validateCondition';

const conf: ValidatorConfiguration = { name: 'object', original: {}, parent: {}, path: [] };

test('validateCondition function returns undefined if regex applies', async (t) => {
    const validateTest = validateCondition(() => true);
    try {
        const validated = await validateTest("", conf);
        t.is(typeof validated, 'undefined');
    } catch (ex) {
        t.fail();
    }
});

test('validateCondition function throws error if regex fails', async (t) => {
    const validateTest = validateCondition(() => false);
    try {
        await validateTest("", conf);
        t.fail();
    } catch (ex) {
        t.pass();
    }
});
