import { describe, expect, test } from '@jest/globals';
import { ValidatorConfiguration } from '../../../src/types';
import isUrl from '../../../src/validators/string/isUrl';

const conf: ValidatorConfiguration = {
    name: 'strField',
    original: {},
    path: [],
    parent: {},
};

test('isUrl, if valid url is given, returns successfully', async () => {
    const validateUrl = isUrl();

    await expect(validateUrl('https://google.com', conf)).resolves.toBeUndefined();
    await expect(validateUrl('https://google.com/', conf)).resolves.toBeUndefined();
    await expect(validateUrl('https://google.com:8443', conf)).resolves.toBeUndefined();
    await expect(validateUrl('https://google.com/search?q=name', conf)).resolves.toBeUndefined();
    await expect(validateUrl('https://google.com/#asdasd', conf)).resolves.toBeUndefined();
    await expect(validateUrl('mailto:asd@asd.asd', conf)).resolves.toBeUndefined();
    await expect(validateUrl('file:///etc/passwd', conf)).resolves.toBeUndefined();
    await expect(
        validateUrl('ftp://user:password@ftphost.com/directory', conf)
    ).resolves.toBeUndefined();
});

test('isUrl, if invalid url is given, fails', async () => {
    const validateUrl = isUrl();

    try {
        await validateUrl('asdasdasd', conf);
    } catch (err) {
        expect(err).toBe('Field strField should be an url.');
    }

    try {
        await validateUrl('http://', conf);
    } catch (err) {
        expect(err).toBe('Field strField should be an url.');
    }

    try {
        await validateUrl('http://goo gle.com', conf);
    } catch (err) {
        expect(err).toBe('Field strField should be an url.');
    }
});

test('isUrl, if not a string is given, ignores', async () => {
    const validateUrl = isUrl();

    await expect(validateUrl(8 as any, conf)).resolves.toBeUndefined();
    await expect(validateUrl(NaN as any, conf)).resolves.toBeUndefined();
    await expect(validateUrl(true as any, conf)).resolves.toBeUndefined();
    await expect(validateUrl([] as any, conf)).resolves.toBeUndefined();
    await expect(
        validateUrl(['a', 's', 'd', '@', 'a', 's', 'd', '.', 'a', 's', 'd'] as any, conf)
    ).resolves.toBeUndefined();
    await expect(validateUrl({} as any, conf)).resolves.toBeUndefined();
    await expect(validateUrl(undefined as any, conf)).resolves.toBeUndefined();
    await expect(validateUrl(null as any, conf)).resolves.toBeUndefined();
});
