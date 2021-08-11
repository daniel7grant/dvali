import test from 'ava';
import after from '../../../src/validators/date/after';

test('after validator exists', async (t) => {
    t.is(typeof after, 'function');
});
