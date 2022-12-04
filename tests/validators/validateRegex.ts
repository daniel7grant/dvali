import { describe, expect, test } from '@jest/globals';
import { ValidatorConfiguration } from '../../src/types';
import validateRegex from '../../src/validators/validateRegex';

const conf: ValidatorConfiguration = { name: 'object', original: {}, parent: {}, path: [] };

test('validateRegex function returns undefined if regex applies', async () => {
    const validateTest = validateRegex(/[a-z].*/);
    await expect(validateTest('asdasd', conf)).toBeUndefined();
});

test('validateRegex function throws error if regex fails', async () => {
    const validateTest = validateRegex(/[a-z].*/);
    try {
        await validateTest('123', conf);
    } catch (err) {
        expect(err).not.toBeUndefined();
    }
});

test('validateRegex function ignores if passed value is not a string', async () => {
    const validateTest = validateRegex(/[a-z].*/);
    await expect(validateTest(123 as any, conf)).toBeUndefined();
});
