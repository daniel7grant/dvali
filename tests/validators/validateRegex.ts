import { describe, expect, test } from '@jest/globals';
import { ValidatorConfiguration } from '../../src/types';
import validateRegex from '../../src/validators/validateRegex';

const conf: ValidatorConfiguration = { name: 'object', original: {}, parent: {}, path: [] };

test('validateRegex function returns undefined if regex applies', async () => {
    const validateTest = validateRegex(/[a-z].*/);
    expect(validateTest('asdasd', conf)).toEqual('asdasd');
});

test('validateRegex function throws error if regex fails', async () => {
    const validateTest = validateRegex(/[a-z].*/);
    try {
        validateTest('123', conf);
    } catch (err) {
        expect(err).not.toBeUndefined();
    }
});
