import test from 'ava';
import { ValidatorConfiguration } from '../../../src/types';
import isUrl from '../../../src/validators/string/isUrl';

const conf: ValidatorConfiguration = {
    name: 'strField',
    original: {},
    path: [],
    parent: {},
};

test('isUrl, if valid url is given, returns successfully', async (t) => {
    const validateUrl = isUrl();

    await validateUrl('https://google.com', conf);
    await validateUrl('https://google.com/', conf);
    await validateUrl('https://google.com:8443', conf);
    await validateUrl('https://google.com/search?q=name', conf);
    await validateUrl('https://google.com/#asdasd', conf);
    await validateUrl('mailto:asd@asd.asd', conf);
    await validateUrl('file:///etc/passwd', conf);
    await validateUrl('ftp://user:password@ftphost.com/directory', conf);

    t.pass();
});

test('isUrl, if invalid url is given, fails', async (t) => {
    const validateUrl = isUrl();

    try {
        await validateUrl('asdasdasd', conf);
        t.fail("Plain string as url doesn't fail.");
    } catch (ex) {
        t.is(ex, 'Field strField should be an url.');
    }

    try {
        await validateUrl('http://', conf);
        t.fail("No domain part doesn't fail.");
    } catch (ex) {
        t.is(ex, 'Field strField should be an url.');
    }

    try {
        await validateUrl('http://goo gle.com', conf);
        t.fail("Spaces in domain part doesn't fail.");
    } catch (ex) {
        t.is(ex, 'Field strField should be an url.');
    }
});

test('isUrl, if not a string is given, ignores', async (t) => {
    const validateUrl = isUrl();

    await validateUrl(8 as any, conf);
    await validateUrl(NaN as any, conf);
    await validateUrl(true as any, conf);
    await validateUrl([] as any, conf);
    await validateUrl(['a', 's', 'd', '@', 'a', 's', 'd', '.', 'a', 's', 'd'] as any, conf);
    await validateUrl({} as any, conf);
    await validateUrl(undefined as any, conf);
    await validateUrl(null as any, conf);

    t.pass();
});
