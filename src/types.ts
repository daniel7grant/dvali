type EmptySuccess = null;
const emptySuccess: EmptySuccess = null;
export const isEmptySuccess = (t: unknown): t is EmptySuccess => t === null;

export const Success = function <T>(t: T | EmptySuccess = emptySuccess): Promise<T | EmptySuccess> {
    return Promise.resolve(t);
};

export const Ignore = function (): Promise<EmptySuccess> {
    return Promise.resolve(emptySuccess);
};

export const Failure = function (t: string): never {
    throw t;
};

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

export interface ValidatorFunction<T = any, U = any> {
    (value: U, conf: ValidatorConfiguration): Promise<T | EmptySuccess>;
}

export type ValidatorObject<T> = {
    [key in keyof T]: Validator<T[key]>;
};

export type Validator<T> = ValidatorObject<T> | ValidatorFunction<T>[] | ValidatorFunction<T>;

export interface FailureFunction<T> {
    (v: T, conf: ValidatorConfiguration): string;
}

export type inferValidation<S extends ValidatorFunction<T>, T> = T;
