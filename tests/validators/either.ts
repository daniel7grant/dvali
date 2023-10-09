import { expect, test } from '@jest/globals';
import either from '../../src/validators/either';
import validate from '../../src/validate';
import { SyncValidatorFunction, ValidatorFunction } from '../../src/types';

const testSuccessfulStringValidation = (): SyncValidatorFunction<string, string> =>
    function (value, _conf) {
        return value;
    };

const testSuccessfulNumberValidation = (): SyncValidatorFunction<number, number> =>
    function (value, _conf) {
        return value;
    };

const testSuccessfulStringValidationP = (): ValidatorFunction<string, string> =>
    async function (value, _conf) {
        return value;
    };

const testSuccessfulNumberValidationP = (): ValidatorFunction<number, number> =>
    async function (value, _conf) {
        return value;
    };

const testFailingValidation = (i: number): SyncValidatorFunction<number, number> =>
    function (_value, _conf) {
        throw `test ${i} failed`;
    };

const testFailingValidationP = (i: number): ValidatorFunction<number, number> =>
    async function (_value, _conf) {
        throw `test ${i} failed`;
    };

const testTransformingValidation = (): ValidatorFunction<number, number> =>
    async function (value, _conf) {
        return value + 1;
    };

test('either function passes if both of the two sync validation passes', async () => {
    const value = 1;
    const validateTest = validate(
        either([testSuccessfulNumberValidation(), testSuccessfulNumberValidation()])
    );
    const result: number = validateTest(value);
    expect(result).toEqual(value);
});

test('either function passes if both of the two async validation passes', async () => {
    const value = 1;
    const validateTest = validate(
        either([testSuccessfulNumberValidationP(), testSuccessfulNumberValidationP()])
    );
    const result: Promise<number> = validateTest(value);
    await expect(result).resolves.toEqual(value);
});

test('either function passes if either of the two sync validation passes', async () => {
    const value = 1;
    const validateTest = validate(either([testSuccessfulNumberValidation(), testSuccessfulStringValidation()]));
    const result = validateTest(value);
	// TODO: this type doesn't work
    // const result: string | number = validateTest(value);
    expect(result).toEqual(value);
});

test('either function passes if both of the two async validation passes', async () => {
    const value = 1;
    const validateTest = validate(
        either([testSuccessfulNumberValidationP(), testSuccessfulStringValidationP()])
    );
    const result: Promise<string | number> = validateTest(value);
    await expect(result).resolves.toEqual(value);
});

test('either function resolves to first if the first is transformation', async () => {
    const value = 1;
    const validateTest = validate(
        either([testTransformingValidation(), testSuccessfulNumberValidationP()])
    );

    await expect(validateTest(value)).resolves.toEqual(value + 1);
});

test('either function resolves to itself if the second one is a transformation', async () => {
    const value = 1;
    const validateTest = validate(
        either([testSuccessfulNumberValidationP(), testTransformingValidation()])
    );

    await expect(validateTest(value)).resolves.toEqual(value);
});

test('either function resolves the transformation only once if both are a transformation', async () => {
    const value = 1;
    const validateTest = validate(
        either([testTransformingValidation(), testTransformingValidation()])
    );

    await expect(validateTest(value)).resolves.toEqual(value + 1);
});

test('either function throws error if both of the two sync validation fails', async () => {
    const value = 1;
    const validateTest = validate(either([testFailingValidation(1), testFailingValidation(2)]));

    try {
        validateTest(value);
    } catch (err) {
        expect(err).toEqual(['test 1 failed', 'test 2 failed']);
    }
});

test('either function throws error if both of the two async validation fails', async () => {
    const value = 1;
    const validateTest = validate(either([testFailingValidationP(1), testFailingValidationP(2)]));

    try {
        await validateTest(value);
    } catch (err) {
        expect(err).toEqual(['test 1 failed', 'test 2 failed']);
    }
});
