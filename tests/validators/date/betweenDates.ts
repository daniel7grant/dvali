import test from 'ava';
import betweenDates from '../../../src/validators/date/betweenDates';

test('betweenDates validator exists', async (t) => {
    t.is(typeof betweenDates, 'function');
});
