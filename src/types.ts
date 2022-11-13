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

export type SyncValidatingFunction<I, O> = O extends Promise<infer P> ? never : (t: I, cc?: Partial<ValidatorConfiguration>) => O;
export type AsyncValidatingFunction<I, O> = (t: I, cc?: Partial<ValidatorConfiguration>) => Promise<O>;
export type ValidatingFunction<I, O> = SyncValidatingFunction<I, O> | AsyncValidatingFunction<I, O>;

export type SyncValidatorFunction<I, O> = O extends Promise<infer P> ? never : (value: I, conf: ValidatorConfiguration) => O | undefined | void;
export type AsyncValidatorFunction<I, O> = (value: I, conf: ValidatorConfiguration) => Promise<O | undefined | void>;
export type ValidatorFunction<I, O> = SyncValidatorFunction<I, O> | AsyncValidatorFunction<I, O>;

export type SyncValidatorFunctionList1<I, O> = [SyncValidatorFunction<I, O>];
export type SyncValidatorFunctionList2<I, O, A> = [SyncValidatorFunction<I, A>, ...SyncValidatorFunctionList1<A, O>];
export type SyncValidatorFunctionList3<I, O, A, B> = [SyncValidatorFunction<I, A>, ...SyncValidatorFunctionList2<A, O, B>];
export type SyncValidatorFunctionList4<I, O, A, B, C> = [SyncValidatorFunction<I, A>, ...SyncValidatorFunctionList3<A, O, B, C>];
export type SyncValidatorFunctionList5<I, O, A, B, C, D> = [SyncValidatorFunction<I, A>, ...SyncValidatorFunctionList4<A, O, B, C, D>];
export type SyncValidatorFunctionList6<I, O, A, B, C, D, E> = [SyncValidatorFunction<I, A>, ...SyncValidatorFunctionList5<A, O, B, C, D, E>];
export type SyncValidatorFunctionList7<I, O, A, B, C, D, E, F> = [SyncValidatorFunction<I, A>, ...SyncValidatorFunctionList6<A, O, B, C, D, E, F>];
export type SyncValidatorFunctionList8<I, O, A, B, C, D, E, F, G> = [SyncValidatorFunction<I, A>, ...SyncValidatorFunctionList7<A, O, B, C, D, E, F, G>];
export type SyncValidatorFunctionList9<I, O, A, B, C, D, E, F, G, H> = [SyncValidatorFunction<I, A>, ...SyncValidatorFunctionList8<A, O, B, C, D, E, F, G, H>];
export type SyncValidatorFunctionList10<I, O, A, B, C, D, E, F, G, H, J> = [SyncValidatorFunction<I, A>, ...SyncValidatorFunctionList9<A, O, B, C, D, E, F, G, H, J>];
export type SyncValidatorFunctionList11<I, O, A, B, C, D, E, F, G, H, J, K> = [SyncValidatorFunction<I, A>, ...SyncValidatorFunctionList10<A, O, B, C, D, E, F, G, H, J, K>];
export type SyncValidatorFunctionList12<I, O, A, B, C, D, E, F, G, H, J, K, L> = [SyncValidatorFunction<I, A>, ...SyncValidatorFunctionList11<A, O, B, C, D, E, F, G, H, J, K, L>];
export type SyncValidatorFunctionList13<I, O, A, B, C, D, E, F, G, H, J, K, L, M> = [SyncValidatorFunction<I, A>, ...SyncValidatorFunctionList12<A, O, B, C, D, E, F, G, H, J, K, L, M>];
export type SyncValidatorFunctionList14<I, O, A, B, C, D, E, F, G, H, J, K, L, M, N> = [SyncValidatorFunction<I, A>, ...SyncValidatorFunctionList13<A, O, B, C, D, E, F, G, H, J, K, L, M, N>];
export type SyncValidatorFunctionList15<I, O, A, B, C, D, E, F, G, H, J, K, L, M, N, P> = [SyncValidatorFunction<I, A>, ...SyncValidatorFunctionList14<A, O, B, C, D, E, F, G, H, J, K, L, M, N, P>];
export type SyncValidatorFunctionList16<I, O, A, B, C, D, E, F, G, H, J, K, L, M, N, P, Q> = [SyncValidatorFunction<I, A>, ...SyncValidatorFunctionList15<A, O, B, C, D, E, F, G, H, J, K, L, M, N, P, Q>];
export type SyncValidatorFunctionList17<I, O, A, B, C, D, E, F, G, H, J, K, L, M, N, P, Q, R> = [SyncValidatorFunction<I, A>, ...SyncValidatorFunctionList16<A, O, B, C, D, E, F, G, H, J, K, L, M, N, P, Q, R>];
export type SyncValidatorFunctionList18<I, O, A, B, C, D, E, F, G, H, J, K, L, M, N, P, Q, R, S> = [SyncValidatorFunction<I, A>, ...SyncValidatorFunctionList17<A, O, B, C, D, E, F, G, H, J, K, L, M, N, P, Q, R, S>];
export type SyncValidatorFunctionList19<I, O, A, B, C, D, E, F, G, H, J, K, L, M, N, P, Q, R, S, T> = [SyncValidatorFunction<I, A>, ...SyncValidatorFunctionList18<A, O, B, C, D, E, F, G, H, J, K, L, M, N, P, Q, R, S, T>];
export type SyncValidatorFunctionList20<I, O, A, B, C, D, E, F, G, H, J, K, L, M, N, P, Q, R, S, T, U> = [SyncValidatorFunction<I, A>, ...SyncValidatorFunctionList19<A, O, B, C, D, E, F, G, H, J, K, L, M, N, P, Q, R, S, T, U>];
export type SyncValidatorFunctionList21<I, O, A, B, C, D, E, F, G, H, J, K, L, M, N, P, Q, R, S, T, U, V> = [SyncValidatorFunction<I, A>, ...SyncValidatorFunctionList20<A, O, B, C, D, E, F, G, H, J, K, L, M, N, P, Q, R, S, T, U, V>];
export type SyncValidatorFunctionList22<I, O, A, B, C, D, E, F, G, H, J, K, L, M, N, P, Q, R, S, T, U, V, W> = [SyncValidatorFunction<I, A>, ...SyncValidatorFunctionList21<A, O, B, C, D, E, F, G, H, J, K, L, M, N, P, Q, R, S, T, U, V, W>];
export type SyncValidatorFunctionList23<I, O, A, B, C, D, E, F, G, H, J, K, L, M, N, P, Q, R, S, T, U, V, W, X> = [SyncValidatorFunction<I, A>, ...SyncValidatorFunctionList22<A, O, B, C, D, E, F, G, H, J, K, L, M, N, P, Q, R, S, T, U, V, W, X>];
export type SyncValidatorFunctionList24<I, O, A, B, C, D, E, F, G, H, J, K, L, M, N, P, Q, R, S, T, U, V, W, X, Y> = [SyncValidatorFunction<I, A>, ...SyncValidatorFunctionList23<A, O, B, C, D, E, F, G, H, J, K, L, M, N, P, Q, R, S, T, U, V, W, X, Y>];
export type SyncValidatorFunctionList25<I, O, A, B, C, D, E, F, G, H, J, K, L, M, N, P, Q, R, S, T, U, V, W, X, Y, Z> = [SyncValidatorFunction<I, A>, ...SyncValidatorFunctionList24<A, O, B, C, D, E, F, G, H, J, K, L, M, N, P, Q, R, S, T, U, V, W, X, Y, Z>];


export type ValidatorFunctionList1<I, O> = [ValidatorFunction<I, O>];
export type ValidatorFunctionList2<I, O, A> = [ValidatorFunction<I, A>, ...ValidatorFunctionList1<A, O>];
export type ValidatorFunctionList3<I, O, A, B> = [ValidatorFunction<I, A>, ...ValidatorFunctionList2<A, O, B>];
export type ValidatorFunctionList4<I, O, A, B, C> = [ValidatorFunction<I, A>, ...ValidatorFunctionList3<A, O, B, C>];
export type ValidatorFunctionList5<I, O, A, B, C, D> = [ValidatorFunction<I, A>, ...ValidatorFunctionList4<A, O, B, C, D>];
export type ValidatorFunctionList6<I, O, A, B, C, D, E> = [ValidatorFunction<I, A>, ...ValidatorFunctionList5<A, O, B, C, D, E>];
export type ValidatorFunctionList7<I, O, A, B, C, D, E, F> = [ValidatorFunction<I, A>, ...ValidatorFunctionList6<A, O, B, C, D, E, F>];
export type ValidatorFunctionList8<I, O, A, B, C, D, E, F, G> = [ValidatorFunction<I, A>, ...ValidatorFunctionList7<A, O, B, C, D, E, F, G>];
export type ValidatorFunctionList9<I, O, A, B, C, D, E, F, G, H> = [ValidatorFunction<I, A>, ...ValidatorFunctionList8<A, O, B, C, D, E, F, G, H>];
export type ValidatorFunctionList10<I, O, A, B, C, D, E, F, G, H, J> = [ValidatorFunction<I, A>, ...ValidatorFunctionList9<A, O, B, C, D, E, F, G, H, J>];
export type ValidatorFunctionList11<I, O, A, B, C, D, E, F, G, H, J, K> = [ValidatorFunction<I, A>, ...ValidatorFunctionList10<A, O, B, C, D, E, F, G, H, J, K>];
export type ValidatorFunctionList12<I, O, A, B, C, D, E, F, G, H, J, K, L> = [ValidatorFunction<I, A>, ...ValidatorFunctionList11<A, O, B, C, D, E, F, G, H, J, K, L>];
export type ValidatorFunctionList13<I, O, A, B, C, D, E, F, G, H, J, K, L, M> = [ValidatorFunction<I, A>, ...ValidatorFunctionList12<A, O, B, C, D, E, F, G, H, J, K, L, M>];
export type ValidatorFunctionList14<I, O, A, B, C, D, E, F, G, H, J, K, L, M, N> = [ValidatorFunction<I, A>, ...ValidatorFunctionList13<A, O, B, C, D, E, F, G, H, J, K, L, M, N>];
export type ValidatorFunctionList15<I, O, A, B, C, D, E, F, G, H, J, K, L, M, N, P> = [ValidatorFunction<I, A>, ...ValidatorFunctionList14<A, O, B, C, D, E, F, G, H, J, K, L, M, N, P>];
export type ValidatorFunctionList16<I, O, A, B, C, D, E, F, G, H, J, K, L, M, N, P, Q> = [ValidatorFunction<I, A>, ...ValidatorFunctionList15<A, O, B, C, D, E, F, G, H, J, K, L, M, N, P, Q>];
export type ValidatorFunctionList17<I, O, A, B, C, D, E, F, G, H, J, K, L, M, N, P, Q, R> = [ValidatorFunction<I, A>, ...ValidatorFunctionList16<A, O, B, C, D, E, F, G, H, J, K, L, M, N, P, Q, R>];
export type ValidatorFunctionList18<I, O, A, B, C, D, E, F, G, H, J, K, L, M, N, P, Q, R, S> = [ValidatorFunction<I, A>, ...ValidatorFunctionList17<A, O, B, C, D, E, F, G, H, J, K, L, M, N, P, Q, R, S>];
export type ValidatorFunctionList19<I, O, A, B, C, D, E, F, G, H, J, K, L, M, N, P, Q, R, S, T> = [ValidatorFunction<I, A>, ...ValidatorFunctionList18<A, O, B, C, D, E, F, G, H, J, K, L, M, N, P, Q, R, S, T>];
export type ValidatorFunctionList20<I, O, A, B, C, D, E, F, G, H, J, K, L, M, N, P, Q, R, S, T, U> = [ValidatorFunction<I, A>, ...ValidatorFunctionList19<A, O, B, C, D, E, F, G, H, J, K, L, M, N, P, Q, R, S, T, U>];
export type ValidatorFunctionList21<I, O, A, B, C, D, E, F, G, H, J, K, L, M, N, P, Q, R, S, T, U, V> = [ValidatorFunction<I, A>, ...ValidatorFunctionList20<A, O, B, C, D, E, F, G, H, J, K, L, M, N, P, Q, R, S, T, U, V>];
export type ValidatorFunctionList22<I, O, A, B, C, D, E, F, G, H, J, K, L, M, N, P, Q, R, S, T, U, V, W> = [ValidatorFunction<I, A>, ...ValidatorFunctionList21<A, O, B, C, D, E, F, G, H, J, K, L, M, N, P, Q, R, S, T, U, V, W>];
export type ValidatorFunctionList23<I, O, A, B, C, D, E, F, G, H, J, K, L, M, N, P, Q, R, S, T, U, V, W, X> = [ValidatorFunction<I, A>, ...ValidatorFunctionList22<A, O, B, C, D, E, F, G, H, J, K, L, M, N, P, Q, R, S, T, U, V, W, X>];
export type ValidatorFunctionList24<I, O, A, B, C, D, E, F, G, H, J, K, L, M, N, P, Q, R, S, T, U, V, W, X, Y> = [ValidatorFunction<I, A>, ...ValidatorFunctionList23<A, O, B, C, D, E, F, G, H, J, K, L, M, N, P, Q, R, S, T, U, V, W, X, Y>];
export type ValidatorFunctionList25<I, O, A, B, C, D, E, F, G, H, J, K, L, M, N, P, Q, R, S, T, U, V, W, X, Y, Z> = [ValidatorFunction<I, A>, ...ValidatorFunctionList24<A, O, B, C, D, E, F, G, H, J, K, L, M, N, P, Q, R, S, T, U, V, W, X, Y, Z>];

export type SyncValueValidator<O> =
	| SyncValidatorFunction<any, O>
    | SyncValidatorFunctionList1<any, O>
    | SyncValidatorFunctionList2<any, O, any>
    | SyncValidatorFunctionList3<any, O, any, any>
    | SyncValidatorFunctionList4<any, O, any, any, any>
    | SyncValidatorFunctionList5<any, O, any, any, any, any>
    | SyncValidatorFunctionList6<any, O, any, any, any, any, any>
    | SyncValidatorFunctionList7<any, O, any, any, any, any, any, any>
    | SyncValidatorFunctionList8<any, O, any, any, any, any, any, any, any>
    | SyncValidatorFunctionList9<any, O, any, any, any, any, any, any, any, any>
    | SyncValidatorFunctionList10<any, O, any, any, any, any, any, any, any, any, any>
    | SyncValidatorFunctionList11<any, O, any, any, any, any, any, any, any, any, any, any>
    | SyncValidatorFunctionList12<any, O, any, any, any, any, any, any, any, any, any, any, any>
    | SyncValidatorFunctionList13<any, O, any, any, any, any, any, any, any, any, any, any, any, any>
    | SyncValidatorFunctionList14<any, O, any, any, any, any, any, any, any, any, any, any, any, any, any>
    | SyncValidatorFunctionList15<any, O, any, any, any, any, any, any, any, any, any, any, any, any, any, any>
    | SyncValidatorFunctionList16<any, O, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>
    | SyncValidatorFunctionList17<any, O, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>
    | SyncValidatorFunctionList18<any, O, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>
    | SyncValidatorFunctionList19<any, O, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>
    | SyncValidatorFunctionList20<any, O, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>
    | SyncValidatorFunctionList21<any, O, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>
    | SyncValidatorFunctionList22<any, O, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>
    | SyncValidatorFunctionList23<any, O, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>
    | SyncValidatorFunctionList24<any, O, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>
    | SyncValidatorFunctionList25<any, O, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>
	| SyncValidatorObject<O>
    // | SyncValidatingFunction<any, O>
	;

export type ValueValidator<O> =
	| ValidatorFunction<any, O>
	| ValidatorFunctionList1<any, O>
	| ValidatorFunctionList2<any, O, any>
	| ValidatorFunctionList3<any, O, any, any>
	| ValidatorFunctionList4<any, O, any, any, any>
	| ValidatorFunctionList5<any, O, any, any, any, any>
	| ValidatorFunctionList6<any, O, any, any, any, any, any>
	| ValidatorFunctionList7<any, O, any, any, any, any, any, any>
	| ValidatorFunctionList8<any, O, any, any, any, any, any, any, any>
	| ValidatorFunctionList9<any, O, any, any, any, any, any, any, any, any>
	| ValidatorFunctionList10<any, O, any, any, any, any, any, any, any, any, any>
    | ValidatorFunctionList11<any, O, any, any, any, any, any, any, any, any, any, any>
    | ValidatorFunctionList12<any, O, any, any, any, any, any, any, any, any, any, any, any>
    | ValidatorFunctionList13<any, O, any, any, any, any, any, any, any, any, any, any, any, any>
    | ValidatorFunctionList14<any, O, any, any, any, any, any, any, any, any, any, any, any, any, any>
    | ValidatorFunctionList15<any, O, any, any, any, any, any, any, any, any, any, any, any, any, any, any>
    | ValidatorFunctionList16<any, O, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>
    | ValidatorFunctionList17<any, O, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>
    | ValidatorFunctionList18<any, O, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>
    | ValidatorFunctionList19<any, O, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>
    | ValidatorFunctionList20<any, O, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>
    | ValidatorFunctionList21<any, O, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>
    | ValidatorFunctionList22<any, O, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>
    | ValidatorFunctionList23<any, O, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>
    | ValidatorFunctionList24<any, O, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>
    | ValidatorFunctionList25<any, O, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>
	| ValidatorObject<O>
    | ValidatingFunction<any, O>
	;

export type SyncValidatorObject<T> = {
	[key in keyof T]: SyncValueValidator<T[key]>;
};

export type ValidatorObject<T> = {
	[key in keyof T]: ValueValidator<Awaited<T[key]>>;
};

export type SyncValidator<I, O, A, B, C, D, E, F, G, H, J, K, L, M, N, P, Q, R, S, T, U, V, W, X, Y, Z> =
	| SyncValidatorFunction<I, O>
    | SyncValidatingFunction<I, O>
	| SyncValidatorFunctionList1<I, O>
	| SyncValidatorFunctionList2<I, O, A>
	| SyncValidatorFunctionList3<I, O, A, B>
	| SyncValidatorFunctionList4<I, O, A, B, C>
	| SyncValidatorFunctionList5<I, O, A, B, C, D>
	| SyncValidatorFunctionList6<I, O, A, B, C, D, E>
	| SyncValidatorFunctionList7<I, O, A, B, C, D, E, F>
	| SyncValidatorFunctionList8<I, O, A, B, C, D, E, F, G>
	| SyncValidatorFunctionList9<I, O, A, B, C, D, E, F, G, H>
	| SyncValidatorFunctionList10<I, O, A, B, C, D, E, F, G, H, J>
	| SyncValidatorFunctionList11<I, O, A, B, C, D, E, F, G, H, J, K>
	| SyncValidatorFunctionList12<I, O, A, B, C, D, E, F, G, H, J, K, L>
	| SyncValidatorFunctionList13<I, O, A, B, C, D, E, F, G, H, J, K, L, M>
	| SyncValidatorFunctionList14<I, O, A, B, C, D, E, F, G, H, J, K, L, M, N>
	| SyncValidatorFunctionList15<I, O, A, B, C, D, E, F, G, H, J, K, L, M, N, P>
	| SyncValidatorFunctionList16<I, O, A, B, C, D, E, F, G, H, J, K, L, M, N, P, Q>
	| SyncValidatorFunctionList17<I, O, A, B, C, D, E, F, G, H, J, K, L, M, N, P, Q, R>
	| SyncValidatorFunctionList18<I, O, A, B, C, D, E, F, G, H, J, K, L, M, N, P, Q, R, S>
	| SyncValidatorFunctionList19<I, O, A, B, C, D, E, F, G, H, J, K, L, M, N, P, Q, R, S, T>
	| SyncValidatorFunctionList20<I, O, A, B, C, D, E, F, G, H, J, K, L, M, N, P, Q, R, S, T, U>
	| SyncValidatorFunctionList21<I, O, A, B, C, D, E, F, G, H, J, K, L, M, N, P, Q, R, S, T, U, V>
	| SyncValidatorFunctionList22<I, O, A, B, C, D, E, F, G, H, J, K, L, M, N, P, Q, R, S, T, U, V, W>
	| SyncValidatorFunctionList23<I, O, A, B, C, D, E, F, G, H, J, K, L, M, N, P, Q, R, S, T, U, V, W, X>
	| SyncValidatorFunctionList24<I, O, A, B, C, D, E, F, G, H, J, K, L, M, N, P, Q, R, S, T, U, V, W, X, Y>
	| SyncValidatorFunctionList25<I, O, A, B, C, D, E, F, G, H, J, K, L, M, N, P, Q, R, S, T, U, V, W, X, Y, Z>
	| SyncValidatorObject<O>

export type Validator<I, O, A, B, C, D, E, F, G, H, J, K, L, M, N, P, Q, R, S, T, U, V, W, X, Y, Z> =
	| SyncValidatorFunction<I, O>
	| SyncValidatorFunctionList1<I, O>
	| SyncValidatorFunctionList2<I, O, A>
	| SyncValidatorFunctionList3<I, O, A, B>
	| SyncValidatorFunctionList4<I, O, A, B, C>
	| SyncValidatorFunctionList5<I, O, A, B, C, D>
	| SyncValidatorFunctionList6<I, O, A, B, C, D, E>
	| SyncValidatorFunctionList7<I, O, A, B, C, D, E, F>
	| SyncValidatorFunctionList8<I, O, A, B, C, D, E, F, G>
	| SyncValidatorFunctionList9<I, O, A, B, C, D, E, F, G, H>
	| SyncValidatorFunctionList10<I, O, A, B, C, D, E, F, G, H, J>
	| SyncValidatorFunctionList11<I, O, A, B, C, D, E, F, G, H, J, K>
	| SyncValidatorFunctionList12<I, O, A, B, C, D, E, F, G, H, J, K, L>
	| SyncValidatorFunctionList13<I, O, A, B, C, D, E, F, G, H, J, K, L, M>
	| SyncValidatorFunctionList14<I, O, A, B, C, D, E, F, G, H, J, K, L, M, N>
	| SyncValidatorFunctionList15<I, O, A, B, C, D, E, F, G, H, J, K, L, M, N, P>
	| SyncValidatorFunctionList16<I, O, A, B, C, D, E, F, G, H, J, K, L, M, N, P, Q>
	| SyncValidatorFunctionList17<I, O, A, B, C, D, E, F, G, H, J, K, L, M, N, P, Q, R>
	| SyncValidatorFunctionList18<I, O, A, B, C, D, E, F, G, H, J, K, L, M, N, P, Q, R, S>
	| SyncValidatorFunctionList19<I, O, A, B, C, D, E, F, G, H, J, K, L, M, N, P, Q, R, S, T>
	| SyncValidatorFunctionList20<I, O, A, B, C, D, E, F, G, H, J, K, L, M, N, P, Q, R, S, T, U>
	| SyncValidatorFunctionList21<I, O, A, B, C, D, E, F, G, H, J, K, L, M, N, P, Q, R, S, T, U, V>
	| SyncValidatorFunctionList22<I, O, A, B, C, D, E, F, G, H, J, K, L, M, N, P, Q, R, S, T, U, V, W>
	| SyncValidatorFunctionList23<I, O, A, B, C, D, E, F, G, H, J, K, L, M, N, P, Q, R, S, T, U, V, W, X>
	| SyncValidatorFunctionList24<I, O, A, B, C, D, E, F, G, H, J, K, L, M, N, P, Q, R, S, T, U, V, W, X, Y>
	| SyncValidatorFunctionList25<I, O, A, B, C, D, E, F, G, H, J, K, L, M, N, P, Q, R, S, T, U, V, W, X, Y, Z>
	| ValidatorFunction<I, O>
    | ValidatorFunctionList1<I, O>
    | ValidatorFunctionList2<I, O, A>
    | ValidatorFunctionList3<I, O, A, B>
    | ValidatorFunctionList4<I, O, A, B, C>
    | ValidatorFunctionList5<I, O, A, B, C, D>
    | ValidatorFunctionList6<I, O, A, B, C, D, E>
    | ValidatorFunctionList7<I, O, A, B, C, D, E, F>
    | ValidatorFunctionList8<I, O, A, B, C, D, E, F, G>
    | ValidatorFunctionList9<I, O, A, B, C, D, E, F, G, H>
    | ValidatorFunctionList10<I, O, A, B, C, D, E, F, G, H, J>
    | ValidatorFunctionList11<I, O, A, B, C, D, E, F, G, H, J, K>
    | ValidatorFunctionList12<I, O, A, B, C, D, E, F, G, H, J, K, L>
    | ValidatorFunctionList13<I, O, A, B, C, D, E, F, G, H, J, K, L, M>
    | ValidatorFunctionList14<I, O, A, B, C, D, E, F, G, H, J, K, L, M, N>
    | ValidatorFunctionList15<I, O, A, B, C, D, E, F, G, H, J, K, L, M, N, P>
    | ValidatorFunctionList16<I, O, A, B, C, D, E, F, G, H, J, K, L, M, N, P, Q>
    | ValidatorFunctionList17<I, O, A, B, C, D, E, F, G, H, J, K, L, M, N, P, Q, R>
    | ValidatorFunctionList18<I, O, A, B, C, D, E, F, G, H, J, K, L, M, N, P, Q, R, S>
    | ValidatorFunctionList19<I, O, A, B, C, D, E, F, G, H, J, K, L, M, N, P, Q, R, S, T>
    | ValidatorFunctionList20<I, O, A, B, C, D, E, F, G, H, J, K, L, M, N, P, Q, R, S, T, U>
    | ValidatorFunctionList21<I, O, A, B, C, D, E, F, G, H, J, K, L, M, N, P, Q, R, S, T, U, V>
    | ValidatorFunctionList22<I, O, A, B, C, D, E, F, G, H, J, K, L, M, N, P, Q, R, S, T, U, V, W>
    | ValidatorFunctionList23<I, O, A, B, C, D, E, F, G, H, J, K, L, M, N, P, Q, R, S, T, U, V, W, X>
    | ValidatorFunctionList24<I, O, A, B, C, D, E, F, G, H, J, K, L, M, N, P, Q, R, S, T, U, V, W, X, Y>
    | ValidatorFunctionList25<I, O, A, B, C, D, E, F, G, H, J, K, L, M, N, P, Q, R, S, T, U, V, W, X, Y, Z>
    | SyncValidatingFunction<I, O>
    | ValidatingFunction<I, O>
	| SyncValidatorObject<O>
	| ValidatorObject<O>
	;

export interface FailureFunction<T> {
    (v: T, conf: ValidatorConfiguration): string;
}

export type InferValidator<T> = T extends Validator<infer I, infer O, infer A, infer B, infer C, infer D, infer E, infer F, infer G, infer H, infer J, infer K, infer L, infer M, infer N, infer P, infer Q, infer R, infer S, infer _, infer U, infer V, infer W, infer X, infer Y, infer Z>? O : never;

export const Success = function <T>(t?: T): Promise<T | undefined> {
    return Promise.resolve(t);
};

export const Ignore = function (): Promise<undefined> {
    return Promise.resolve(undefined);
};

export const Failure = function (t: string): never {
    throw t;
};





export function validate<I, O>(v: SyncValidatorFunction<I, O>, c?: Partial<ValidatorConfiguration>): SyncValidatingFunction<I, O>
export function validate<I, O>(v: SyncValidatingFunction<I, O>, c?: Partial<ValidatorConfiguration>): SyncValidatingFunction<I, O>
export function validate<I, O>(v: SyncValidatorFunctionList1<I, O>, c?: Partial<ValidatorConfiguration>): SyncValidatingFunction<I, O>
export function validate<I, O, A>(v: SyncValidatorFunctionList2<I, O, A>, c?: Partial<ValidatorConfiguration>): SyncValidatingFunction<I, O>
export function validate<I, O, A, B>(v: SyncValidatorFunctionList3<I, O, A, B>, c?: Partial<ValidatorConfiguration>): SyncValidatingFunction<I, O>
export function validate<I, O, A, B, C>(v: SyncValidatorFunctionList4<I, O, A, B, C>, c?: Partial<ValidatorConfiguration>): SyncValidatingFunction<I, O>
export function validate<I, O, A, B, C, D>(v: SyncValidatorFunctionList5<I, O, A, B, C, D>, c?: Partial<ValidatorConfiguration>): SyncValidatingFunction<I, O>
export function validate<I, O, A, B, C, D, E>(v: SyncValidatorFunctionList6<I, O, A, B, C, D, E>, c?: Partial<ValidatorConfiguration>): SyncValidatingFunction<I, O>
export function validate<I, O, A, B, C, D, E, F>(v: SyncValidatorFunctionList7<I, O, A, B, C, D, E, F>, c?: Partial<ValidatorConfiguration>): SyncValidatingFunction<I, O>
export function validate<I, O, A, B, C, D, E, F, G>(v: SyncValidatorFunctionList8<I, O, A, B, C, D, E, F, G>, c?: Partial<ValidatorConfiguration>): SyncValidatingFunction<I, O>
export function validate<I, O, A, B, C, D, E, F, G, H>(v: SyncValidatorFunctionList9<I, O, A, B, C, D, E, F, G, H>, c?: Partial<ValidatorConfiguration>): SyncValidatingFunction<I, O>
export function validate<I, O, A, B, C, D, E, F, G, H, J>(v: SyncValidatorFunctionList10<I, O, A, B, C, D, E, F, G, H, J>, c?: Partial<ValidatorConfiguration>): SyncValidatingFunction<I, O>
export function validate<I, O, A, B, C, D, E, F, G, H, J, K>(v: SyncValidatorFunctionList11<I, O, A, B, C, D, E, F, G, H, J, K>, c?: Partial<ValidatorConfiguration>): SyncValidatingFunction<I, O>
export function validate<I, O, A, B, C, D, E, F, G, H, J, K, L>(v: SyncValidatorFunctionList12<I, O, A, B, C, D, E, F, G, H, J, K, L>, c?: Partial<ValidatorConfiguration>): SyncValidatingFunction<I, O>
export function validate<I, O, A, B, C, D, E, F, G, H, J, K, L, M>(v: SyncValidatorFunctionList13<I, O, A, B, C, D, E, F, G, H, J, K, L, M>, c?: Partial<ValidatorConfiguration>): SyncValidatingFunction<I, O>
export function validate<I, O, A, B, C, D, E, F, G, H, J, K, L, M, N>(v: SyncValidatorFunctionList14<I, O, A, B, C, D, E, F, G, H, J, K, L, M, N>, c?: Partial<ValidatorConfiguration>): SyncValidatingFunction<I, O>
export function validate<I, O, A, B, C, D, E, F, G, H, J, K, L, M, N, P>(v: SyncValidatorFunctionList15<I, O, A, B, C, D, E, F, G, H, J, K, L, M, N, P>, c?: Partial<ValidatorConfiguration>): SyncValidatingFunction<I, O>
export function validate<I, O, A, B, C, D, E, F, G, H, J, K, L, M, N, P, Q>(v: SyncValidatorFunctionList16<I, O, A, B, C, D, E, F, G, H, J, K, L, M, N, P, Q>, c?: Partial<ValidatorConfiguration>): SyncValidatingFunction<I, O>
export function validate<I, O, A, B, C, D, E, F, G, H, J, K, L, M, N, P, Q, R>(v: SyncValidatorFunctionList17<I, O, A, B, C, D, E, F, G, H, J, K, L, M, N, P, Q, R>, c?: Partial<ValidatorConfiguration>): SyncValidatingFunction<I, O>
export function validate<I, O, A, B, C, D, E, F, G, H, J, K, L, M, N, P, Q, R, S>(v: SyncValidatorFunctionList18<I, O, A, B, C, D, E, F, G, H, J, K, L, M, N, P, Q, R, S>, c?: Partial<ValidatorConfiguration>): SyncValidatingFunction<I, O>
export function validate<I, O, A, B, C, D, E, F, G, H, J, K, L, M, N, P, Q, R, S, T>(v: SyncValidatorFunctionList19<I, O, A, B, C, D, E, F, G, H, J, K, L, M, N, P, Q, R, S, T>, c?: Partial<ValidatorConfiguration>): SyncValidatingFunction<I, O>
export function validate<I, O, A, B, C, D, E, F, G, H, J, K, L, M, N, P, Q, R, S, T, U>(v: SyncValidatorFunctionList20<I, O, A, B, C, D, E, F, G, H, J, K, L, M, N, P, Q, R, S, T, U>, c?: Partial<ValidatorConfiguration>): SyncValidatingFunction<I, O>
export function validate<I, O, A, B, C, D, E, F, G, H, J, K, L, M, N, P, Q, R, S, T, U, V>(v: SyncValidatorFunctionList21<I, O, A, B, C, D, E, F, G, H, J, K, L, M, N, P, Q, R, S, T, U, V>, c?: Partial<ValidatorConfiguration>): SyncValidatingFunction<I, O>
export function validate<I, O, A, B, C, D, E, F, G, H, J, K, L, M, N, P, Q, R, S, T, U, V, W>(v: SyncValidatorFunctionList22<I, O, A, B, C, D, E, F, G, H, J, K, L, M, N, P, Q, R, S, T, U, V, W>, c?: Partial<ValidatorConfiguration>): SyncValidatingFunction<I, O>
export function validate<I, O, A, B, C, D, E, F, G, H, J, K, L, M, N, P, Q, R, S, T, U, V, W, X>(v: SyncValidatorFunctionList23<I, O, A, B, C, D, E, F, G, H, J, K, L, M, N, P, Q, R, S, T, U, V, W, X>, c?: Partial<ValidatorConfiguration>): SyncValidatingFunction<I, O>
export function validate<I, O, A, B, C, D, E, F, G, H, J, K, L, M, N, P, Q, R, S, T, U, V, W, X, Y>(v: SyncValidatorFunctionList24<I, O, A, B, C, D, E, F, G, H, J, K, L, M, N, P, Q, R, S, T, U, V, W, X, Y>, c?: Partial<ValidatorConfiguration>): SyncValidatingFunction<I, O>
export function validate<I, O, A, B, C, D, E, F, G, H, J, K, L, M, N, P, Q, R, S, T, U, V, W, X, Y, Z>(v: SyncValidatorFunctionList25<I, O, A, B, C, D, E, F, G, H, J, K, L, M, N, P, Q, R, S, T, U, V, W, X, Y, Z>, c?: Partial<ValidatorConfiguration>): SyncValidatingFunction<I, O>
export function validate<I, O>(v: ValidatorFunction<I, O>, c?: Partial<ValidatorConfiguration>): AsyncValidatingFunction<I, O>
export function validate<I, O>(v: ValidatingFunction<I, O>, c?: Partial<ValidatorConfiguration>): AsyncValidatingFunction<I, O>
export function validate<I, O>(v: ValidatorFunctionList1<I, O>, c?: Partial<ValidatorConfiguration>): AsyncValidatingFunction<I, O>
export function validate<I, O, A>(v: ValidatorFunctionList2<I, O, A>, c?: Partial<ValidatorConfiguration>): AsyncValidatingFunction<I, O>
export function validate<I, O, A, B>(v: ValidatorFunctionList3<I, O, A, B>, c?: Partial<ValidatorConfiguration>): AsyncValidatingFunction<I, O>
export function validate<I, O, A, B, C>(v: ValidatorFunctionList4<I, O, A, B, C>, c?: Partial<ValidatorConfiguration>): AsyncValidatingFunction<I, O>
export function validate<I, O, A, B, C, D>(v: ValidatorFunctionList5<I, O, A, B, C, D>, c?: Partial<ValidatorConfiguration>): AsyncValidatingFunction<I, O>
export function validate<I, O, A, B, C, D, E>(v: ValidatorFunctionList6<I, O, A, B, C, D, E>, c?: Partial<ValidatorConfiguration>): AsyncValidatingFunction<I, O>
export function validate<I, O, A, B, C, D, E, F>(v: ValidatorFunctionList7<I, O, A, B, C, D, E, F>, c?: Partial<ValidatorConfiguration>): AsyncValidatingFunction<I, O>
export function validate<I, O, A, B, C, D, E, F, G>(v: ValidatorFunctionList8<I, O, A, B, C, D, E, F, G>, c?: Partial<ValidatorConfiguration>): AsyncValidatingFunction<I, O>
export function validate<I, O, A, B, C, D, E, F, G, H>(v: ValidatorFunctionList9<I, O, A, B, C, D, E, F, G, H>, c?: Partial<ValidatorConfiguration>): AsyncValidatingFunction<I, O>
export function validate<I, O, A, B, C, D, E, F, G, H, J>(v: ValidatorFunctionList10<I, O, A, B, C, D, E, F, G, H, J>, c?: Partial<ValidatorConfiguration>): AsyncValidatingFunction<I, O>
export function validate<I, O, A, B, C, D, E, F, G, H, J, K>(v: ValidatorFunctionList11<I, O, A, B, C, D, E, F, G, H, J, K>, c?: Partial<ValidatorConfiguration>): AsyncValidatingFunction<I, O>
export function validate<I, O, A, B, C, D, E, F, G, H, J, K, L>(v: ValidatorFunctionList12<I, O, A, B, C, D, E, F, G, H, J, K, L>, c?: Partial<ValidatorConfiguration>): AsyncValidatingFunction<I, O>
export function validate<I, O, A, B, C, D, E, F, G, H, J, K, L, M>(v: ValidatorFunctionList13<I, O, A, B, C, D, E, F, G, H, J, K, L, M>, c?: Partial<ValidatorConfiguration>): AsyncValidatingFunction<I, O>
export function validate<I, O, A, B, C, D, E, F, G, H, J, K, L, M, N>(v: ValidatorFunctionList14<I, O, A, B, C, D, E, F, G, H, J, K, L, M, N>, c?: Partial<ValidatorConfiguration>): AsyncValidatingFunction<I, O>
export function validate<I, O, A, B, C, D, E, F, G, H, J, K, L, M, N, P>(v: ValidatorFunctionList15<I, O, A, B, C, D, E, F, G, H, J, K, L, M, N, P>, c?: Partial<ValidatorConfiguration>): AsyncValidatingFunction<I, O>
export function validate<I, O, A, B, C, D, E, F, G, H, J, K, L, M, N, P, Q>(v: ValidatorFunctionList16<I, O, A, B, C, D, E, F, G, H, J, K, L, M, N, P, Q>, c?: Partial<ValidatorConfiguration>): AsyncValidatingFunction<I, O>
export function validate<I, O, A, B, C, D, E, F, G, H, J, K, L, M, N, P, Q, R>(v: ValidatorFunctionList17<I, O, A, B, C, D, E, F, G, H, J, K, L, M, N, P, Q, R>, c?: Partial<ValidatorConfiguration>): AsyncValidatingFunction<I, O>
export function validate<I, O, A, B, C, D, E, F, G, H, J, K, L, M, N, P, Q, R, S>(v: ValidatorFunctionList18<I, O, A, B, C, D, E, F, G, H, J, K, L, M, N, P, Q, R, S>, c?: Partial<ValidatorConfiguration>): AsyncValidatingFunction<I, O>
export function validate<I, O, A, B, C, D, E, F, G, H, J, K, L, M, N, P, Q, R, S, T>(v: ValidatorFunctionList19<I, O, A, B, C, D, E, F, G, H, J, K, L, M, N, P, Q, R, S, T>, c?: Partial<ValidatorConfiguration>): AsyncValidatingFunction<I, O>
export function validate<I, O, A, B, C, D, E, F, G, H, J, K, L, M, N, P, Q, R, S, T, U>(v: ValidatorFunctionList20<I, O, A, B, C, D, E, F, G, H, J, K, L, M, N, P, Q, R, S, T, U>, c?: Partial<ValidatorConfiguration>): AsyncValidatingFunction<I, O>
export function validate<I, O, A, B, C, D, E, F, G, H, J, K, L, M, N, P, Q, R, S, T, U, V>(v: ValidatorFunctionList21<I, O, A, B, C, D, E, F, G, H, J, K, L, M, N, P, Q, R, S, T, U, V>, c?: Partial<ValidatorConfiguration>): AsyncValidatingFunction<I, O>
export function validate<I, O, A, B, C, D, E, F, G, H, J, K, L, M, N, P, Q, R, S, T, U, V, W>(v: ValidatorFunctionList22<I, O, A, B, C, D, E, F, G, H, J, K, L, M, N, P, Q, R, S, T, U, V, W>, c?: Partial<ValidatorConfiguration>): AsyncValidatingFunction<I, O>
export function validate<I, O, A, B, C, D, E, F, G, H, J, K, L, M, N, P, Q, R, S, T, U, V, W, X>(v: ValidatorFunctionList23<I, O, A, B, C, D, E, F, G, H, J, K, L, M, N, P, Q, R, S, T, U, V, W, X>, c?: Partial<ValidatorConfiguration>): AsyncValidatingFunction<I, O>
export function validate<I, O, A, B, C, D, E, F, G, H, J, K, L, M, N, P, Q, R, S, T, U, V, W, X, Y>(v: ValidatorFunctionList24<I, O, A, B, C, D, E, F, G, H, J, K, L, M, N, P, Q, R, S, T, U, V, W, X, Y>, c?: Partial<ValidatorConfiguration>): AsyncValidatingFunction<I, O>
export function validate<I, O, A, B, C, D, E, F, G, H, J, K, L, M, N, P, Q, R, S, T, U, V, W, X, Y, Z>(v: ValidatorFunctionList25<I, O, A, B, C, D, E, F, G, H, J, K, L, M, N, P, Q, R, S, T, U, V, W, X, Y, Z>, c?: Partial<ValidatorConfiguration>): AsyncValidatingFunction<I, O>
export function validate<O>(v: SyncValidatorObject<O>, c?: Partial<ValidatorConfiguration>): SyncValidatingFunction<unknown, O>
export function validate<O>(v: ValidatorObject<O>, c?: Partial<ValidatorConfiguration>): AsyncValidatingFunction<unknown, O>
export function validate<I, O, A, B, C, D, E, F, G, H, J, K, L, M, N, P, Q, R, S, T, U, V, W, X, Y, Z>(v: Validator<I, O, A, B, C, D, E, F, G, H, J, K, L, M, N, P, Q, R, S, T, U, V, W, X, Y, Z>, c?: Partial<ValidatorConfiguration>): ValidatingFunction<I, O>
{
	throw 'testing';
}


const isString: SyncValidatorFunction<unknown, string> = (val) => {
    if (typeof val === 'string') return val; else throw new Error('fuck');
}

const toNumber: SyncValidatorFunction<string, number> = (val) => {
    return Number.parseInt(val);
}

const intoString: SyncValidatorFunction<number, string> = (val) => {
    return val.toString();
}

const isStringP: AsyncValidatorFunction<unknown, string> = (val) => {
    if (typeof val === 'string') return Promise.resolve(val); else return Promise.reject();
}

const toNumberP: AsyncValidatorFunction<string, number> = (val) => {
    return Promise.resolve(Number.parseInt(val));
}

const intoStringP: AsyncValidatorFunction<number, string> = (val) => {
    return Promise.resolve(val.toString());
}

async function test () {
	const fn: string = validate(isString)("")
	const list1: string = validate([isString])("")
	const list2: number = validate([isString, toNumber])("")
	const list3: string = validate([isString, toNumber, intoString])("")
	const obj: {a: number, b: string} = validate({ a: validate([isString, toNumber]), b: isString })("")
	const objObj: {a: { c: number }, b: string} = validate({ a: { c: validate([isString, toNumber]) }, b: isString })("")
	
	const fnP: Promise<string> = validate(isStringP)("")
	const list1P: Promise<string> = validate([isStringP])("")
	const list2P: Promise<number> = validate([isStringP, toNumberP])("")
	const list3P: Promise<string> = validate([isStringP, toNumberP, intoStringP])("")
	const objP: Promise<{a: number, b: string}> = validate({ a: [isStringP, toNumberP], b: isStringP })("")
    const objObjP: Promise<{a: { c: number }, b: string}> = validate({ a: { c: validate([isStringP, toNumberP]) }, b: isString })("")
	
	const fnM: Promise<string> = validate(isStringP)("")
	const list1M: Promise<string> = validate([isStringP])("")
	const list2M: Promise<number> = validate([isString, toNumberP])("")
	const list2M2: Promise<number> = validate([isStringP, toNumber])("")
	const list3M: Promise<string> = validate([isString, toNumberP, intoString])("")

	const objV: {a: string, b: string} = validate({ a: validate(isString), b: isString })("")
	const objL: Promise<string> = validate(validate(isStringP))("")
	const objVF: Promise<{a: string}> = validate({ a: isStringP })("")
    const objA: Promise<string> = validate(validate([isStringP]))("");
	const objI: Promise<{a: string}> = validate({ a: validate([isStringP]) })("")
	const objD: Promise<{a: string, b: string}> = validate({ a: [isStringP, isString], b: isString })("")

    const objE: Promise<{a: {c: string}, b: string}> = validate({ a: { c: [isStringP, isString] }, b: isString })("")

    const objE: Promise<{a: {c: string}, b: string}> = validate({ a: { c: [isStringP, isString] }, b: isString })("")
}

