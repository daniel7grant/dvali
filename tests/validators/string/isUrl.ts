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

    await expect(validateUrl('https://google.com', conf)).toEqual('https://google.com');
    await expect(validateUrl('https://google.com/', conf)).toEqual('https://google.com/');
    await expect(validateUrl('https://google.com:8443', conf)).toEqual('https://google.com:8443');
    await expect(validateUrl('https://google.com/search?q=name', conf)).toEqual(
        'https://google.com/search?q=name'
    );
    await expect(validateUrl('https://google.com/#asdasd', conf)).toEqual(
        'https://google.com/#asdasd'
    );
    await expect(validateUrl('mailto:asd@asd.asd', conf)).toEqual('mailto:asd@asd.asd');
    await expect(validateUrl('file:///etc/passwd', conf)).toEqual('file:///etc/passwd');
    await expect(validateUrl('ftp://user:password@ftphost.com/directory', conf)).toEqual(
        'ftp://user:password@ftphost.com/directory'
    );
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
