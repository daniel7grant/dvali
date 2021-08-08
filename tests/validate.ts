import test from 'ava';
import { validate } from '../src/dvali';

test('validate to be a function', async (t) => {
    t.deepEqual(typeof validate, 'function');
});
