import { describe, expect, test } from '@jest/globals';
import validate, {
    isString,
    isEmail,
    minLength,
    ValidatorFunction,
    Success,
    Failure,
    Validator,
    ValidatorObject,
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

    type ExpectedType = {
        email: string;
        password: string;
        address: { city: string; street: string };
    };
    const validatedUser: ExpectedType = validateUser({
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

    const isUniqueEmail = (): ValidatorFunction<string, string> =>
        async function (email, conf) {
            const exists = await db.users.find({ email }); // User | null
            if (!exists) {
                return email;
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

    const isUniqueEmail = (): ValidatorFunction<string, string> =>
        async function (email, conf) {
            const exists = await db.users.find({ email });
            if (!exists) {
                return Success(email);
            }
            return Failure('This email already in use. Try your alternate address.');
        };

    const validateRegistration = validate({
        email: [isString(), isUniqueEmail()],
    });

    type ExpectedType = {
        email: string;
    };
    const validatedRegistration: ExpectedType = await validateRegistration({ email: 'dsa@asd.asd' });
    expect(validatedRegistration).toEqual({ email: 'dsa@asd.asd' });
    try {
        await validateRegistration({ email: 'asd@asd.asd' });
    } catch (err) {
        expect(err).toEqual(['This email already in use. Try your alternate address.']);
    }
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

    const isUniqueEmail = (): ValidatorFunction<string, string> =>
        async function (email, conf) {
            const exists = await db.users.find({ email });
            if (!exists) {
                return Success(email);
            }
            return Failure('This email already in use. Try your alternate address.');
        };

    // Mock bcrypt
    const bcrypt = {
        hash: (_: string, __: number) => {
            return Promise.resolve('$2b$08$4S0b.0ut...');
        },
    };

    const hash = (): ValidatorFunction<string, string> =>
        async function (password, conf) {
            const hashedPassword = await bcrypt.hash(password, 8);
            return Success(hashedPassword);
        };

    const validateRegistration = validate({
        email: [isString(), isUniqueEmail()],
        password: [isString(), minLength(8), hash()],
    });

    type ExpectedType = {
        email: string;
        password: string;
    };
    const validatedRegistration: ExpectedType = await validateRegistration({
        email: 'asd2@asd.asd',
        password: 'asdasd69',
    });

    expect(validatedRegistration).toEqual({
        email: 'asd2@asd.asd',
        password: '$2b$08$4S0b.0ut...',
    });
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

    const isUniqueEmail = (): ValidatorFunction<string, string> =>
        async function (email, conf) {
            const exists = await db.users.find({ email });
            if (!exists) {
                return Success(email);
            }
            return Failure('This email already in use. Try your alternate address.');
        };

    // Mock bcrypt
    const bcrypt = {
        hash: (_: string, __: number) => {
            return Promise.resolve('$2b$08$4S0b.0ut...');
        },
    };

    const hash = (): ValidatorFunction<string, string> =>
        async function (password, conf) {
            const hashedPassword = await bcrypt.hash(password, 8);
            return Success(hashedPassword);
        };

    const confirmPassword = <
        I extends { email: string; password: string; password_confirm: string },
        O extends { email: string; password: string }
    >(
        validator: ValidatorObject<O>
    ): ValidatorFunction<I, O> =>
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

    type ExpectedType = {
        email: string;
        password: string;
    };
    const validatedRegistration: ExpectedType = await validateRegistration({
        email: 'asd2@asd.asd',
        password: 'asdasd69',
        password_confirm: 'asdasd69',
    });

    expect(validatedRegistration).toEqual({
        email: 'asd2@asd.asd',
        password: '$2b$08$4S0b.0ut...',
    });
});
