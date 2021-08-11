import test from 'ava';
import maxLength from '../../../src/validators/string/maxLength';

test('maxLength validator exists', async (t) => {
    t.is(typeof maxLength, 'function');
});
