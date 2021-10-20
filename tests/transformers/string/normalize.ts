import test from 'ava';
import { ValidatorConfiguration } from '../../../src/types';
import normalize from '../../../src/transformers/string/normalize';

const conf: ValidatorConfiguration = {
    name: 'numField',
    original: {},
    path: [],
    parent: {},
};

test('normalize validator normalizes the Unicode representation of a string', async (t) => {
    const validateNormalize = normalize();

    t.is(await validateNormalize('\u006E\u0303', conf), '\u00F1'); // ñ
});

test('normalize validator normalizes the string with another normalization form', async (t) => {
    const validateNormalize = normalize('NFD');

    t.is(await validateNormalize('\u00F1', conf), '\u006E\u0303'); // ñ
});

test('normalize if passed word is not a string, ignores', async (t) => {
    const validateNormalize = normalize();

    t.is(await validateNormalize(8 as any, conf), undefined);
    t.is(await validateNormalize(NaN as any, conf), undefined);
    t.is(await validateNormalize(true as any, conf), undefined);
    t.is(await validateNormalize([] as any, conf), undefined);
    t.is(await validateNormalize(Array(8).fill('a') as any, conf), undefined);
    t.is(await validateNormalize({} as any, conf), undefined);
    t.is(await validateNormalize(undefined as any, conf), undefined);
    t.is(await validateNormalize(null as any, conf), undefined);
});
