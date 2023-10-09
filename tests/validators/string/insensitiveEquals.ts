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

    await expect(validateInsensitiveEquals('asdasd', conf)).toEqual('asdasd');
    await expect(validateInsensitiveEquals('AsdasD', conf)).toEqual('AsdasD');
    await expect(validateInsensitiveEquals('ASDASD', conf)).toEqual('ASDASD');
    await expect(validateInsensitiveEquals('AsDaSd', conf)).toEqual('AsDaSd');
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
