import test from 'ava';
import { ValidatorConfiguration } from '../../../src/types';
import toInt from '../../../src/validators/number/toInt';

const conf: ValidatorConfiguration = {
    name: 'numField',
    original: {},
    path: [],
    parent: {},
};

test('toInt, when number is passed, returns the value', async (t) => {
    const validateInteger = toInt();

    t.is(await validateInteger(-1, conf), -1);
    t.is(await validateInteger(0, conf), 0);
    t.is(await validateInteger(123, conf), 123);
    t.is(await validateInteger(1e10, conf), 1e10);
});

test('toInt, when numeric string is passed, returns the parsed value', async (t) => {
    const validateInteger = toInt();

    t.is(await validateInteger('-1' as any, conf), -1);
    t.is(await validateInteger('0' as any, conf), 0);
    t.is(await validateInteger('123' as any, conf), 123);
});

test('tryInt, when decimal value is passed, returns the value floored to the integer part', async (t) => {
    const validateInteger = toInt();

    t.is(await validateInteger(1.1 as any, conf), 1);
    t.is(await validateInteger('1.1' as any, conf), 1);
    t.is(await validateInteger('123.99' as any, conf), 123);
});

test('toInt, when not convertible value is passed, returns NaN', async (t) => {
    const validateInteger = toInt();

    t.is(await validateInteger('string' as any, conf), NaN);
    t.is(await validateInteger(Infinity, conf), NaN);
    t.is(await validateInteger(-Infinity, conf), NaN);
    t.is(await validateInteger(NaN as any, conf), NaN);
    t.is(await validateInteger([] as any, conf), NaN);
    t.is(await validateInteger({} as any, conf), NaN);
    t.is(await validateInteger(null as any, conf), NaN);
});
