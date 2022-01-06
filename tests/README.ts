import { describe, expect, test } from '@jest/globals';
import validate, {
    isString,
    isEmail,
    minLength,
    ValidatorFunction,
    Success,
    Failure,
    Ignore,
    Validator,
} from '../src/index';

test('README: Validation functions', async () => {
    const validatePassword = validate([isString(), minLength(8)]); // this will only return if all of them succeeds, and collects all failures

    const validateUser = validate({
        email: [isString(), isEmail()], // use them
        password: validatePassword, // compose them
        address: {
            city: isString(), // to any depth
            street: isString(),
        },
    });

    const validatedUser = await validateUser({
        email: 'jdoe@example.net',
        password: 'asdasd69',
        address: {
            city: 'Washington DC',
            street: 'Pennsylvania Avenue',
        },
        additionalProperties: 'stripped',
    });

    expect(validatedUser).toEqual({
        email: 'jdoe@example.net',
        password: 'asdasd69',
        address: { city: 'Washington DC', street: 'Pennsylvania Avenue' },
    });

    // Let's check for the expected type with some TypeScript magic
    type ExpectedType = {
        email: string;
        password: string;
        address: { city: string; street: string };
    };
    type AssertExpectedType<T> = T extends ExpectedType ? true : never;
    // This line shouldn't compile if the type is wrong
    const cond1: AssertExpectedType<typeof validatedUser> = true;
});

test('README: Bring your own validator - isUniqueEmail starting', async () => {
    // Mock database call
    const db = {
        users: {
            find: ({ email }: { email: string }) => {
                return Promise.resolve(email === 'asd@asd.asd' ? {} : null);
            },
        },
    };

    const isUniqueEmail = (): ValidatorFunction<string> =>
        async function (email, conf) {
            const exists = await db.users.find({ email }); // User | null
            if (!exists) {
                return;
            }
            throw 'This email already in use. Try your alternate address.';
        };

    const validateRegistration = validate({
        email: [isString(), isUniqueEmail()],
    });

    expect(await validateRegistration({ email: 'dsa@asd.asd' })).toEqual({ email: 'dsa@asd.asd' });
    try {
        await validateRegistration({ email: 'asd@asd.asd' });
    } catch (err) {
        expect(err).toEqual(['This email already in use. Try your alternate address.']);
    }
});

test('README: Bring your own validator - isUniqueEmail full', async () => {
    // Mock database call
    const db = {
        users: {
            find: ({ email }: { email: string }) => {
                return Promise.resolve(email === 'asd@asd.asd' ? {} : null);
            },
        },
    };

    const isUniqueEmail = (): ValidatorFunction<string> =>
        async function (email, conf) {
            if (typeof email !== 'string') {
                return Ignore();
            }
            const exists = await db.users.find({ email });
            if (!exists) {
                return Success();
            }
            return Failure('This email already in use. Try your alternate address.');
        };

    const validateRegistration = validate({
        email: [isString(), isUniqueEmail()],
    });

    const validatedRegistration = await validateRegistration({ email: 'dsa@asd.asd' });
    expect(validatedRegistration).toEqual({ email: 'dsa@asd.asd' });
    try {
        await validateRegistration({ email: 'asd@asd.asd' });
    } catch (err) {
        expect(err).toEqual(['This email already in use. Try your alternate address.']);
    }

    // Let's check for the expected type with some TypeScript magic
    type ExpectedType = {
        email: string;
    };
    type AssertExpectedType<T> = T extends ExpectedType ? true : never;
    // This line shouldn't compile if the type is wrong
    const cond1: AssertExpectedType<typeof validatedRegistration> = true;
});

test('README: Sanitize and transform - hash', async () => {
    // Mock database call
    const db = {
        users: {
            find: ({ email }: { email: string }) => {
                return Promise.resolve(email === 'asd@asd.asd' ? {} : null);
            },
        },
    };

    const isUniqueEmail = (): ValidatorFunction<string> =>
        async function (email, conf) {
            if (typeof email !== 'string') {
                return Ignore();
            }
            const exists = await db.users.find({ email });
            if (!exists) {
                return Success();
            }
            return Failure('This email already in use. Try your alternate address.');
        };

    // Mock bcrypt
    const bcrypt = {
        hash: (_: string, __: number) => {
            return Promise.resolve('$2b$08$4S0b.0ut...');
        },
    };

    const hash = (): ValidatorFunction<string> =>
        async function (password, conf) {
            if (typeof password !== 'string') {
                return Ignore();
            }
            const hashedPassword = await bcrypt.hash(password, 8);
            return Success(hashedPassword);
        };

    const validateRegistration = validate({
        email: [isString(), isUniqueEmail()],
        password: [isString(), minLength(8), hash()],
    });

    const validatedRegistration = await validateRegistration({
        email: 'asd2@asd.asd',
        password: 'asdasd69',
    });

    expect(validatedRegistration).toEqual({
        email: 'asd2@asd.asd',
        password: '$2b$08$4S0b.0ut...',
    });

    // Let's check for the expected type with some TypeScript magic
    type ExpectedType = {
        email: string;
        password: string;
    };
    type AssertExpectedType<T> = T extends ExpectedType ? true : never;
    // This line shouldn't compile if the type is wrong
    const cond1: AssertExpectedType<typeof validatedRegistration> = true;
});

test('README: Higher-order validators - confirmPassword', async () => {
    // Mock database call
    const db = {
        users: {
            find: ({ email }: { email: string }) => {
                return Promise.resolve(email === 'asd@asd.asd' ? {} : null);
            },
        },
    };

    const isUniqueEmail = (): ValidatorFunction<string> =>
        async function (email, conf) {
            if (typeof email !== 'string') {
                return Ignore();
            }
            const exists = await db.users.find({ email });
            if (!exists) {
                return Success();
            }
            return Failure('This email already in use. Try your alternate address.');
        };

    // Mock bcrypt
    const bcrypt = {
        hash: (_: string, __: number) => {
            return Promise.resolve('$2b$08$4S0b.0ut...');
        },
    };

    const hash = (): ValidatorFunction<string> =>
        async function (password, conf) {
            if (typeof password !== 'string') {
                return Ignore();
            }
            const hashedPassword = await bcrypt.hash(password, 8);
            return Success(hashedPassword);
        };

    const confirmPassword = <T>(validator: Validator<T>): ValidatorFunction<T> =>
        async function (user, conf) {
            if (!user?.password_confirm) {
                return Failure('You should confirm your password.');
            }
            if (user.password_confirm !== user.password) {
                return Failure('The two passwords do not match.');
            }
            return validate(validator)(user);
        };

    const validateRegistration = validate(
        confirmPassword({
            email: [isString(), isUniqueEmail()],
            password: [isString(), minLength(8), hash()],
        })
    );

    const validatedRegistration = await validateRegistration({
        email: 'asd2@asd.asd',
        password: 'asdasd69',
        password_confirm: 'asdasd69',
    });

    expect(validatedRegistration).toEqual({
        email: 'asd2@asd.asd',
        password: '$2b$08$4S0b.0ut...',
    });

    // Let's check for the expected type with some TypeScript magic
    type ExpectedType = {
        email: string;
        password: string;
    };
    type AssertExpectedType<T> = T extends ExpectedType ? true : never;
    // This line shouldn't compile if the type is wrong
    const cond1: AssertExpectedType<typeof validatedRegistration> = true;
});
