import test from 'ava';
import { ValidatorConfiguration } from '../../../src/types';
import round from '../../../src/transformers/number/round';

const conf: ValidatorConfiguration = {
    name: 'numField',
    original: {},
    path: [],
    parent: {},
};

test('round validator rounds the number to the nearest integer mathematically', async (t) => {
    const validateRound = round();

    t.is(await validateRound(5, conf), 5);
    t.is(await validateRound(6.1, conf), 6);
    t.is(await validateRound(6.5, conf), 7);
    t.is(await validateRound(6.9, conf), 7);
    t.is(await validateRound(7.00000000001, conf), 7);
});

test('round ignores non-number inputs', async (t) => {
    const validateRound = round();

	t.is(await validateRound('6' as any, conf), undefined);
    t.is(await validateRound(NaN as any, conf), undefined);
    t.is(await validateRound(undefined as any, conf), undefined);
    t.is(await validateRound(null as any, conf), undefined);
    t.is(await validateRound({} as any, conf), undefined);
});