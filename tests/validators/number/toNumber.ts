import { describe, expect, test } from '@jest/globals';
import { ValidatorConfiguration } from '../../../src/types';
import toNumber from '../../../src/validators/number/toNumber';

const conf: ValidatorConfiguration = {
    name: 'numField',
    original: {},
    path: [],
    parent: {},
};

test('toNumber, when number is passed, returns the value', async () => {
    const validateNumber = toNumber();

    await expect(validateNumber(-1, conf)).resolves.toBe(-1);
    await expect(validateNumber(0, conf)).resolves.toBe(0);
    await expect(validateNumber(123, conf)).resolves.toBe(123);
    await expect(validateNumber(1e10, conf)).resolves.toBe(1e10);
    await expect(validateNumber(123.45, conf)).resolves.toBe(123.45);
    await expect(validateNumber(1 / 10, conf)).resolves.toBe(1 / 10);
    await expect(validateNumber(Infinity, conf)).resolves.toBe(Infinity);
    await expect(validateNumber(-Infinity, conf)).resolves.toBe(-Infinity);
});

test('toNumber, when numeric string is passed, returns the parsed value', async () => {
    const validateNumber = toNumber();

    await expect(validateNumber('-1' as any, conf)).resolves.toBe(-1);
    await expect(validateNumber('0' as any, conf)).resolves.toBe(0);
    await expect(validateNumber('123' as any, conf)).resolves.toBe(123);
    await expect(validateNumber('1e10' as any, conf)).resolves.toBe(1e10);
    await expect(validateNumber('123.45' as any, conf)).resolves.toBe(123.45);
});

test('toNumber, when not convertible value is passed, returns NaN', async () => {
    const validateNumber = toNumber();

    await expect(validateNumber('string' as any, conf)).resolves.toBe(NaN);
    await expect(validateNumber(NaN as any, conf)).resolves.toBe(NaN);
    await expect(validateNumber([] as any, conf)).resolves.toBe(NaN);
    await expect(validateNumber({} as any, conf)).resolves.toBe(NaN);
    await expect(validateNumber(null as any, conf)).resolves.toBe(NaN);
});
