import { describe, expect, test } from '@jest/globals';
import { ValidatorConfiguration } from '../../../src/types';
import tryBool from '../../../src/validators/boolean/tryBool';

const conf: ValidatorConfiguration = {
    name: 'boolField',
    original: {},
    parent: {},
    path: [],
};

test('tryBool with with true, false, one and zero returns the correct value', async () => {
    const sanitizeBool = tryBool();

    await expect(sanitizeBool(true, conf)).toBe(true);
    await expect(sanitizeBool(false, conf)).toBe(false);
    await expect(sanitizeBool(1 as any, conf)).toBe(true);
    await expect(sanitizeBool(0 as any, conf)).toBe(false);
});

test('tryBool with other things fails', async () => {
    const sanitizeBool = tryBool();

    try {
        await sanitizeBool('' as any, conf);
    } catch (err) {
        expect(err).toBe('Field boolField cannot be converted to boolean.');
    }

    try {
        await sanitizeBool('asd' as any, conf);
    } catch (err) {
        expect(err).toBe('Field boolField cannot be converted to boolean.');
    }

    try {
        await sanitizeBool({} as any, conf);
    } catch (err) {
        expect(err).toBe('Field boolField cannot be converted to boolean.');
    }

    try {
        await sanitizeBool([] as any, conf);
    } catch (err) {
        expect(err).toBe('Field boolField cannot be converted to boolean.');
    }

    try {
        await sanitizeBool(undefined as any, conf);
    } catch (err) {
        expect(err).toBe('Field boolField cannot be converted to boolean.');
    }

    try {
        await sanitizeBool(null as any, conf);
    } catch (err) {
        expect(err).toBe('Field boolField cannot be converted to boolean.');
    }
});

test('tryBool can be customized to accept other truthy or falsey values', async () => {
    const sanitizeBool = tryBool([true, 1, 'true', 600], [true, 1, 'false', null]);

    await expect(sanitizeBool('true' as any, conf)).toBe(true);
    await expect(sanitizeBool('false' as any, conf)).toBe(false);
    await expect(sanitizeBool(600 as any, conf)).toBe(true);
    await expect(sanitizeBool(null as any, conf)).toBe(false);
});
