import { describe, expect, test } from '@jest/globals';
import { ValidatorConfiguration } from '../../../src/types';
import toInt from '../../../src/validators/number/toInt';

const conf: ValidatorConfiguration = {
    name: 'numField',
    original: {},
    path: [],
    parent: {},
};

test('toInt, when number is passed, returns the value', async () => {
    const validateInteger = toInt();

    await expect(validateInteger(-1, conf)).resolves.toBe(-1);
    await expect(validateInteger(0, conf)).resolves.toBe(0);
    await expect(validateInteger(123, conf)).resolves.toBe(123);
    await expect(validateInteger(1e10, conf)).resolves.toBe(1e10);
});

test('toInt, when numeric string is passed, returns the parsed value', async () => {
    const validateInteger = toInt();

    await expect(validateInteger('-1' as any, conf)).resolves.toBe(-1);
    await expect(validateInteger('0' as any, conf)).resolves.toBe(0);
    await expect(validateInteger('123' as any, conf)).resolves.toBe(123);
});

test('tryInt, when decimal value is passed, returns the value floored to the integer part', async () => {
    const validateInteger = toInt();

    await expect(validateInteger(1.1 as any, conf)).resolves.toBe(1);
    await expect(validateInteger('1.1' as any, conf)).resolves.toBe(1);
    await expect(validateInteger('123.99' as any, conf)).resolves.toBe(123);
});

test('toInt, when not convertible value is passed, returns NaN', async () => {
    const validateInteger = toInt();

    await expect(validateInteger('string' as any, conf)).resolves.toBe(NaN);
    await expect(validateInteger(Infinity, conf)).resolves.toBe(NaN);
    await expect(validateInteger(-Infinity, conf)).resolves.toBe(NaN);
    await expect(validateInteger(NaN as any, conf)).resolves.toBe(NaN);
    await expect(validateInteger([] as any, conf)).resolves.toBe(NaN);
    await expect(validateInteger({} as any, conf)).resolves.toBe(NaN);
    await expect(validateInteger(null as any, conf)).resolves.toBe(NaN);
});
