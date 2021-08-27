import test from 'ava';
import { ValidatorConfiguration } from '../../../src/types';
import before from '../../../src/validators/date/before';

const conf: ValidatorConfiguration = {
    name: 'dateField',
    original: {},
    path: [],
    parent: {},
};

test('before when the date is before the date returns success', async (t) => {
    const end = new Date('2099-12-31');
    const validateInRange = before(end);

    await validateInRange(new Date('2000-01-02'), conf);
    await validateInRange(new Date('2021-08-27'), conf);
    await validateInRange(new Date('2099-01-01'), conf);

    t.pass();
});

test('before definition can convert from string or number', async (t) => {
    const validateInStringRange = before('2099-12-31');

    await validateInStringRange(new Date('2021-08-27'), conf);

    const validateInNumberRange = before(4102358400000);

    await validateInNumberRange(new Date('2021-08-27'), conf);

    t.pass();
});

test('before when the date is after or equal to the date, fails', async (t) => {
    const end = new Date('2099-12-31');
    const validateInRange = before(end);

    try {
        await validateInRange(new Date('2222-12-31'), conf);
        t.fail("Later date than range doesn't fail.");
    } catch (ex) {
        t.is(ex, `Field dateField should be before ${end.toString()}.`);
    }

    try {
        await validateInRange(new Date('2099-12-31'), conf);
        t.fail("Date equal to upper range doesn't fail.");
    } catch (ex) {
        t.is(ex, `Field dateField should be before ${end.toString()}.`);
    }

    try {
        await validateInRange(new Date('invalid'), conf);
        t.fail("Invalid date doesn't fail.");
    } catch (ex) {
        t.is(ex, `Field dateField should be before ${end.toString()}.`);
    }
});

test('before, when inclusive is set, returns success for limit', async (t) => {
    const end = new Date('2099-12-31');
    const validateInRange = before(end, { inclusive: true });

    await validateInRange(new Date('2099-12-31'), conf);

    t.pass();
});

test('before ignores non-date inputs', async (t) => {
    const end = new Date('2099-12-31');
    const validateInRange = before(end);

    await validateInRange("string" as any, conf);
    await validateInRange(123 as any, conf);
    await validateInRange(NaN as any, conf);
    await validateInRange({} as any, conf);
    await validateInRange([] as any, conf);
    await validateInRange(null as any, conf);
    await validateInRange(undefined as any, conf);

    t.pass();    
});
