import test from 'ava';
import tryFloat from '../../../src/validators/number/tryFloat';

test('tryFloat validator exists', async (t) => {
    t.is(typeof tryFloat, 'function');
});
