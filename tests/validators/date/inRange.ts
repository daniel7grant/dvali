import test from 'ava';
import { ValidatorConfiguration } from '../../../src/types';
import inRange from '../../../src/validators/date/inRange';

const conf: ValidatorConfiguration = {
    name: 'dateField',
    original: {},
    path: [],
    parent: {},
};

test('inRange when the date is between the two dates returns success', async (t) => {
    const begin = new Date('2000-01-01');
    const end = new Date('2099-12-31');
    const validateInRange = inRange(begin, end);

    await validateInRange(new Date('2000-01-02'), conf);
    await validateInRange(new Date('2021-08-27'), conf);
    await validateInRange(new Date('2099-01-01'), conf);

    t.pass();
});

test('inRange definition can convert from string or number', async (t) => {
    const validateInStringRange = inRange('2000-01-01', '2099-12-31');

    await validateInStringRange(new Date('2021-08-27'), conf);

    const validateInNumberRange = inRange(946684800000, 4102358400000);

    await validateInNumberRange(new Date('2021-08-27'), conf);

    t.pass();
});

test('inRange when the date is before, after or equal to the two dates, fails', async (t) => {
    const begin = new Date('2000-01-01');
    const end = new Date('2099-12-31');
    const validateInRange = inRange(begin, end);

    try {
        await validateInRange(new Date('1999-12-31'), conf);
        t.fail("Earlier date than range doesn't fail.");
    } catch (ex) {
        t.is(ex, `Field dateField should be between ${begin.toString()} and ${end.toString()}.`);
    }

    try {
        await validateInRange(new Date('2222-12-31'), conf);
        t.fail("Later date than range doesn't fail.");
    } catch (ex) {
        t.is(ex, `Field dateField should be between ${begin.toString()} and ${end.toString()}.`);
    }

    try {
        await validateInRange(new Date('2000-01-01'), conf);
        t.fail("Date equal to lower range doesn't fail.");
    } catch (ex) {
        t.is(ex, `Field dateField should be between ${begin.toString()} and ${end.toString()}.`);
    }

    try {
        await validateInRange(new Date('2099-12-31'), conf);
        t.fail("Date equal to upper range doesn't fail.");
    } catch (ex) {
        t.is(ex, `Field dateField should be between ${begin.toString()} and ${end.toString()}.`);
    }

    try {
        await validateInRange(new Date('invalid'), conf);
        t.fail("Invalid date doesn't fail.");
    } catch (ex) {
        t.is(ex, `Field dateField should be between ${begin.toString()} and ${end.toString()}.`);
    }
});

test('inRange, when minInclusive is set, returns success for lower limit and fails for upper', async (t) => {
    const begin = new Date('2000-01-01');
    const end = new Date('2099-12-31');
    const validateInRange = inRange(begin, end, { minInclusive: true });

    await validateInRange(new Date('2000-01-01'), conf);

    try {
        await validateInRange(new Date('2099-12-31'), conf);
    } catch (ex) {
        t.is(ex, `Field dateField should be between ${begin.toString()} and ${end.toString()}.`);
    }

    t.pass();
});

test('inRange, when maxInclusive is set, fails for lower limit and returns success for upper', async (t) => {
    const begin = new Date('2000-01-01');
    const end = new Date('2099-12-31');
    const validateInRange = inRange(begin, end, { maxInclusive: true });

    try {
        await validateInRange(new Date('2000-01-01'), conf);
    } catch (ex) {
        t.is(ex, `Field dateField should be between ${begin.toString()} and ${end.toString()}.`);
    }

    await validateInRange(new Date('2099-12-31'), conf);

    t.pass();
});

test('inRange, when both inclusives are set, returns success for and upper lower limit', async (t) => {
    const begin = new Date('2000-01-01');
    const end = new Date('2099-12-31');
    const validateInRange = inRange(begin, end, { minInclusive: true, maxInclusive: true });

    await validateInRange(new Date('2000-01-01'), conf);
    await validateInRange(new Date('2099-12-31'), conf);

    t.pass();
});

test('inRange ignores non-date inputs', async (t) => {
    const begin = new Date('2000-01-01');
    const end = new Date('2099-12-31');
    const validateInRange = inRange(begin, end);

    await validateInRange("string" as any, conf);
    await validateInRange(123 as any, conf);
    await validateInRange(NaN as any, conf);
    await validateInRange({} as any, conf);
    await validateInRange([] as any, conf);
    await validateInRange(null as any, conf);
    await validateInRange(undefined as any, conf);

    t.pass();    
});
