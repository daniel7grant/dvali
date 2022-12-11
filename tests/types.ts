import { describe, expect, test } from '@jest/globals';
import { SyncValidatorFunction, ValidatorFunction } from '../src/types';
import validate from '../src/validate';

const isString: SyncValidatorFunction<unknown, string> = (val, c) => {
    if (typeof val === 'string') {
        return val;
    } else {
        throw new Error('Not a string.');
    }
};

const toNumber: SyncValidatorFunction<string, number> = (val, c) => {
    return Number.parseInt(val);
};

const intoString: SyncValidatorFunction<number, string> = (val, c) => {
    return val.toString();
};

const isStringP: ValidatorFunction<unknown, string> = (val, c) => {
    if (typeof val === 'string') return Promise.resolve(val);
    else return Promise.reject();
};

const toNumberP: ValidatorFunction<string, number> = (val, c) => {
    return Promise.resolve(Number.parseInt(val));
};

const intoStringP: ValidatorFunction<number, string> = (val, c) => {
    return Promise.resolve(val.toString());
};

test('sync validator function returns type without promise', () => {
    const validateWithSyncFunction = validate(isString);
    const vfn: string = validateWithSyncFunction('');
});
test('sync validator function array returns transformed type without promise', () => {
    const validateWithSyncFunction1 = validate([isString]);
    const vlist1: string = validateWithSyncFunction1('');

    const validateWithSyncFunction2 = validate([isString, toNumber]);
    const vlist2: number = validateWithSyncFunction2('');

    const validateWithSyncFunction3 = validate([isString, toNumber, intoString]);
    const vlist3: string = validateWithSyncFunction3('');
});
test('sync validator object returns object type without promise', () => {
    const validateWithObject = validate({ a: [isString, toNumber, intoString], b: isString });
    const vobj: { a: string; b: string } = validateWithObject({ a: '', b: '' });
});
test('sync nested validator object return nested object without promise', () => {
    const validateWithObject = validate({ a: { c: isString }, b: isString });
    const vdobj: { a: { c: string }; b: string } = validateWithObject({ a: { c: '' }, b: '' });
});

test('async validator function returns type with promise', () => {
    const validateWithAsyncFunction = validate(isStringP);
    const vfnp: Promise<string> = validateWithAsyncFunction('');
});
test('async validator function array returns type with promise', () => {
    const validateWithAsyncFunction1 = validate([isStringP]);
    const vlist1p: Promise<string> = validateWithAsyncFunction1('');
   
    const validateWithAsyncFunction2 = validate([isStringP, toNumberP]);
    const vlist2p: Promise<number> = validateWithAsyncFunction2('');
   
    const validateWithAsyncFunction3 = validate([isStringP, toNumberP, intoStringP]);
    const vlist3p: Promise<string> = validateWithAsyncFunction3('');
});
test('async validator object returns object type with promise', () => {
    const validateWithAsyncObject = validate({ a: [isStringP, toNumberP, intoStringP], b: isStringP });
    const vobjp: Promise<{ a: string; b: string }> = validateWithAsyncObject({ a: '', b: '' });
});
test('async nested validator object returns object type with promise', () => {
    const validateWithAsyncNestedObject = validate({ a: { c: isStringP }, b: isStringP });
    const vdobjp: Promise<{ a: { c: string }; b: string }> = validateWithAsyncNestedObject({ a: { c: '' }, b: '' });
});

test('mixed validator function array returns type with promise', () => {
    const validateWithMixedFunction21 = validate([isString, toNumberP]);
    const vlist2m1: Promise<number> = validateWithMixedFunction21('');

    const validateWithMixedFunction22 = validate([isStringP, toNumber]);
    const vlist2m2: Promise<number> = validateWithMixedFunction22('');
   
    const validateWithMixedFunction31 = validate([isStringP, toNumber, intoStringP]);
    const vlist3m1: Promise<string> = validateWithMixedFunction31('');

    const validateWithMixedFunction32 = validate([isStringP, toNumber, intoStringP]);
    const vlist3m2: Promise<string> = validateWithMixedFunction32('');
});
test('mixed validator object returns object type with promise', () => {
    const validateWithMixedObject1 = validate({ a: [isString, toNumber, intoStringP], b: isStringP });
    const vobjm1: Promise<{ a: string; b: string }> = validateWithMixedObject1({ a: '', b: '' });

    const validateWithMixedObject2 = validate({ a: [isStringP, toNumberP, intoString], b: isStringP });
    const vobjm2: Promise<{ a: string; b: string }> = validateWithMixedObject2({ a: '', b: '' });

    const validateWithMixedObject3 = validate({ a: [isString, toNumber, intoString], b: isStringP });
    const vobjm3: Promise<{ a: string; b: string }> = validateWithMixedObject3({ a: '', b: '' });

    const validateWithMixedObject4 = validate({ a: [isString, toNumber, intoStringP], b: isString });
    const vobjm4: Promise<{ a: string; b: string }> = validateWithMixedObject4({ a: '', b: '' });
});
test('mixed nested validator object returns object type with promise', () => {
    const validateWithAsyncNestedObject1 = validate({ a: { c: isString }, b: isStringP });
    const vdobjm1: Promise<{ a: { c: string }; b: string }> = validateWithAsyncNestedObject1({ a: { c: '' }, b: '' });

    const validateWithAsyncNestedObject2 = validate({ a: { c: isStringP }, b: isString });
    const vdobjm2: Promise<{ a: { c: string }; b: string }> = validateWithAsyncNestedObject2({ a: { c: '' }, b: '' });
});


test('inner sync validator function returns inner type', () => {
    const validateWithSyncInnerFunction = validate(validate(isString));
    const vfnsi: string = validateWithSyncInnerFunction('');
});

test('inner async validator function returns inner type', () => {
    const validateWithInnerFunction = validate(validate(isStringP));
    const vfnai: Promise<string> = validateWithInnerFunction('');
});
test('inner validator function array returns inner type', () => {
    const validateWithInnerFunction11 = validate([validate(isString)]);
    const vlist1i1: Promise<string> = validateWithInnerFunction11('');

    const validateWithInnerFunction12 = validate([validate(isStringP)]);
    const vlist1i2: Promise<string> = validateWithInnerFunction12('');

    const validateWithInnerFunction13 = validate(validate([isStringP]));
    const vlist1i3: Promise<string> = validateWithInnerFunction13('');
});
test('inner validator object returns inner object type', () => {
    const validateWithInnerObject1 = validate({ a: validate(isStringP), b: isStringP });
    const vobji1: Promise<{ a: string; b: string }> = validateWithInnerObject1({ a: '', b: '' });

    const validateWithInnerObject2 = validate({ a: validate(isString), b: isStringP });
    const vobji2: Promise<{ a: string; b: string }> = validateWithInnerObject2({ a: '', b: '' });

    const validateWithInnerObject3 = validate({ a: validate(isString), b: isString });
    const vobji3: { a: string; b: string } = validateWithInnerObject3({ a: '', b: '' });
});
test('inner nested validator object returns inner object type', () => {
    const validateWithInnerNestedObject1 = validate({ a: { c: validate(isStringP) }, b: isStringP });
    const vdobji1: Promise<{ a: { c: string }; b: string }> = validateWithInnerNestedObject1({ a: { c: '' }, b: '' });

    const validateWithInnerNestedObject2 = validate({ a: { c: validate(isString) }, b: isStringP });
    const vdobji2: Promise<{ a: { c: string }; b: string }> = validateWithInnerNestedObject2({ a: { c: '' }, b: '' });

    const validateWithInnerNestedObject3 = validate({ a: { c: isStringP }, b: validate(isStringP) });
    const vdobji3: Promise<{ a: { c: string }; b: string }> = validateWithInnerNestedObject3({ a: { c: '' }, b: '' });
});