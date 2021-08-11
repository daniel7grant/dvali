import test from 'ava';
import isDate from '../../../src/validators/date/isDate';

test('isDate validator exists', async (t) => {
    t.is(typeof isDate, 'function');
});
