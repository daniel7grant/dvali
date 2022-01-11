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

export interface ValidatorFunctionSync<T = any, U = any> {
    (value: U, conf: ValidatorConfiguration): T | undefined | void;
}

export interface ValidatorFunctionAsync<T = any, U = any> {
    (value: U, conf: ValidatorConfiguration): Promise<T | undefined | void>;
}

export type ValidatorFunction<T = any, U = any> =
    | ValidatorFunctionSync<T, U>
    | ValidatorFunctionAsync<T, U>;

export type ValidatorObject<T> = {
    [key in keyof T]: Validator<T[key]>;
};

export type Validator<T> = ValidatorObject<T> | ValidatorFunction<T>[] | ValidatorFunction<T>;

export interface FailureFunction<T> {
    (v: T, conf: ValidatorConfiguration): string;
}

export type inferValidation<S extends ValidatorFunction<T>, T> = T;

export const Success = function <T>(t?: T): Promise<T | undefined> {
    return Promise.resolve(t);
};

export const Ignore = function (): Promise<undefined> {
    return Promise.resolve(undefined);
};

export const Failure = function (t: string): never {
    throw t;
};
