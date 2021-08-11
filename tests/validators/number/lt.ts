import test from 'ava';
import lt from '../../../src/validators/number/lt';

test('lt validator exists', async (t) => {
    t.is(typeof lt, 'function');
});
