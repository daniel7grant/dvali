import test from 'ava';
import { ValidatorConfiguration } from '../../../src/types';
import toMultipleOf from '../../../src/transformers/number/toMultipleOf';

const conf: ValidatorConfiguration = {
    name: 'numField',
    original: {},
    path: [],
    parent: {},
};

test('toMultipleOf validator rounds to the nearest multiple of n mathematically', async (t) => {
    const validateMultipleOfFive = toMultipleOf(5);

    t.is(await validateMultipleOfFive(5, conf), 5);
    t.is(await validateMultipleOfFive(6.1, conf), 5);
    t.is(await validateMultipleOfFive(7.5, conf), 10);
    t.is(await validateMultipleOfFive(10.00000000001, conf), 10);
    t.is(await validateMultipleOfFive(-7.5, conf), -5);
});

test('toMultipleOf validator rounds to the nearest multiple of n with the given function', async (t) => {
    const validateMultipleOfFive = toMultipleOf(5, Math.floor);

    t.is(await validateMultipleOfFive(5, conf), 5);
    t.is(await validateMultipleOfFive(6.1, conf), 5);
    t.is(await validateMultipleOfFive(7.5, conf), 5);
    t.is(await validateMultipleOfFive(10.00000000001, conf), 10);
    t.is(await validateMultipleOfFive(-7.5, conf), -10);
});

test('toMultipleOf ignores non-number inputs', async (t) => {
    const validateMultipleOfFive = toMultipleOf(5);

    t.is(await validateMultipleOfFive('10' as any, conf), undefined);
    t.is(await validateMultipleOfFive(NaN as any, conf), undefined);
    t.is(await validateMultipleOfFive(undefined as any, conf), undefined);
    t.is(await validateMultipleOfFive(null as any, conf), undefined);
    t.is(await validateMultipleOfFive({} as any, conf), undefined);
});
