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

export type SyncValidatingFunction<I, O> = (val: I, c?: Partial<ValidatorConfiguration>) => O;
export type AsyncValidatingFunction<I, O> = (val: I, c?: Partial<ValidatorConfiguration>) => Promise<O>;
export type ValidatingFunction<I, O> = SyncValidatingFunction<I, O> | AsyncValidatingFunction<I, O>;

export type SyncValidatorFunction<I, O> = (value: I, conf: ValidatorConfiguration) => O;
// This is necessary so sync validators don't eat async validators (SyncValidatorFunction<I, Promise<O>> instead of ValidatorFunction<I, O>)
export type SyncValidatorFunctionInner<I, O> = O extends Promise<infer _> ? never : SyncValidatorFunction<I, O>;
export type AsyncValidatorFunction<I, O> = (value: I, conf: ValidatorConfiguration) => Promise<O>;
export type ValidatorFunction<I, O> = SyncValidatorFunctionInner<I, O> | AsyncValidatorFunction<I, O>;

export type SyncValidatorFunctionList1<I, O> = [SyncValidatorFunctionInner<I, O>];
export type SyncValidatorFunctionList2<I, A, O> = [SyncValidatorFunctionInner<I, A>, SyncValidatorFunctionInner<A, O>];
export type SyncValidatorFunctionList3<I, A, B, O> = [SyncValidatorFunctionInner<I, A>, SyncValidatorFunctionInner<A, B>, SyncValidatorFunctionInner<B, O>];
export type SyncValidatorFunctionList<I, A, B, O> = SyncValidatorFunctionList1<I, O> | SyncValidatorFunctionList2<I, A, O> | SyncValidatorFunctionList3<I, A, B, O>;

export type ValidatorFunctionList1<I, O> = [ValidatorFunction<I, O>];
export type ValidatorFunctionList2<I, A, O> = [ValidatorFunction<I, A>, ValidatorFunction<A, O>];
export type ValidatorFunctionList3<I, A, B, O> = [ValidatorFunction<I, A>, ValidatorFunction<A, B>, ValidatorFunction<B, O>];
export type ValidatorFunctionList<I, A, B, O> = ValidatorFunctionList1<I, O> | ValidatorFunctionList2<I, A, O> | ValidatorFunctionList3<I, A, B, O>;

// Value validators are necessary, because we don't have generics in mapped types.
// Validator object values only support the return type of last validator function.
export type SyncValueValidator<O> = SyncValidatorFunctionList1<any, O> | SyncValidatorFunctionList2<any, any, O> | SyncValidatorFunctionList3<any, any, any, O> | SyncValidatorFunctionInner<any, O> | SyncValidatingFunction<any, O> | SyncValidatorObject<O>;
export type SyncValidatorObject<O> = {
    [key in keyof O]: SyncValueValidator<O[key]>;
};
export type ValueValidator<O> = ValidatorFunctionList1<any, O> | ValidatorFunctionList2<any, any, O> | ValidatorFunctionList3<any, any, any, O> | ValidatorFunction<any, O>  | ValidatingFunction<any, O> | ValidatorObject<O>;
export type ValidatorObject<O> = {
    [key in keyof O]: ValueValidator<O[key]>;
};

export type SyncValidator<I, A, B, O> = SyncValidatorFunctionList1<I, O> | SyncValidatorFunctionList2<I, A, O> | SyncValidatorFunctionList3<I, A, B, O> | SyncValidatorFunctionInner<I, O> | SyncValidatorObject<O>;
export type Validator<I, A, B, O> = ValidatorFunctionList1<I, O> | ValidatorFunctionList2<I, A, O> | ValidatorFunctionList3<I, A, B, O> | ValidatorFunction<I, O> | ValidatorObject<O>;

export interface FailureFunction<T> {
    (v: T, conf: ValidatorConfiguration): string;
}

export type InferValidator<T> = T extends Validator<unknown, infer O, unknown, unknown> ? O : never;

export const Success = function <T>(t: T): T {
    return t;
};

export const Failure = function (t: string): never {
    throw t;
};
