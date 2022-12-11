import { describe, expect, test } from '@jest/globals';
import { ValidatorConfiguration, ValidatorFunction } from '../../src/types';
import validate from '../../src/validate';
import bail from '../../src/validators/bail';

const conf: ValidatorConfiguration = {
    name: 'field',
    original: {},
    parent: {},
    path: [],
};

test('bail runs over each test if they are not failing', async () => {
    let i = 0;

    const increment = (): ValidatorFunction<unknown, unknown> => async (value) => {
        i += 1;
        return value;
    };

    // To test whether it works with returning value
    const increment2 = (): ValidatorFunction<unknown, unknown> => async (value) => {
        i += 1;
        return value;
    };

    const validateBail = validate(bail([increment(), increment2(), increment()]));

    await expect(validateBail(null)).resolves.toBe(null);
    expect(i).toBe(3);
});

test('bail stops after first failing test', async () => {
    let i = 0;

    const failIncrement = (): ValidatorFunction<unknown, unknown> => async () => {
        i += 1;
        throw 'Incrementation failed.'
    };

    const validateBail = validate(bail([failIncrement(), failIncrement(), failIncrement()]));

    try {
        await validateBail(null);
    } catch (err) {
        expect(err).toEqual(['Incrementation failed.']);
    }
    expect(i).toBe(1);
});

test('bail just passes to validate if the passed value is not an array', async () => {
    const increment = (): ValidatorFunction<unknown, unknown> => async (value) => {
        if (value) {
            return value;
        } else {
            throw "This shouldn't pass."
        }
    };

    const validateBail = validate(bail(increment() as any));

    await expect(validateBail(true)).resolves.toBe(true);
    try {
        await validateBail(false);
    } catch (err) {
        expect(err).toEqual(["This shouldn't pass."]);
    }
});
