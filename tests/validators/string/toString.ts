import { describe, expect, test } from '@jest/globals';
import { ValidatorConfiguration } from '../../../src/types';
import toString from '../../../src/validators/string/toString';

const conf: ValidatorConfiguration = {
    name: 'strField',
    original: {},
    path: [],
    parent: {},
};

test('toString returns the stringified value', async () => {
    const sanitizeString = toString();

    expect(await sanitizeString('string', conf)).toBe('string');
    expect(await sanitizeString('0', conf)).toBe('0');
    expect(await sanitizeString(123 as any, conf)).toBe('123');
    expect(await sanitizeString(9.9 as any, conf)).toBe('9.9');
    expect(await sanitizeString([1, 2, 3] as any, conf)).toBe('1,2,3');
    expect(await sanitizeString({} as any, conf)).toBe('[object Object]');
    const date = new Date('2021-08-29');
    expect(await sanitizeString(date as any, conf)).toBe(date.toString());
    expect(await sanitizeString(null as any, conf)).toBe('null');
    expect(await sanitizeString(undefined as any, conf)).toBe('undefined');
});
