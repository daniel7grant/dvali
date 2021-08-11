import test from 'ava';
import isNumber from '../../../src/validators/number/isNumber';

test('isNumber validator exists', async (t) => {
    t.is(typeof isNumber, 'function');
});
