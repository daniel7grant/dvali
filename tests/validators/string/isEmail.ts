import test from 'ava';
import { ValidatorConfiguration } from '../../../src/types';
import isEmail from '../../../src/validators/string/isEmail';

const conf: ValidatorConfiguration = {
    name: 'strField',
    original: {},
    path: [],
    parent: {},
};

test('isEmail, if valid email is given, returns successfully', async (t) => {
    const validateEmail = isEmail();

    await validateEmail('support@gmail.com', conf);
    await validateEmail('cat@dog.ninja', conf);
    await validateEmail('asd@asd.asd', conf);

    t.pass();
});

test('isEmail, if invalid email is given, fails', async (t) => {
    const validateEmail = isEmail();

    try {
        await validateEmail('asdasdasd', conf);
        t.fail("Plain string as address doesn't fail.");
    } catch (ex) {
        t.is(ex, 'Field strField should be an email.');
    }
    
    try {
        await validateEmail('asd@asd@asd', conf);
        t.fail("Address without multiple ats doesn't fail.");
    } catch (ex) {
        t.is(ex, 'Field strField should be an email.');
    }

    try {
        await validateEmail('asd@asd&asd', conf);
        t.fail("Domain with special characters doesn't fail.");
    } catch (ex) {
        t.is(ex, 'Field strField should be an email.');
    }
    
    try {
        await validateEmail('asd@asd', conf);
        t.fail("Address without TLD doesn't fail.");
    } catch (ex) {
        t.is(ex, 'Field strField should be an email.');
    }

    try {
        await validateEmail('@asd.asd', conf);
        t.fail("Address without name doesn't fail.");
    } catch (ex) {
        t.is(ex, 'Field strField should be an email.');
    }

    try {
        await validateEmail('asd@.asd', conf);
        t.fail("Address without domain doesn't fail.");
    } catch (ex) {
        t.is(ex, 'Field strField should be an email.');
    }
});

test('isEmail, if not a string is given, ignores', async (t) => {
    const validateEmail = isEmail();

    await validateEmail(8 as any, conf);
    await validateEmail(NaN as any, conf);
    await validateEmail(true as any, conf);
    await validateEmail([] as any, conf);
    await validateEmail(['a', 's', 'd', '@', 'a', 's', 'd', '.', 'a', 's', 'd'] as any, conf);
    await validateEmail({} as any, conf);
    await validateEmail(undefined as any, conf);
    await validateEmail(null as any, conf);

    t.pass();
});
