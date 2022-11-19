import { describe, expect, test } from '@jest/globals';
import { Failure, Success, ValidatorConfiguration, ValidatorFunction } from '../../src/types';
import validate from '../../src/validate';
import optional from '../../src/validators/optional';

const conf: ValidatorConfiguration = {
    name: 'optionalField',
    original: {},
    path: [],
    parent: {},
};

test('optional validator if value is undefined, returns successfully without calling the inner validator', async () => {
    let i = 0;
    const testValidation = (): ValidatorFunction<unknown, string> => async (value) => {
        i += 1;
        if (value) {
            return Success();
        }
        return Failure('This field is required.');
    };

    const validateFunctionOptional = validate({ field: optional(testValidation()) });
    expect(await validateFunctionOptional({})).toEqual({} as any);
    expect(i).toEqual(0);
    expect(await validateFunctionOptional({ field: 'string' })).toEqual({ field: 'string' });
    expect(i).toEqual(1);

    i = 0;

    const validateListOptional = validate({
        field: optional([testValidation(), testValidation()]),
    });
    expect(await validateListOptional({})).toEqual({} as any);
    expect(i).toEqual(0);
    expect(await validateListOptional({ field: 'string' })).toEqual({ field: 'string' });
    expect(i).toEqual(2);

    // Let's check for the expected type with some TypeScript magic
    const validatedOptional = await validateFunctionOptional({ field: 'string' });
    type ExpectedType = {
        field: string | undefined;
    };
    type AssertExpectedType<T> = T extends ExpectedType ? true : never;
    // This line shouldn't compile if the type is wrong
    const cond1: AssertExpectedType<typeof validatedOptional> = true;
});

test('optional validator without it, undefined fails', async () => {
    const testValidation = (): ValidatorFunction<unknown, string> => async (value) => {
        if (value) {
            return Success();
        }
        return Failure('This field is required.');
    };

    const validateNotOptional = validate({ field: testValidation() });
    await expect(validateNotOptional({ field: 'string' })).resolves.toEqual({ field: 'string' });
    try {
        await validateNotOptional({});
    } catch (err) {
        expect(err).toEqual(['This field is required.']);
    }
});
