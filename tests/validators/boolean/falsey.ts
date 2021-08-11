import test from 'ava';
import falsey from '../../../src/validators/boolean/falsey';

test('falsey validator exists', async (t) => {
    t.is(typeof falsey, 'function');
});
