import test from 'ava';
import { Failure, Success, ValidatorConfiguration, ValidatorFunction } from '../../src/types';
import validate from '../../src/validate';
import bail from '../../src/validators/bail';

const conf: ValidatorConfiguration = {
    name: 'field',
    original: {},
    parent: {},
    path: [],
};

test('bail runs over each test if they are not failing', async (t) => {
    let i = 0;

    const increment = (): ValidatorFunction<void> => async () => {
        i += 1;
        return Success();
    };

	// To test whether it works with returning value
    const increment2 = (): ValidatorFunction<void> => async (value) => {
        i += 1;
        return Success(value);
    };

    const validateBail = validate(bail([increment(), increment2(), increment()]));

    await validateBail(null);
    t.is(i, 3);
});

test('bail stops after first failing test', async (t) => {
    let i = 0;

    const failIncrement = (): ValidatorFunction<void> => async () => {
        i += 1;
        return Failure('Incrementation failed.');
    };

    const validateBail = validate(bail([failIncrement(), failIncrement(), failIncrement()]));

    try {
        await validateBail(null);
        t.fail('Failing validation passed.');
    } catch (ex) {
        t.deepEqual(ex, ['Incrementation failed.']);
        t.is(i, 1);
    }
});

test('bail just passes to validate if the passed value is not an array', async (t) => {
    const increment =
        (): ValidatorFunction<boolean> =>
        async (value) => {
            if (value) {
                return Success();
            } else {
                return Failure("This shouldn't pass.");
            }
        };

    const validateBail = validate(bail(increment() as any));

    t.is(await validateBail(true), true);

    try {
		await validateBail(false);
    } catch (ex) {
        t.deepEqual(ex, ["This shouldn't pass."]);
    }
});
