import test from 'ava';
import isBool from '../../../src/validators/boolean/isBool';

test('isBool validator exists', async (t) => {
    t.is(typeof isBool, 'function');
});
