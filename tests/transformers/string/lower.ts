import test from 'ava';
import { ValidatorConfiguration } from '../../../src/types';
import lower from '../../../src/transformers/string/lower';

const conf: ValidatorConfiguration = {
    name: 'numField',
    original: {},
    path: [],
    parent: {},
};

test('lower validator changes every letter to the lowercase equivalent', async (t) => {
    const validateLower = lower();

    t.is(await validateLower('asdasd', conf), 'asdasd');
    t.is(await validateLower('Asdasd', conf), 'asdasd');
    t.is(await validateLower('aSdaSD', conf), 'asdasd');
});

test('lower validator works with locale-strings', async (t) => {
    const validateLower = lower();

    t.is(await validateLower('mÄdchEn', conf), 'mädchen');
    t.is(await validateLower('cSütÖrtÖk', conf), 'csütörtök');
});

test('lower if passed word is not a string, ignores', async (t) => {
    const validateLower = lower();

    t.is(await validateLower(8 as any, conf), undefined);
    t.is(await validateLower(NaN as any, conf), undefined);
    t.is(await validateLower(true as any, conf), undefined);
    t.is(await validateLower([] as any, conf), undefined);
    t.is(await validateLower(Array(8).fill('a') as any, conf), undefined);
    t.is(await validateLower({} as any, conf), undefined);
    t.is(await validateLower(undefined as any, conf), undefined);
    t.is(await validateLower(null as any, conf), undefined);
});
