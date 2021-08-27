import test from 'ava';
import { ValidatorConfiguration } from '../../../src/types';
import isDate from '../../../src/validators/date/isDate';

const conf: ValidatorConfiguration = {
    name: 'dateField',
    original: {},
    path: [],
    parent: {},
};

test('isDate when date is passed returns successfully', async (t) => {
    const sanitizeDate = isDate();

    const dateString = '2021-08-27';
    const date = new Date(dateString);

    await sanitizeDate(date, conf);

    t.pass();
});

test('isDate when invalid date is passed fails', async (t) => {
    const sanitizeDate = isDate();

    const dateString = 'invalid';
    const date = new Date(dateString);
    try {
        await sanitizeDate(date, conf);
        t.fail("Invalid date for date doesn't fail.");
    } catch (ex) {
        t.is(ex, 'Field dateField should be a valid date.');
    }
});

test('isDate when other data is passed fails', async (t) => {
    const sanitizeDate = isDate();

    try {
        await sanitizeDate({} as any, conf);
        t.fail("Object as date doesn't fail.");
    } catch (ex) {
        t.is(ex, 'Field dateField should be a valid date.');
    }

    try {
        await sanitizeDate([] as any, conf);
        t.fail("Array as date doesn't fail.");
    } catch (ex) {
        t.is(ex, 'Field dateField should be a valid date.');
    }
});
