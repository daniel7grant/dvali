import test from 'ava';
import toDate from '../../../src/validators/date/toDate';

test('toDate validator exists', async (t) => {
    t.is(typeof toDate, 'function');
});
