import test from 'ava';
import { ValidatorConfiguration } from '../../../src/types';
import ceil from '../../../src/transformers/number/ceil';

const conf: ValidatorConfiguration = {
    name: 'numField',
    original: {},
    path: [],
    parent: {},
};

test('ceil validator rounds up the number to the nearest integer', async (t) => {
    const validateCeil = ceil();

    t.is(await validateCeil(5, conf), 5);
    t.is(await validateCeil(6.1, conf), 7);
    t.is(await validateCeil(6.5, conf), 7);
    t.is(await validateCeil(6.9, conf), 7);
    t.is(await validateCeil(7.999999999999901, conf), 8);
});

test('ceil ignores non-number inputs', async (t) => {
    const validateCeil = ceil();

	t.is(await validateCeil('6' as any, conf), undefined);
    t.is(await validateCeil(NaN as any, conf), undefined);
    t.is(await validateCeil(undefined as any, conf), undefined);
    t.is(await validateCeil(null as any, conf), undefined);
    t.is(await validateCeil({} as any, conf), undefined);
});