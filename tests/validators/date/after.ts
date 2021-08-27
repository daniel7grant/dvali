import test from 'ava';
import { ValidatorConfiguration } from '../../../src/types';
import after from '../../../src/validators/date/after';

const conf: ValidatorConfiguration = {
    name: 'dateField',
    original: {},
    path: [],
    parent: {},
};

test('after when the date is after the date returns success', async (t) => {
    const begin = new Date('2000-01-01');
    const validateInRange = after(begin);

    await validateInRange(new Date('2000-01-02'), conf);
    await validateInRange(new Date('2021-08-27'), conf);
    await validateInRange(new Date('2099-01-01'), conf);

    t.pass();
});


test('after definition can convert from string or number', async (t) => {
    const validateInStringRange = after('2000-01-01');

    await validateInStringRange(new Date('2021-08-27'), conf);

    const validateInNumberRange = after(946684800000);

    await validateInNumberRange(new Date('2021-08-27'), conf);

    t.pass();
});

test('after when the date is before or equal to the date, fails', async (t) => {
    const begin = new Date('2000-01-01');
    const validateInRange = after(begin);

    try {
        await validateInRange(new Date('1999-12-31'), conf);
        t.fail("Earlier date than range doesn't fail.");
    } catch (ex) {
        t.is(ex, `Field dateField should be after ${begin.toString()}.`);
    }

    try {
        await validateInRange(new Date('2000-01-01'), conf);
        t.fail("Date equal to range doesn't fail.");
    } catch (ex) {
        t.is(ex, `Field dateField should be after ${begin.toString()}.`);
    }

    try {
        await validateInRange(new Date('invalid'), conf);
        t.fail("Invalid date doesn't fail.");
    } catch (ex) {
        t.is(ex, `Field dateField should be after ${begin.toString()}.`);
    }
});

test('after, when both inclusives are set, returns success for and upper lower limit', async (t) => {
    const begin = new Date('2000-01-01');
    const validateInRange = after(begin, { inclusive: true });

    await validateInRange(new Date('2000-01-01'), conf);

    t.pass();
});

test('after ignores non-date inputs', async (t) => {
    const begin = new Date('2000-01-01');
    const validateInRange = after(begin);

    await validateInRange("string" as any, conf);
    await validateInRange(123 as any, conf);
    await validateInRange(NaN as any, conf);
    await validateInRange({} as any, conf);
    await validateInRange([] as any, conf);
    await validateInRange(null as any, conf);
    await validateInRange(undefined as any, conf);

    t.pass();    
});