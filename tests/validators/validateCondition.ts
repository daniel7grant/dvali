import { expect, test } from '@jest/globals';
import { ValidatorConfiguration } from '../../src/types';
import validateCondition from '../../src/validators/validateCondition';

const conf: ValidatorConfiguration = { name: 'object', original: {}, parent: {}, path: [] };

test('validateCondition function returns value if condition applies', async () => {
    const validateTest = validateCondition(() => true);
    expect(validateTest('', conf)).toEqual('');
});

test('validateCondition function returns value if async condition applies', async () => {
    const validateTest = validateCondition(() => Promise.resolve(true));
    await expect(validateTest('', conf)).resolves.toEqual('');
});

test('validateCondition function throws error if condition fails', async () => {
    const validateTest = validateCondition(() => false);
    try {
        validateTest('', conf);
    } catch (err) {
        expect(err).not.toBeUndefined();
    }
});

test('validateCondition function throws error if async condition fails', async () => {
    const validateTest = validateCondition(() => Promise.resolve(false));
    try {
        await validateTest('', conf);
    } catch (err) {
        expect(err).not.toBeUndefined();
    }
});

test('validateCondition function throws error if async condition fails', async () => {
    const validateTest = validateCondition(() => {
        throw 'Oh no.';
    });
    try {
        validateTest('', conf);
    } catch (err) {
        expect(err).not.toBeUndefined();
    }
});
