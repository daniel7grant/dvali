import test from 'ava';
import gte from '../../../src/validators/number/gte';

test('gte validator exists', async (t) => {
    t.is(typeof gte, 'function');
});
