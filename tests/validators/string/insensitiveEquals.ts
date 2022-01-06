import { describe, expect, test } from '@jest/globals';
import { ValidatorConfiguration } from '../../../src/types';
import insensitiveEquals from '../../../src/validators/string/insensitiveEquals';

const conf: ValidatorConfiguration = {
    name: 'strField',
    original: {},
    path: [],
    parent: {},
};

test('insensitiveEquals, if the two strings are the same, returns successfully', async () => {
    const validateInsensitiveEquals = insensitiveEquals('AsdasD');

    await expect(validateInsensitiveEquals('asdasd', conf)).resolves.toBeUndefined();
    await expect(validateInsensitiveEquals('AsdasD', conf)).resolves.toBeUndefined();
    await expect(validateInsensitiveEquals('ASDASD', conf)).resolves.toBeUndefined();
    await expect(validateInsensitiveEquals('AsDaSd', conf)).resolves.toBeUndefined();
});

test('insensitiveEquals, if the two string are the same, fails', async () => {
    const validateInsensitiveEquals = insensitiveEquals('AsdasD');

    try {
        await validateInsensitiveEquals('dsadsa', conf);
    } catch (err) {
        expect(err).toBe('Field strField should be equal to AsdasD.');
    }

    try {
        await validateInsensitiveEquals('asd@asd', conf);
    } catch (err) {
        expect(err).toBe('Field strField should be equal to AsdasD.');
    }

    try {
        await validateInsensitiveEquals('äsdäsd', conf);
    } catch (err) {
        expect(err).toBe('Field strField should be equal to AsdasD.');
    }
});

test('insensitiveEquals, if not a string is given, ignores', async () => {
    const validateInsensitiveEquals = insensitiveEquals('AsdasD');

    await expect(validateInsensitiveEquals(6 as any, conf)).resolves.toBeUndefined();
    await expect(validateInsensitiveEquals(NaN as any, conf)).resolves.toBeUndefined();
    await expect(validateInsensitiveEquals(true as any, conf)).resolves.toBeUndefined();
    await expect(validateInsensitiveEquals([] as any, conf)).resolves.toBeUndefined();
    await expect(
        validateInsensitiveEquals(['A', 's', 'd', 'a', 's', 'D'] as any, conf)
    ).resolves.toBeUndefined();
    await expect(validateInsensitiveEquals({} as any, conf)).resolves.toBeUndefined();
    await expect(validateInsensitiveEquals(undefined as any, conf)).resolves.toBeUndefined();
    await expect(validateInsensitiveEquals(null as any, conf)).resolves.toBeUndefined();
});
