import test from 'ava';
import isEmail from '../../../src/validators/string/isEmail';

test('isEmail validator exists', async (t) => {
    t.is(typeof isEmail, 'function');
});
