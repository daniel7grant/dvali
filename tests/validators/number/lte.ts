import test from 'ava';
import lte from '../../../src/validators/number/lte';

test('lte validator exists', async (t) => {
    t.is(typeof lte, 'function');
});
