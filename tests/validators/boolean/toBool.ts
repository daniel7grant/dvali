import { describe, expect, test } from '@jest/globals';
import { ValidatorConfiguration } from '../../../src/types';
import toBool from '../../../src/validators/boolean/toBool';

const conf: ValidatorConfiguration = {
    name: 'boolField',
    original: {},
    parent: {},
    path: [],
};

test('toBool converts everything to boolean', async () => {
    const sanitizeBool = toBool();

    await expect(sanitizeBool(true, conf)).resolves.toBe(true);
    await expect(sanitizeBool(false, conf)).resolves.toBe(false);
    await expect(sanitizeBool(0 as any, conf)).resolves.toBe(false);
    await expect(sanitizeBool(-0 as any, conf)).resolves.toBe(false);
    await expect(sanitizeBool(1 as any, conf)).resolves.toBe(true);
    await expect(sanitizeBool(123 as any, conf)).resolves.toBe(true);
    await expect(sanitizeBool(NaN as any, conf)).resolves.toBe(false);
    await expect(sanitizeBool('' as any, conf)).resolves.toBe(false);
    await expect(sanitizeBool('asd' as any, conf)).resolves.toBe(true);
    await expect(sanitizeBool({} as any, conf)).resolves.toBe(true);
    await expect(sanitizeBool([] as any, conf)).resolves.toBe(true);
    await expect(sanitizeBool(null as any, conf)).resolves.toBe(false);
    await expect(sanitizeBool(undefined as any, conf)).resolves.toBe(false);
});
