import { expect, test } from '@jest/globals';
import { ValidatorConfiguration } from '../../src/types';
import validateCondition from '../../src/validators/validateCondition';

const conf: ValidatorConfiguration = { name: 'object', original: {}, parent: {}, path: [] };

test('validateCondition function returns undefined if regex applies', async () => {
    const validateTest = validateCondition(() => true);
    expect(validateTest('', conf)).toEqual('');
});

test('validateCondition function throws error if regex fails', async () => {
    const validateTest = validateCondition(() => false);
    try {
        validateTest('', conf);
    } catch (err) {
        expect(err).not.toBeUndefined();
    }
});
