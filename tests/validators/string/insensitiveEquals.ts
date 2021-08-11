import test from 'ava';
import insensitiveEquals from '../../../src/validators/string/insensitiveEquals';

test('insensitiveEquals validator exists', async (t) => {
    t.is(typeof insensitiveEquals, 'function');
});
