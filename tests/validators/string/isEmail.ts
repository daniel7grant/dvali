import test from 'ava';
import isString from '../../../src/validators/string/isString';

test('isString validator exists', async (t) => {
    t.is(typeof isString, 'function');
});
