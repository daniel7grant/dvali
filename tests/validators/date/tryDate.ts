import test from 'ava';
import tryDate from '../../../src/validators/date/tryDate';

test('tryDate validator exists', async (t) => {
    t.is(typeof tryDate, 'function');
});
