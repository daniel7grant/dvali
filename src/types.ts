export interface ValidatorState<T> {
    value: T;
    failures: string[];
}

export interface ValidatorConfiguration {
    name: string;
    path: string[];
    original: any;
    parent: any;
}

export interface ValidatorFunction<T = any> {
    (value: T, conf: ValidatorConfiguration): Promise<T | undefined>;
}

export type ValidatorObject<T> = {
    [key in keyof T]: Validator<T[key]>;
};

export type Validator<T> = ValidatorObject<T> | ValidatorFunction<T>[] | ValidatorFunction<T>;

export interface FailureFunction<T> {
    (v: T, conf: ValidatorConfiguration): string;
}

export const Success = function <T>(t?: T): T | undefined {
    return t;
};

export const Ignore = function (): undefined {
    return undefined;
};

export const Failure = function (t: string): never {
    throw t;
};
