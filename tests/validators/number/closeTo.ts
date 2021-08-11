import test from 'ava';
import closeTo from '../../../src/validators/number/closeTo';

test('closeTo validator exists', async (t) => {
    t.is(typeof closeTo, 'function');
});
