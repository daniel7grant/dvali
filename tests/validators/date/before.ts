import test from 'ava';
import before from '../../../src/validators/date/before';

test('before validator exists', async (t) => {
    t.is(typeof before, 'function');
});
