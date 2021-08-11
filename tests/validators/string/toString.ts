import test from 'ava';
import toString from '../../../src/validators/string/toString';

test('toString validator exists', async (t) => {
    t.is(typeof toString, 'function');
});
