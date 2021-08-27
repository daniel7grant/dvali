import test from 'ava';
import { ValidatorConfiguration } from '../../../src/types';
import toNumber from '../../../src/validators/number/toNumber';

const conf: ValidatorConfiguration = {
    name: 'numField',
    original: {},
    path: [],
    parent: {},
};

test('toNumber, when number is passed, returns the value', async (t) => {
    const validateNumber = toNumber();

    t.is(await validateNumber(-1, conf), -1);
    t.is(await validateNumber(0, conf), 0);
    t.is(await validateNumber(123, conf), 123);
    t.is(await validateNumber(1e10, conf), 1e10);
    t.is(await validateNumber(123.45, conf), 123.45);
    t.is(await validateNumber(1 / 10, conf), 1 / 10);
    t.is(await validateNumber(Infinity, conf), Infinity);
    t.is(await validateNumber(-Infinity, conf), -Infinity);
});

test('toNumber, when numeric string is passed, returns the parsed value', async (t) => {
    const validateNumber = toNumber();

    t.is(await validateNumber('-1' as any, conf), -1);
    t.is(await validateNumber('0' as any, conf), 0);
    t.is(await validateNumber('123' as any, conf), 123);
    t.is(await validateNumber('1e10' as any, conf), 1e10);
    t.is(await validateNumber('123.45' as any, conf), 123.45);
});

test('toNumber, when not convertible value is passed, returns NaN', async (t) => {
    const validateNumber = toNumber();

    t.is(await validateNumber('string' as any, conf), NaN);
    t.is(await validateNumber(NaN as any, conf), NaN);
    t.is(await validateNumber([] as any, conf), NaN);
    t.is(await validateNumber({} as any, conf), NaN);
    t.is(await validateNumber(null as any, conf), NaN);
});
