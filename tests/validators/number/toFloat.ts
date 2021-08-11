import test from 'ava';
import toFloat from '../../../src/validators/number/toFloat';

test('toFloat validator exists', async (t) => {
    t.is(typeof toFloat, 'function');
});
