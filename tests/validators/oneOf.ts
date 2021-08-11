import test from 'ava';
import oneOf from '../../src/validators/oneOf';

test('oneOf validator exists', async (t) => {
    t.is(typeof oneOf, 'function');
});
