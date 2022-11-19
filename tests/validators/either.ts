import { expect, test } from '@jest/globals';
import either from '../../src/validators/either';
import validate from '../../src/validate';
import { Failure, Success, ValidatorFunction } from '../../src/types';

const testSuccessfulValidation = (): ValidatorFunction<unknown, unknown> =>
    async function (_value, _conf) {
        return Success();
    };

const testFailingValidation = (i: number): ValidatorFunction<unknown, unknown> =>
    async function (_value, _conf) {
        return Failure(`test ${i} failed`);
    };

const testTransformingValidation = (): ValidatorFunction<number, unknown> =>
    async function (value, _conf) {
        return Success(value + 1);
    };

test('either function passes if both of the two validation passes', async () => {
    const value = 1;
    const validateTest = validate(either([testSuccessfulValidation(), testSuccessfulValidation()]));

    await expect(validateTest(value)).resolves.toEqual(value);
});

test('either function passes if any of the two validation passes', async () => {
    const value = 1;
    const validateTest = validate(either([testSuccessfulValidation(), testFailingValidation(1)]));

    await expect(validateTest(value)).resolves.toEqual(value);
});

test('either function resolves to first if the first is transformation', async () => {
    const value = 1;
    const validateTest = validate(
        either([testTransformingValidation(), testSuccessfulValidation()])
    );

    await expect(validateTest(value)).resolves.toEqual(value + 1);
});

test('either function resolves to itself if the second one is a transformation', async () => {
    const value = 1;
    const validateTest = validate(
        either([testSuccessfulValidation(), testTransformingValidation()])
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

test('either function throws error if both of the two validation fails', async () => {
    const value = 1;
    const validateTest = validate(either([testFailingValidation(1), testFailingValidation(2)]));

    try {
        await validateTest(value);
    } catch (err) {
        expect(err).toEqual(['test 1 failed', 'test 2 failed']);
    }
});
