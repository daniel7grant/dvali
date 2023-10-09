import { describe, expect, test } from '@jest/globals';
import { SyncValidatorFunction, ValidatorConfiguration, ValidatorFunction } from '../../src/types';
import validate from '../../src/validate';
import bail from '../../src/validators/bail';

const conf: ValidatorConfiguration = {
    name: 'field',
    original: {},
    parent: {},
    path: [],
};

test('bail runs over each sync test if they are not failing', async () => {
    let i = 0;

    const increment = (): SyncValidatorFunction<unknown, unknown> => (value) => {
        i += 1;
        return value;
    };

    const validateBail = validate(bail([increment(), increment(), increment()]));

    expect(validateBail(null)).toBe(null);
    expect(i).toBe(3);
});

test('bail runs over each async test if they are not failing', async () => {
    let i = 0;

    const increment = (): ValidatorFunction<unknown, unknown> => async (value) => {
        i += 1;
        return value;
    };

    const validateBail = validate(bail([increment(), increment(), increment()]));

    await expect(validateBail(null)).resolves.toBe(null);
    expect(i).toBe(3);
});

test('bail runs over each mixed test if they are not failing', async () => {
    let i = 0;

	const increment = (): SyncValidatorFunction<unknown, unknown> => (value) => {
        i += 1;
        return value;
    };

    const incrementP = (): ValidatorFunction<unknown, unknown> => async (value) => {
        i += 1;
        return value;
    };

    const validateBail = validate(bail([increment(), incrementP()]));

    await expect(validateBail(null)).resolves.toBe(null);
    expect(i).toBe(2);

	i = 0
    const validateBail2 = validate(bail([incrementP(), increment()]));

    await expect(validateBail2(null)).resolves.toBe(null);
    expect(i).toBe(2);
});

test('bail stops after first failing sync test', async () => {
    let i = 0;

	const increment = (): SyncValidatorFunction<unknown, unknown> => (value) => {
        i += 1;
        return value;
    };

    const failIncrement = (): SyncValidatorFunction<unknown, unknown> => () => {
        i += 1;
        throw 'Incrementation failed.'
    };

    const validateBail = validate(bail([increment(), failIncrement(), failIncrement()]));

    try {
        validateBail(null);
    } catch (err) {
        expect(err).toEqual(['Incrementation failed.']);
    }
    expect(i).toBe(2);
});

test('bail stops after first failing async test', async () => {
    let i = 0;

    const increment = (): ValidatorFunction<unknown, unknown> => async (value) => {
        i += 1;
        return value;
    };

    const failIncrement = (): ValidatorFunction<unknown, unknown> => async () => {
        i += 1;
        throw 'Incrementation failed.'
    };

    const validateBail = validate(bail([increment(), failIncrement(), failIncrement()]));

    try {
        await validateBail(null);
    } catch (err) {
        expect(err).toEqual(['Incrementation failed.']);
    }
    expect(i).toBe(2);
});

test('bail stops after first failing test in mixed tests', async () => {
    let i = 0;

    const increment = (): SyncValidatorFunction<unknown, unknown> => (value) => {
        i += 1;
        return value;
    };

    const failIncrement = (): SyncValidatorFunction<unknown, unknown> => () => {
        i += 1;
        throw 'Incrementation failed.'
    };

    const incrementP = (): ValidatorFunction<unknown, unknown> => async (value) => {
        i += 1;
        return value;
    };

    const failIncrementP = (): ValidatorFunction<unknown, unknown> => async () => {
        i += 1;
        throw 'Incrementation failed.'
    };

    const validateBail1 = validate(bail([increment(), failIncrementP(), failIncrement()]));
    try {
        await validateBail1(null);
    } catch (err) {
        expect(err).toEqual(['Incrementation failed.']);
    }
    expect(i).toBe(2);

	i = 0;
    const validateBail2 = validate(bail([increment(), failIncrement(), failIncrementP()]));
    try {
        await validateBail2(null);
    } catch (err) {
        expect(err).toEqual(['Incrementation failed.']);
    }
    expect(i).toBe(2);

	i = 0;
    const validateBail3 = validate(bail([incrementP(), failIncrement(), failIncrementP()]));
    try {
        await validateBail3(null);
    } catch (err) {
        expect(err).toEqual(['Incrementation failed.']);
    }
    expect(i).toBe(2);
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
