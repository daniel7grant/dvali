import test from 'ava';
import betweenLength from '../../../src/validators/string/betweenLength';

test('betweenLength validator exists', async (t) => {
    t.is(typeof betweenLength, 'function');
});
