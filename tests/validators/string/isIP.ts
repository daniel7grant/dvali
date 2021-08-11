import test from 'ava';
import isIP from '../../../src/validators/string/isIP';

test('isIP validator exists', async (t) => {
    t.is(typeof isIP, 'function');
});
