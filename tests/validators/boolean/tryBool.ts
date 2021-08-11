import test from 'ava';
import tryBool from '../../../src/validators/boolean/tryBool';

test('tryBool validator exists', async (t) => {
    t.is(typeof tryBool, 'function');
});
