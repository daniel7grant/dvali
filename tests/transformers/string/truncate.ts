import test from 'ava';
import { ValidatorConfiguration } from '../../../src/types';
import truncate from '../../../src/transformers/string/truncate';

const conf: ValidatorConfiguration = {
    name: 'numField',
    original: {},
    path: [],
    parent: {},
};

test('truncate validator cuts the string to a maximum number of characters', async (t) => {
    const validateTruncate = truncate(6);

    t.is(await validateTruncate('123', conf), '123');
    t.is(await validateTruncate('123456', conf), '123456');
    t.is(await validateTruncate('123456789', conf), '123456');
});

test('truncate validator cuts from the end of the string if n is negative', async (t) => {
    const validateTruncate = truncate(-6);

    t.is(await validateTruncate('123', conf), '123');
    t.is(await validateTruncate('123456', conf), '123456');
    t.is(await validateTruncate('123456789', conf), '456789');
});

test('truncate validator returns empty if n is zero', async (t) => {
    const validateTruncate = truncate(0);

    t.is(await validateTruncate('123', conf), '');
});

test('truncate if passed word is not a string, ignores', async (t) => {
    const validateTruncate = truncate(6);

    t.is(await validateTruncate(8 as any, conf), undefined);
    t.is(await validateTruncate(NaN as any, conf), undefined);
    t.is(await validateTruncate(true as any, conf), undefined);
    t.is(await validateTruncate([] as any, conf), undefined);
    t.is(await validateTruncate(Array(8).fill('a') as any, conf), undefined);
    t.is(await validateTruncate({} as any, conf), undefined);
    t.is(await validateTruncate(undefined as any, conf), undefined);
    t.is(await validateTruncate(null as any, conf), undefined);
});
