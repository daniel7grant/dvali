import test from 'ava';
import between from '../../../src/validators/number/between';

test('between validator exists', async (t) => {
    t.is(typeof between, 'function');
});
