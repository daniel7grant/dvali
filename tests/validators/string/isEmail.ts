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

    await expect(validateEmail('support@gmail.com', conf)).toEqual('support@gmail.com');
    await expect(validateEmail('cat@dog.ninja', conf)).toEqual('cat@dog.ninja');
    await expect(validateEmail('asd@asd.asd', conf)).toEqual('asd@asd.asd');
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

