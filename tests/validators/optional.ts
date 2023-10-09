import { describe, expect, test } from '@jest/globals';
import { SyncValidatorFunction, ValidatorConfiguration, ValidatorFunction } from '../../src/types';
import validate from '../../src/validate';
import optional from '../../src/validators/optional';

test('optional sync validator if value is undefined returns successfully', async () => {
    let i = 0;
    const testValidation = (): SyncValidatorFunction<unknown, string> => (value) => {
        i += 1;
        if (value) {
            return value as string;
        }
        throw 'This field is required.';
    };

    const validateFunctionOptional = validate(optional([testValidation()]));
    expect(validateFunctionOptional(undefined)).toEqual(undefined);
    expect(i).toEqual(0);
    expect(validateFunctionOptional({ field: 'string' })).toEqual({ field: 'string' });
    expect(i).toEqual(1);
});

test('optional validator if value is undefined returns successfully', async () => {
    let i = 0;
    const testValidation = (): ValidatorFunction<unknown, string> => async (value) => {
        i += 1;
        if (value) {
            return value as string;
        }
        throw 'This field is required.';
    };

    const validateListOptional = validate({
        field: optional([testValidation(), testValidation()]),
    });
    expect(await validateListOptional({})).toEqual({} as any);
    expect(i).toEqual(0);
    expect(await validateListOptional({ field: 'string' })).toEqual({ field: 'string' });
    expect(i).toEqual(2);

    // Let's check for the expected type
    type ExpectedType = {
        field: string | undefined;
    };
    // const validatedType: ExpectedType = await validateFunctionOptional({ field: 'string' });
});

test('optional validator without it undefined fails', async () => {
    const testValidation = (): ValidatorFunction<unknown, string> => async (value) => {
        if (value) {
            return value as string;
        }
        throw 'This field is required.';
    };

    const validateNotOptional = validate({ field: testValidation() });
    await expect(validateNotOptional({ field: 'string' })).resolves.toEqual({ field: 'string' });
    try {
        await validateNotOptional({});
    } catch (err) {
        expect(err).toEqual(['This field is required.']);
    }
});
