import test from 'ava';
import { ValidatorConfiguration } from '../../../src/types';
import trim from '../../../src/transformers/string/trim';

const conf: ValidatorConfiguration = {
    name: 'numField',
    original: {},
    path: [],
    parent: {},
};

test('trim validator removes whitespace from the start and end', async (t) => {
    const validateTrim = trim();

    t.is(await validateTrim(' asdasd    ', conf), 'asdasd');
    t.is(await validateTrim(' asdasd\r\n\t', conf), 'asdasd');
    t.is(await validateTrim(' asd asd\t', conf), 'asd asd');
    t.is(await validateTrim(' asd\r\nasd\t', conf), 'asd\r\nasd');
});

test('trim if passed word is not a string, ignores', async (t) => {
    const validateTrim = trim();

    t.is(await validateTrim(8 as any, conf), undefined);
    t.is(await validateTrim(NaN as any, conf), undefined);
    t.is(await validateTrim(true as any, conf), undefined);
    t.is(await validateTrim([] as any, conf), undefined);
    t.is(await validateTrim(Array(8).fill('a') as any, conf), undefined);
    t.is(await validateTrim({} as any, conf), undefined);
    t.is(await validateTrim(undefined as any, conf), undefined);
    t.is(await validateTrim(null as any, conf), undefined);
});
