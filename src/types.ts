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
export interface ValidatorFunction<I, O> {
    (value: I, conf: ValidatorConfiguration): Promise<O | undefined | void>;
}

export type ValidatorFunctionList1<I, O> = [ValidatorFunction<I, O>]
export type ValidatorFunctionList2<I, A, O> = [ValidatorFunction<I, A>, ValidatorFunction<A, O>]
export type ValidatorFunctionList3<I, A, B, O> = [ValidatorFunction<I, A>, ValidatorFunction<A, B>, ValidatorFunction<B, O>]
export type ValidatorFunctionList<I, A, B, O> =
    | ValidatorFunctionList1<I, O>
    | ValidatorFunctionList2<I, A, O>
    | ValidatorFunctionList3<I, A, B, O>;

export type ValueValidator<O> =
    | ValidatorFunctionList1<any, O>
    | ValidatorFunctionList2<any, any, O>
    | ValidatorFunctionList3<any, any, any, O>
    | ValidatorFunction<any, O>
    | ValidatorObject<O>;

export type ValidatorObject<O> = {
    [key in keyof O]: ValueValidator<O[key]>;
};

export type Validator<I, A, B, O> =
    | ValidatorFunctionList1<I, O>
    | ValidatorFunctionList2<I, A, O>
    | ValidatorFunctionList3<I, A, B, O>
    | ValidatorFunction<I, O>
    | ValidatorObject<O>;

export interface FailureFunction<T> {
    (v: T, conf: ValidatorConfiguration): string;
}

export type InferValidator<T> = T extends Validator<unknown, infer O, unknown, unknown> ? O : never;

export const Success = function <T>(t?: T): Promise<T | undefined> {
    return Promise.resolve(t);
};

export const Ignore = function (): Promise<undefined> {
    return Promise.resolve(undefined);
};

export const Failure = function (t: string): never {
    throw t;
};
