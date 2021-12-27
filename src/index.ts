import validate from './validate';

// Generic validators
import arrayOf from './validators/arrayOf';
import bail from './validators/bail';
import equals from './validators/equals';
import oneOf from './validators/oneOf';
import optional from './validators/optional';

// Validator helpers
import validateCondition from './validators/validateCondition';
import validateRegex from './validators/validateRegex';

// Boolean validators
import falsey from './validators/boolean/falsey';
import isBool from './validators/boolean/isBool';
import truthy from './validators/boolean/truthy';
import toBool from './validators/boolean/toBool';
import tryBool from './validators/boolean/tryBool';

// Date validators
import after from './validators/date/after';
import before from './validators/date/before';
import inRange from './validators/date/inRange';
import isDate from './validators/date/isDate';
import toDate from './validators/date/toDate';
import tryDate from './validators/date/tryDate';

// Number validators
import between from './validators/number/between';
import closeTo from './validators/number/closeTo';
import gte from './validators/number/gte';
import gt from './validators/number/gt';
import isInt from './validators/number/isInt';
import isMultipleOf from './validators/number/isMultipleOf';
import isNumber from './validators/number/isNumber';
import lte from './validators/number/lte';
import lt from './validators/number/lt';
import toNumber from './validators/number/toNumber';
import toInt from './validators/number/toInt';
import tryNumber from './validators/number/tryNumber';
import tryInt from './validators/number/tryInt';

// String validators
import betweenLength from './validators/string/betweenLength';
import insensitiveEquals from './validators/string/insensitiveEquals';
import isEmail from './validators/string/isEmail';
import isString from './validators/string/isString';
import isUrl from './validators/string/isUrl';
import length from './validators/string/length';
import maxLength from './validators/string/maxLength';
import minLength from './validators/string/minLength';
import toString from './validators/string/toString';

// Number transformers
import ceil from './transformers/number/ceil';
import clamp from './transformers/number/clamp';
import floor from './transformers/number/floor';
import round from './transformers/number/round';
import toMultipleOf from './transformers/number/toMultipleOf';

// String transformers
import lower from './transformers/string/lower';
import normalize from './transformers/string/normalize';
import trim from './transformers/string/trim';
import truncate from './transformers/string/truncate';
import upper from './transformers/string/upper';

import {
    Failure,
    Ignore,
    FailureFunction,
    Success,
    Validator,
    ValidatorConfiguration,
    ValidatorFunction,
    ValidatorObject,
    ValidatorState,
} from './types';

export type {
    FailureFunction,
    Validator,
    ValidatorConfiguration,
    ValidatorFunction,
    ValidatorObject,
    ValidatorState,
};

export {
    Failure,
    Ignore,
    Success,
    validate,
    arrayOf,
    bail,
    falsey,
    isBool,
    truthy,
    toBool,
    tryBool,
    after,
    before,
    inRange,
    isDate,
    toDate,
    tryDate,
    equals,
    between,
    closeTo,
    gte,
    gt,
    isInt,
    isMultipleOf,
    isNumber,
    lte,
    lt,
    toNumber,
    toInt,
    tryNumber,
    tryInt,
    oneOf,
    optional,
    betweenLength,
    insensitiveEquals,
    isEmail,
    isString,
    isUrl,
    length,
    maxLength,
    minLength,
    toString,
    validateCondition,
    validateRegex,
    ceil,
    clamp,
    floor,
    round,
    toMultipleOf,
    lower,
    normalize,
    trim,
    truncate,
    upper,
};

export default validate;
