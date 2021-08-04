# Dvali

Simple, extensible, functional validation library written in TypeScript

<!-- TOC -->

<!-- ## Why use this library -->

## Get started

<!--
To get started, install the `dvali` package with npm:

```
npm install dvali
```
-->

### Validation functions

In the heart of Dvali **validation functions** lie. A validation function is any async function that returns when the given data is valid and throws an error when it isn't. You can use the exported functions as-is:

```js
import { isEmail } from "dvali";

const validateEmail = isEmail();

await validateEmail("asd@asd.asd");  // => return "asd@asd.asd"
await validateEmail("notanemail");   // => throw "Field should be a valid email."
```

...but you usually will want to use it with the `validate` function. This can take one validator, an array of validators or most importantly, plain objects of validators:

```js
import validate, { isString, isEmail, minLength } from "dvali";

const validateEmail = validate(isEmail()); // equivalent to the previous example

const validatePassword = validate([isString(), minLength(8)]); // this will only return if all of them succeeds, and collects all failures

const validateUser = validateUser({
	// use them
	email: [isString(), isEmail()],
	// compose them
	password: validatePassword,
	// to any depth
	address: {
	    city: isString(),
        street: isString()
    },
});

const validatedUser = await validateUser({
    email: "jdoe@example.net",
	password: "asdasd69",
	address:  {
	    city: "Washington DC",
        street: "Pennsylvania Avenue"
	},
	additionalProperties: "stripped"
}); // => return { email: "jdoe@example.net", password: "asdasd69",	address:  { city: "Washington DC", street: "Pennsylvania Avenue" } }

// ...and you get the correct TypeScript types too!
// typeof validatedUser => { email: string; password: string; address: { city: string; street: string; } }
```

What you have to notice is that the `validate` function returns the validated object with all additional keys stripped out. Otherwise, when the object is invalid, it returns a list of errors.

There is a list of validation functions in the core library for the most common use-cases. Since validation functions are independent and pure, these can be imported one by one, not increasing your bundle sizes dramatically.

### Bring your own validator

What makes validation functions very cool is that it is extremely easy to write one. You simply have to create an async function (or any Promise-returning function) and return undefined or the value if it is valid, and throw a string error if anything is wrong.

Let's see this in action! For example, let's write a function that checks if a user with the given email already exists.

```js
import db from "mycooldbpackage";
import validate from "dvali";

const isUniqueEmail = () => async function (email, conf) {
	const exists = await db.users.find({ email }); // User | null
	if (!exists) {
		return;
	}
	throw "This email already in use. Try your alternate address."
}

const validateRegistration = validate({
    email: [isString(), isUniqueEmail()]
});
```

What you might notice is the extra parentheses before the async part: in Dvali it is customary to wrap the validator in an extra function. This allows to be consistent with other validation functions that need parameters (`minLength` for example).

To make this `isUniqueEmail` validation function more expressive, we can use the `Success`, `Failure` and `Ignore` macros, exported from the library:

```js
import validate, { Success, Failure, Ignore } from "dvali";

const isUniqueEmail = () => async function (email, conf) {
	if (typeof email !== "string") {
		return Ignore();
	}
	const exists = await db.users.find({ email });
	if (!exists) {
		return Success();
	}
	return Failure("This email already in use. Try your alternate address.");
}
```

Why use this `Ignore` call? Composability is very important in Dvali, one function should only do one thing (but do that thing well). In this case, we let the `isString` function handle whether the email is a string, and our function only proceeds if it's valid. This is useful in cases like optional fields, when we want to the validation to pass, even if the tested value is undefined.

To make writing validation functions easier, there are several helpers in the core library for example `validateCondition` for testing simple conditions, or `validateRegex` for testing against a regular expression. Before writing your own validation function for everything, check these out!

### Sanitize and transform

For now we only returned undefined when our validation passed, but an important detail is that you can change your value if you return something else. These functions usually called **sanitization** or **transform functions**.

To go forth with our registration theme, check this feature out with a sanitization function that hashes the password:

```js
import bcrypt from "bcrypt";
import validate from "dvali";

const hash = () => async function (password, conf) {
	if (typeof password !== "string") {
		return Ignore();
	}
	const hashedPassword = await bcrypt.hash(password, 8);
	return Success(hashedPassword);
	// ... or just return the Promise:
	// return bcrypt.hash(password, 8);
}

const validateRegistration = validate({
    email: [isString(), isUniqueEmail()],
	password: [isString(), minLength(8), hash()]
});

await validateRegistration({
    email: "asd@asd.asd",
	password: "asdasd69"
}); // => { email: "asd@asd.asd", password: "$2b$08$4S0b.0ut..." }
```

One thing you have to note is that validation and sanitization functions are applied serially: so make sure to figure out a correct order first. For example if the `minLength` and `hash` functions are swapped, the `minLength` will validate the hashed string's length, and therefore will always succeed. Failed validations does not change the value, so in that case the previous value willl be used.

The great part about these validation functions is you can achieve complex checks and modifications, while remain reusable, composable and easily testable.