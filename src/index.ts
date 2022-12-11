import validate from './validate.js';

// Generic validators
import arrayOf from './validators/arrayOf.js';
import bail from './validators/bail.js';
import either from './validators/either.js';
import equals from './validators/equals.js';
import oneOf from './validators/oneOf.js';
import optional from './validators/optional.js';

// Validator helpers
import validateCondition from './validators/validateCondition.js';
import validateRegex from './validators/validateRegex.js';

// Boolean validators
import falsey from './validators/boolean/falsey.js';
import isBool from './validators/boolean/isBool.js';
import truthy from './validators/boolean/truthy.js';
import toBool from './validators/boolean/toBool.js';
import tryBool from './validators/boolean/tryBool.js';

// Date validators
import after from './validators/date/after.js';
import before from './validators/date/before.js';
import inRange from './validators/date/inRange.js';
import isDate from './validators/date/isDate.js';
import toDate from './validators/date/toDate.js';
import tryDate from './validators/date/tryDate.js';

// Number validators
import between from './validators/number/between.js';
import closeTo from './validators/number/closeTo.js';
import gte from './validators/number/gte.js';
import gt from './validators/number/gt.js';
import isInt from './validators/number/isInt.js';
import isMultipleOf from './validators/number/isMultipleOf.js';
import isNumber from './validators/number/isNumber.js';
import lte from './validators/number/lte.js';
import lt from './validators/number/lt.js';
import toNumber from './validators/number/toNumber.js';
import toInt from './validators/number/toInt.js';
import tryNumber from './validators/number/tryNumber.js';
import tryInt from './validators/number/tryInt.js';

// String validators
import betweenLength from './validators/string/betweenLength.js';
import insensitiveEquals from './validators/string/insensitiveEquals.js';
import isEmail from './validators/string/isEmail.js';
import isString from './validators/string/isString.js';
import isUrl from './validators/string/isUrl.js';
import length from './validators/string/length.js';
import maxLength from './validators/string/maxLength.js';
import minLength from './validators/string/minLength.js';
import toString from './validators/string/toString.js';

// Number transformers
import ceil from './transformers/number/ceil.js';
import clamp from './transformers/number/clamp.js';
import floor from './transformers/number/floor.js';
import round from './transformers/number/round.js';
import toMultipleOf from './transformers/number/toMultipleOf.js';

// String transformers
import lower from './transformers/string/lower.js';
import normalize from './transformers/string/normalize.js';
import trim from './transformers/string/trim.js';
import truncate from './transformers/string/truncate.js';
import upper from './transformers/string/upper.js';

import {
    FailureFunction,
    Validator,
    ValidatorConfiguration,
    ValidatorFunction,
    ValidatorObject,
    ValidatorState,
} from './types.js';

export type {
    FailureFunction,
    Validator,
    ValidatorConfiguration,
    ValidatorFunction,
    ValidatorObject,
    ValidatorState,
};

export {
    validate,
    arrayOf,
    bail,
    either,
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
