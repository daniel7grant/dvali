import test from 'ava';
import equals from '../../src/validators/equals';

test('equals validator exists', async (t) => {
    t.is(typeof equals, 'function');
});
