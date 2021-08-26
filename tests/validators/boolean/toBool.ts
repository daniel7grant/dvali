import test from 'ava';
import { ValidatorConfiguration } from '../../../src/types';
import toBool from '../../../src/validators/boolean/toBool';

const conf: ValidatorConfiguration = {
    name: 'boolField',
    original: {},
    parent: {},
    path: [],
};

test('toBool converts everything to boolean', async (t) => {
    const sanitizeBool = toBool();

    t.is(await sanitizeBool(true, conf), true);
    t.is(await sanitizeBool(false, conf), false);
    t.is(await sanitizeBool(0 as any, conf), false);
    t.is(await sanitizeBool(-0 as any, conf), false);
    t.is(await sanitizeBool(1 as any, conf), true);
    t.is(await sanitizeBool(123 as any, conf), true);
    t.is(await sanitizeBool(NaN as any, conf), false);
    t.is(await sanitizeBool("" as any, conf), false);
    t.is(await sanitizeBool("asd" as any, conf), true);
    t.is(await sanitizeBool({} as any, conf), true);
    t.is(await sanitizeBool([] as any, conf), true);
    t.is(await sanitizeBool(null as any, conf), false);
    t.is(await sanitizeBool(undefined as any, conf), false);

    t.pass();
});
