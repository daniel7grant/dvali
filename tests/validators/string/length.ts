import test from 'ava';
import length from '../../../src/validators/string/length';

test('length validator exists', async (t) => {
    t.is(typeof length, 'function');
});
