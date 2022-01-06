import { describe, expect, test } from '@jest/globals';
import { ValidatorConfiguration } from '../../../src/types';
import isEmail from '../../../src/validators/string/isEmail';

const conf: ValidatorConfiguration = {
    name: 'strField',
    original: {},
    path: [],
    parent: {},
};

test('isEmail, if valid email is given, returns successfully', async () => {
    const validateEmail = isEmail();

    await expect(validateEmail('support@gmail.com', conf)).resolves.toBeUndefined();
    await expect(validateEmail('cat@dog.ninja', conf)).resolves.toBeUndefined();
    await expect(validateEmail('asd@asd.asd', conf)).resolves.toBeUndefined();
});

test('isEmail, if invalid email is given, fails', async () => {
    const validateEmail = isEmail();

    try {
        await validateEmail('asdasdasd', conf);
    } catch (err) {
        expect(err).toBe('Field strField should be an email.');
    }

    try {
        await validateEmail('asd@asd@asd', conf);
    } catch (err) {
        expect(err).toBe('Field strField should be an email.');
    }

    try {
        await validateEmail('asd@asd&asd', conf);
    } catch (err) {
        expect(err).toBe('Field strField should be an email.');
    }

    try {
        await validateEmail('asd@asd', conf);
    } catch (err) {
        expect(err).toBe('Field strField should be an email.');
    }

    try {
        await validateEmail('@asd.asd', conf);
    } catch (err) {
        expect(err).toBe('Field strField should be an email.');
    }

    try {
        await validateEmail('asd@.asd', conf);
    } catch (err) {
        expect(err).toBe('Field strField should be an email.');
    }
});

test('isEmail, if not a string is given, ignores', async () => {
    const validateEmail = isEmail();

    await expect(validateEmail(8 as any, conf)).resolves.toBeUndefined();
    await expect(validateEmail(NaN as any, conf)).resolves.toBeUndefined();
    await expect(validateEmail(true as any, conf)).resolves.toBeUndefined();
    await expect(validateEmail([] as any, conf)).resolves.toBeUndefined();
    await expect(
        validateEmail(['a', 's', 'd', '@', 'a', 's', 'd', '.', 'a', 's', 'd'] as any, conf)
    ).resolves.toBeUndefined();
    await expect(validateEmail({} as any, conf)).resolves.toBeUndefined();
    await expect(validateEmail(undefined as any, conf)).resolves.toBeUndefined();
    await expect(validateEmail(null as any, conf)).resolves.toBeUndefined();
});
