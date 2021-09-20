import test from 'ava';
import { isEmptySuccess, ValidatorConfiguration } from '../../../src/types';
import toString from '../../../src/validators/string/toString';

const conf: ValidatorConfiguration = {
    name: 'strField',
    original: {},
    path: [],
    parent: {},
};

test('toString returns the stringified value', async (t) => {
    const sanitizeString = toString();

    t.is(await sanitizeString('string', conf), 'string');
    t.is(await sanitizeString('0', conf), '0');
    t.is(await sanitizeString(123 as any, conf), '123');
    t.is(await sanitizeString(9.9 as any, conf), '9.9');
    t.is(await sanitizeString([1, 2, 3] as any, conf), '1,2,3');
    t.is(await sanitizeString({} as any, conf), '[object Object]');
    const date = new Date('2021-08-29');
    t.is(await sanitizeString(date as any, conf), date.toString());
});
