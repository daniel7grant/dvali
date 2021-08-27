import validate from './validate';

// Generic validators
import arrayOf from './validators/arrayOf';
import equals from './validators/equals';
import oneOf from './validators/oneOf';

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
import betweenDates from './validators/date/betweenDates';
import isDate from './validators/date/isDate';
import toDate from './validators/date/toDate';
import tryDate from './validators/date/tryDate';

// Number validators
import between from './validators/number/between';
import closeTo from './validators/number/closeTo';
import gte from './validators/number/gte';
import gt from './validators/number/gt';
import isNumber from './validators/number/isNumber';
import lte from './validators/number/lte';
import lt from './validators/number/lt';
import toFloat from './validators/number/toFloat';
import toInt from './validators/number/toInt';
import tryFloat from './validators/number/tryFloat';
import tryInt from './validators/number/tryInt';

// String validators
import betweenLength from './validators/string/betweenLength';
import insensitiveEquals from './validators/string/insensitiveEquals';
import isEmail from './validators/string/isEmail';
import isIP from './validators/string/isIP';
import isString from './validators/string/isString';
import isUrl from './validators/string/isUrl';
import length from './validators/string/length';
import maxLength from './validators/string/maxLength';
import minLength from './validators/string/minLength';
import toString from './validators/string/toString';

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
    falsey,
    isBool,
    truthy,
    toBool,
    tryBool,
    after,
    before,
    betweenDates,
    isDate,
    toDate,
    tryDate,
    equals,
    between,
    closeTo,
    gte,
    gt,
    isNumber,
    lte,
    lt,
    toFloat,
    toInt,
    tryFloat,
    tryInt,
    oneOf,
    betweenLength,
    insensitiveEquals,
    isEmail,
    isIP,
    isString,
    isUrl,
    length,
    maxLength,
    minLength,
    toString,
    validateCondition,
    validateRegex,
};

export default validate;
