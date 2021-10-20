import test from 'ava';
import { ValidatorConfiguration } from '../../../src/types';
import clamp from '../../../src/transformers/number/clamp';

const conf: ValidatorConfiguration = {
    name: 'numField',
    original: {},
    path: [],
    parent: {},
};

test('clamp validator returns the number if it is between the two limits', async (t) => {
    const validateClamp = clamp(5, 7);

    t.is(await validateClamp(5, conf), 5);
    t.is(await validateClamp(5.5, conf), 5.5);
    t.is(await validateClamp(6, conf), 6);
    t.is(await validateClamp(7, conf), 7);
});

test('clamp validator returns the closest limit if the value is outside the limit', async (t) => {
    const validateClamp = clamp(5, 7);

    t.is(await validateClamp(-Infinity, conf), 5);
    t.is(await validateClamp(-1000, conf), 5);
    t.is(await validateClamp(999, conf), 7);
    t.is(await validateClamp(Infinity, conf), 7);
});

test('clamp validator works with decimal limits too', async (t) => {
    const validateClamp = clamp(5.1, 6.9);

    t.is(await validateClamp(-1000, conf), 5.1);
    t.is(await validateClamp(5.1, conf), 5.1);
    t.is(await validateClamp(6, conf), 6);
    t.is(await validateClamp(6.3, conf), 6.3);
    t.is(await validateClamp(999, conf), 6.9);
});

test('clamp ignores non-number inputs', async (t) => {
    const validateClamp = clamp(5, 7);

    t.is(await validateClamp('6' as any, conf), undefined);
    t.is(await validateClamp(NaN as any, conf), undefined);
    t.is(await validateClamp(undefined as any, conf), undefined);
    t.is(await validateClamp(null as any, conf), undefined);
    t.is(await validateClamp({} as any, conf), undefined);
});
