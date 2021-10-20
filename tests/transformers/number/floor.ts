import test from 'ava';
import { ValidatorConfiguration } from '../../../src/types';
import floor from '../../../src/transformers/number/floor';

const conf: ValidatorConfiguration = {
    name: 'numField',
    original: {},
    path: [],
    parent: {},
};

test('floor validator rounds down the number to the nearest integer', async (t) => {
    const validateFloor = floor();

    t.is(await validateFloor(5, conf), 5);
    t.is(await validateFloor(6.1, conf), 6);
    t.is(await validateFloor(6.9, conf), 6);
    t.is(await validateFloor(7.00000000001, conf), 7);
});

test('floor ignores non-number inputs', async (t) => {
    const validateFloor = floor();

	t.is(await validateFloor('6' as any, conf), undefined);
    t.is(await validateFloor(NaN as any, conf), undefined);
    t.is(await validateFloor(undefined as any, conf), undefined);
    t.is(await validateFloor(null as any, conf), undefined);
    t.is(await validateFloor({} as any, conf), undefined);
});