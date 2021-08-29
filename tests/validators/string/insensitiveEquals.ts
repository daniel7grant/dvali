import test from 'ava';
import { ValidatorConfiguration } from '../../../src/types';
import insensitiveEquals from '../../../src/validators/string/insensitiveEquals';

const conf: ValidatorConfiguration = {
    name: 'strField',
    original: {},
    path: [],
    parent: {},
};

test('insensitiveEquals, if the two strings are the same, returns successfully', async (t) => {
    const validateInsensitiveEquals = insensitiveEquals('AsdasD');

    await validateInsensitiveEquals('asdasd', conf);
    await validateInsensitiveEquals('AsdasD', conf);
    await validateInsensitiveEquals('ASDASD', conf);
    await validateInsensitiveEquals('AsDaSd', conf);

    t.pass();
});

test('insensitiveEquals, if the two string are the same, fails', async (t) => {
    const validateInsensitiveEquals = insensitiveEquals('AsdasD');

    try {
        await validateInsensitiveEquals('dsadsa', conf);
        t.fail("Completely different string doesn't fail.");
    } catch (ex) {
        t.is(ex, 'Field strField should be equal to AsdasD.');
    }

    try {
        await validateInsensitiveEquals('asd@asd', conf);
        t.fail("String with special characters doesn't fail.");
    } catch (ex) {
        t.is(ex, 'Field strField should be equal to AsdasD.');
    }

    try {
        await validateInsensitiveEquals('äsdäsd', conf);
        t.fail("Address with accents doesn't fail.");
    } catch (ex) {
        t.is(ex, 'Field strField should be equal to AsdasD.');
    }
});

test('insensitiveEquals, if not a string is given, ignores', async (t) => {
    const validateInsensitiveEquals = insensitiveEquals('AsdasD');

    await validateInsensitiveEquals(6 as any, conf);
    await validateInsensitiveEquals(NaN as any, conf);
    await validateInsensitiveEquals(true as any, conf);
    await validateInsensitiveEquals([] as any, conf);
    await validateInsensitiveEquals(['A', 's', 'd', 'a', 's', 'D'] as any, conf);
    await validateInsensitiveEquals({} as any, conf);
    await validateInsensitiveEquals(undefined as any, conf);
    await validateInsensitiveEquals(null as any, conf);

    t.pass();
});
