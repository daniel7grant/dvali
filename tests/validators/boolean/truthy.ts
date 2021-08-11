import test from 'ava';
import truthy from '../../../src/validators/boolean/truthy';

test('truthy validator exists', async (t) => {
    t.is(typeof truthy, 'function');
});
