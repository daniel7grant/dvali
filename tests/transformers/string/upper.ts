import test from 'ava';
import upper from '../../../src/transformers/string/upper';
import { ValidatorConfiguration } from '../../../src/types';

const conf: ValidatorConfiguration = {
    name: 'numField',
    original: {},
    path: [],
    parent: {},
};

test('upper validator changes every letter to the uppercase equivalent', async (t) => {
    const validateUpper = upper();

    t.is(await validateUpper('asdasd', conf), 'ASDASD');
    t.is(await validateUpper('Asdasd', conf), 'ASDASD');
    t.is(await validateUpper('aSdaSD', conf), 'ASDASD');
    t.is(await validateUpper('ASDASD', conf), 'ASDASD');
});

test('upper validator works with locale-strings', async (t) => {
    const validateUpper = upper();

    t.is(await validateUpper('weiß', conf), 'WEISS');
    t.is(await validateUpper('cSütÖrtÖk', conf), 'CSÜTÖRTÖK');
});
test('upper if passed word is not a string, ignores', async (t) => {
    const validateUpper = upper();

    t.is(await validateUpper(8 as any, conf), undefined);
    t.is(await validateUpper(NaN as any, conf), undefined);
    t.is(await validateUpper(true as any, conf), undefined);
    t.is(await validateUpper([] as any, conf), undefined);
    t.is(await validateUpper(Array(8).fill('a') as any, conf), undefined);
    t.is(await validateUpper({} as any, conf), undefined);
    t.is(await validateUpper(undefined as any, conf), undefined);
    t.is(await validateUpper(null as any, conf), undefined);
});
