import test from 'ava';
import { Failure, Success, ValidatorConfiguration, ValidatorFunction } from '../../src/types';
import validate from '../../src/validate';
import optional from '../../src/validators/optional';

const conf: ValidatorConfiguration = {
    name: 'optionalField',
    original: {},
    path: [],
    parent: {},
};

test('optional validator if value is undefined, returns successfully without calling the inner validator', async (t) => {
    let i = 0;
    const testValidation = (): ValidatorFunction<string> => async (value) => {
        i += 1;
        if (value) {
            return Success();
        }
        return Failure('This field is required.');
    };

    const validateFunctionOptional = validate({ field: optional(testValidation()) });
    t.deepEqual(await validateFunctionOptional({}), {} as any);
    t.deepEqual(i, 0);
    t.deepEqual(await validateFunctionOptional({ field: 'string' }), { field: 'string' });
    t.deepEqual(i, 1);

    i = 0;

    const validateListOptional = validate({
        field: optional([testValidation(), testValidation()]),
    });
    t.deepEqual(await validateListOptional({}), {} as any);
    t.deepEqual(i, 0);
    t.deepEqual(await validateListOptional({ field: 'string' }), { field: 'string' });
    t.deepEqual(i, 2);

    t.pass();

    // Let's check for the expected type with some TypeScript magic
    const validatedOptional = await validateFunctionOptional({ field: 'string' });
    type ExpectedType = {
        field: string | undefined;
    };
    type AssertExpectedType<T> = T extends ExpectedType ? true : never;
    // This line shouldn't compile if the type is wrong
    const cond1: AssertExpectedType<typeof validatedOptional> = true;
});

test('optional validator without it, undefined fails', async (t) => {
    const testValidation = (): ValidatorFunction<string> => async (value) => {
        if (value) {
            return Success();
        }
        return Failure('This field is required.');
    };

    try {
        const validateNotOptional = validate({ field: testValidation() });
        t.deepEqual(await validateNotOptional({ field: 'string' }), { field: 'string' });
        await validateNotOptional({});
        t.fail("Not optional doesn't fail.");
    } catch (ex) {
        t.deepEqual(ex, ['This field is required.']);
    }
});
