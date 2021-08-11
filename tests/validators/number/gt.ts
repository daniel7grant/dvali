import test from 'ava';
import gt from '../../../src/validators/number/gt';

test('gt validator exists', async (t) => {
    t.is(typeof gt, 'function');
});
