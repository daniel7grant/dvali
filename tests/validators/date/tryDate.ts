import test from 'ava';
import { ValidatorConfiguration } from '../../../src/types';
import tryDate from '../../../src/validators/date/tryDate';

const conf: ValidatorConfiguration = {
    name: 'dateField',
    original: {},
    path: [],
    parent: {},
};

test('tryDate when date, string or number is passed returns the date', async (t) => {
    const sanitizeDate = tryDate();

    const dateString = '2021-08-27';
    const date = new Date(dateString);

    const dateByDate = await sanitizeDate(date, conf);
    t.is(dateByDate?.getTime(), date.getTime());
    const dateByNumber = await sanitizeDate(date.getTime() as any, conf);
    t.is(dateByNumber?.getTime(), date.getTime());
    const dateByString = await sanitizeDate(dateString as any, conf);
    t.is(dateByString?.getTime(), date.getTime());
});

test('tryDate when invalid date is passed fails', async (t) => {
    const sanitizeDate = tryDate();

    const dateString = 'invalid';
    const date = new Date(dateString);
    try {
        await sanitizeDate(date, conf);
        t.fail("Invalid date for date doesn't fail.");
    } catch (ex) {
        t.is(ex, 'Field dateField should be a valid date.');
    }

    try {
        await sanitizeDate(dateString as any, conf);
        t.fail("Invalid datestring for date doesn't fail.");
    } catch (ex) {
        t.is(ex, 'Field dateField should be a valid date.');
    }
});

test('tryDate when other data is passed fails', async (t) => {
    const sanitizeDate = tryDate();

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
