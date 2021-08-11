import test from 'ava';
import minLength from '../../../src/validators/string/minLength';

test('minLength validator exists', async (t) => {
    t.is(typeof minLength, 'function');
});
