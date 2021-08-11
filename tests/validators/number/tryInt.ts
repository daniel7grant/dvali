import test from 'ava';
import tryInt from '../../../src/validators/number/tryInt';

test('tryInt validator exists', async (t) => {
    t.is(typeof tryInt, 'function');
});
