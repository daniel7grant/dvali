import test from 'ava';
import toInt from '../../../src/validators/number/toInt';

test('toInt validator exists', async (t) => {
    t.is(typeof toInt, 'function');
});
