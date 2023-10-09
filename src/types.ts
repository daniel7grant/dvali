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

export type SyncValidatingFunction<I, O> = O extends Promise<infer _> ? never : (val: I, c?: Partial<ValidatorConfiguration>) => O;
export type SyncValidatingFunctionInner<I, O> = O extends Promise<infer _> ? never : SyncValidatingFunction<I, O>;
export type AsyncValidatingFunction<I, O> = (val: I, c?: Partial<ValidatorConfiguration>) => Promise<O>;
export type ValidatingFunction<I, O> = SyncValidatingFunctionInner<I, O> | AsyncValidatingFunction<I, O>;

export type SyncValidatorFunction<I, O> = (value: I, conf: ValidatorConfiguration) => O;
// This is necessary so sync validators don't eat async validators (SyncValidatorFunction<I, Promise<O>> instead of ValidatorFunction<I, O>)
export type SyncValidatorFunctionInner<I, O> = O extends Promise<infer _> ? never : SyncValidatorFunction<I, O>;
export type AsyncValidatorFunction<I, O> = (value: I, conf: ValidatorConfiguration) => Promise<O>;
export type ValidatorFunction<I, O> = SyncValidatorFunctionInner<I, O> | AsyncValidatorFunction<I, O>;

export type SyncValidatorFunctionList1<I, O> = [SyncValidatorFunctionInner<I, O>];
export type SyncValidatorFunctionList2<I, A, O> = [SyncValidatorFunctionInner<I, A>, SyncValidatorFunctionInner<A, O>];
export type SyncValidatorFunctionList3<I, A, B, O> = [SyncValidatorFunctionInner<I, A>, SyncValidatorFunctionInner<A, B>, SyncValidatorFunctionInner<B, O>];
export type SyncValidatorFunctionList4<I, A, B, C, O> = [SyncValidatorFunctionInner<I, A>, SyncValidatorFunctionInner<A, B>, SyncValidatorFunctionInner<B, C>, SyncValidatorFunctionInner<C, O>];
export type SyncValidatorFunctionList5<I, A, B, C, D, O> = [SyncValidatorFunctionInner<I, A>, SyncValidatorFunctionInner<A, B>, SyncValidatorFunctionInner<B, C>, SyncValidatorFunctionInner<C, D>, SyncValidatorFunctionInner<D, O>];
export type SyncValidatorFunctionList6<I, A, B, C, D, E, O> = [SyncValidatorFunctionInner<I, A>, SyncValidatorFunctionInner<A, B>, SyncValidatorFunctionInner<B, C>, SyncValidatorFunctionInner<C, D>, SyncValidatorFunctionInner<D, E>, SyncValidatorFunctionInner<E, O>];
export type SyncValidatorFunctionList7<I, A, B, C, D, E, F, O> = [SyncValidatorFunctionInner<I, A>, SyncValidatorFunctionInner<A, B>, SyncValidatorFunctionInner<B, C>, SyncValidatorFunctionInner<C, D>, SyncValidatorFunctionInner<D, E>, SyncValidatorFunctionInner<E, F>, SyncValidatorFunctionInner<F, O>];
export type SyncValidatorFunctionList8<I, A, B, C, D, E, F, G, O> = [SyncValidatorFunctionInner<I, A>, SyncValidatorFunctionInner<A, B>, SyncValidatorFunctionInner<B, C>, SyncValidatorFunctionInner<C, D>, SyncValidatorFunctionInner<D, E>, SyncValidatorFunctionInner<E, F>, SyncValidatorFunctionInner<F, G>, SyncValidatorFunctionInner<G, O>];
export type SyncValidatorFunctionList9<I, A, B, C, D, E, F, G, H, O> = [SyncValidatorFunctionInner<I, A>, SyncValidatorFunctionInner<A, B>, SyncValidatorFunctionInner<B, C>, SyncValidatorFunctionInner<C, D>, SyncValidatorFunctionInner<D, E>, SyncValidatorFunctionInner<E, F>, SyncValidatorFunctionInner<F, G>, SyncValidatorFunctionInner<G, H>, SyncValidatorFunctionInner<H, O>];
export type SyncValidatorFunctionList10<I, A, B, C, D, E, F, G, H, J, O> = [SyncValidatorFunctionInner<I, A>, SyncValidatorFunctionInner<A, B>, SyncValidatorFunctionInner<B, C>, SyncValidatorFunctionInner<C, D>, SyncValidatorFunctionInner<D, E>, SyncValidatorFunctionInner<E, F>, SyncValidatorFunctionInner<F, G>, SyncValidatorFunctionInner<G, H>, SyncValidatorFunctionInner<H, J>, SyncValidatorFunctionInner<J, O>];
export type SyncValidatorFunctionList11<I, A, B, C, D, E, F, G, H, J, K, O> = [SyncValidatorFunctionInner<I, A>, SyncValidatorFunctionInner<A, B>, SyncValidatorFunctionInner<B, C>, SyncValidatorFunctionInner<C, D>, SyncValidatorFunctionInner<D, E>, SyncValidatorFunctionInner<E, F>, SyncValidatorFunctionInner<F, G>, SyncValidatorFunctionInner<G, H>, SyncValidatorFunctionInner<H, J>, SyncValidatorFunctionInner<J, K>, SyncValidatorFunctionInner<K, O>];
export type SyncValidatorFunctionList12<I, A, B, C, D, E, F, G, H, J, K, L, O> = [SyncValidatorFunctionInner<I, A>, SyncValidatorFunctionInner<A, B>, SyncValidatorFunctionInner<B, C>, SyncValidatorFunctionInner<C, D>, SyncValidatorFunctionInner<D, E>, SyncValidatorFunctionInner<E, F>, SyncValidatorFunctionInner<F, G>, SyncValidatorFunctionInner<G, H>, SyncValidatorFunctionInner<H, J>, SyncValidatorFunctionInner<J, K>, SyncValidatorFunctionInner<K, L>, SyncValidatorFunctionInner<L, O>];
export type SyncValidatorFunctionList13<I, A, B, C, D, E, F, G, H, J, K, L, M, O> = [SyncValidatorFunctionInner<I, A>, SyncValidatorFunctionInner<A, B>, SyncValidatorFunctionInner<B, C>, SyncValidatorFunctionInner<C, D>, SyncValidatorFunctionInner<D, E>, SyncValidatorFunctionInner<E, F>, SyncValidatorFunctionInner<F, G>, SyncValidatorFunctionInner<G, H>, SyncValidatorFunctionInner<H, J>, SyncValidatorFunctionInner<J, K>, SyncValidatorFunctionInner<K, L>, SyncValidatorFunctionInner<L, M>, SyncValidatorFunctionInner<M, O>];
export type SyncValidatorFunctionList14<I, A, B, C, D, E, F, G, H, J, K, L, M, P, O> = [SyncValidatorFunctionInner<I, A>, SyncValidatorFunctionInner<A, B>, SyncValidatorFunctionInner<B, C>, SyncValidatorFunctionInner<C, D>, SyncValidatorFunctionInner<D, E>, SyncValidatorFunctionInner<E, F>, SyncValidatorFunctionInner<F, G>, SyncValidatorFunctionInner<G, H>, SyncValidatorFunctionInner<H, J>, SyncValidatorFunctionInner<J, K>, SyncValidatorFunctionInner<K, L>, SyncValidatorFunctionInner<L, M>, SyncValidatorFunctionInner<M, P>, SyncValidatorFunctionInner<P, O>];
export type SyncValidatorFunctionList15<I, A, B, C, D, E, F, G, H, J, K, L, M, P, Q, O> = [SyncValidatorFunctionInner<I, A>, SyncValidatorFunctionInner<A, B>, SyncValidatorFunctionInner<B, C>, SyncValidatorFunctionInner<C, D>, SyncValidatorFunctionInner<D, E>, SyncValidatorFunctionInner<E, F>, SyncValidatorFunctionInner<F, G>, SyncValidatorFunctionInner<G, H>, SyncValidatorFunctionInner<H, J>, SyncValidatorFunctionInner<J, K>, SyncValidatorFunctionInner<K, L>, SyncValidatorFunctionInner<L, M>, SyncValidatorFunctionInner<M, P>, SyncValidatorFunctionInner<P, Q>, SyncValidatorFunctionInner<Q, O>];
export type SyncValidatorFunctionList16<I, A, B, C, D, E, F, G, H, J, K, L, M, P, Q, R, O> = [SyncValidatorFunctionInner<I, A>, SyncValidatorFunctionInner<A, B>, SyncValidatorFunctionInner<B, C>, SyncValidatorFunctionInner<C, D>, SyncValidatorFunctionInner<D, E>, SyncValidatorFunctionInner<E, F>, SyncValidatorFunctionInner<F, G>, SyncValidatorFunctionInner<G, H>, SyncValidatorFunctionInner<H, J>, SyncValidatorFunctionInner<J, K>, SyncValidatorFunctionInner<K, L>, SyncValidatorFunctionInner<L, M>, SyncValidatorFunctionInner<M, P>, SyncValidatorFunctionInner<P, Q>, SyncValidatorFunctionInner<Q, R>, SyncValidatorFunctionInner<R, O>];
export type SyncValidatorFunctionList17<I, A, B, C, D, E, F, G, H, J, K, L, M, P, Q, R, S, O> = [SyncValidatorFunctionInner<I, A>, SyncValidatorFunctionInner<A, B>, SyncValidatorFunctionInner<B, C>, SyncValidatorFunctionInner<C, D>, SyncValidatorFunctionInner<D, E>, SyncValidatorFunctionInner<E, F>, SyncValidatorFunctionInner<F, G>, SyncValidatorFunctionInner<G, H>, SyncValidatorFunctionInner<H, J>, SyncValidatorFunctionInner<J, K>, SyncValidatorFunctionInner<K, L>, SyncValidatorFunctionInner<L, M>, SyncValidatorFunctionInner<M, P>, SyncValidatorFunctionInner<P, Q>, SyncValidatorFunctionInner<Q, R>, SyncValidatorFunctionInner<R, S>, SyncValidatorFunctionInner<S, O>];
export type SyncValidatorFunctionList18<I, A, B, C, D, E, F, G, H, J, K, L, M, P, Q, R, S, T, O> = [SyncValidatorFunctionInner<I, A>, SyncValidatorFunctionInner<A, B>, SyncValidatorFunctionInner<B, C>, SyncValidatorFunctionInner<C, D>, SyncValidatorFunctionInner<D, E>, SyncValidatorFunctionInner<E, F>, SyncValidatorFunctionInner<F, G>, SyncValidatorFunctionInner<G, H>, SyncValidatorFunctionInner<H, J>, SyncValidatorFunctionInner<J, K>, SyncValidatorFunctionInner<K, L>, SyncValidatorFunctionInner<L, M>, SyncValidatorFunctionInner<M, P>, SyncValidatorFunctionInner<P, Q>, SyncValidatorFunctionInner<Q, R>, SyncValidatorFunctionInner<R, S>, SyncValidatorFunctionInner<S, T>, SyncValidatorFunctionInner<T, O>];
export type SyncValidatorFunctionList19<I, A, B, C, D, E, F, G, H, J, K, L, M, P, Q, R, S, T, U, O> = [SyncValidatorFunctionInner<I, A>, SyncValidatorFunctionInner<A, B>, SyncValidatorFunctionInner<B, C>, SyncValidatorFunctionInner<C, D>, SyncValidatorFunctionInner<D, E>, SyncValidatorFunctionInner<E, F>, SyncValidatorFunctionInner<F, G>, SyncValidatorFunctionInner<G, H>, SyncValidatorFunctionInner<H, J>, SyncValidatorFunctionInner<J, K>, SyncValidatorFunctionInner<K, L>, SyncValidatorFunctionInner<L, M>, SyncValidatorFunctionInner<M, P>, SyncValidatorFunctionInner<P, Q>, SyncValidatorFunctionInner<Q, R>, SyncValidatorFunctionInner<R, S>, SyncValidatorFunctionInner<S, T>, SyncValidatorFunctionInner<T, U>, SyncValidatorFunctionInner<U, O>];
export type SyncValidatorFunctionList20<I, A, B, C, D, E, F, G, H, J, K, L, M, P, Q, R, S, T, U, V, O> = [SyncValidatorFunctionInner<I, A>, SyncValidatorFunctionInner<A, B>, SyncValidatorFunctionInner<B, C>, SyncValidatorFunctionInner<C, D>, SyncValidatorFunctionInner<D, E>, SyncValidatorFunctionInner<E, F>, SyncValidatorFunctionInner<F, G>, SyncValidatorFunctionInner<G, H>, SyncValidatorFunctionInner<H, J>, SyncValidatorFunctionInner<J, K>, SyncValidatorFunctionInner<K, L>, SyncValidatorFunctionInner<L, M>, SyncValidatorFunctionInner<M, P>, SyncValidatorFunctionInner<P, Q>, SyncValidatorFunctionInner<Q, R>, SyncValidatorFunctionInner<R, S>, SyncValidatorFunctionInner<S, T>, SyncValidatorFunctionInner<T, U>, SyncValidatorFunctionInner<U, V>, SyncValidatorFunctionInner<V, O>];
export type SyncValidatorFunctionList21<I, A, B, C, D, E, F, G, H, J, K, L, M, P, Q, R, S, T, U, V, W, O> = [SyncValidatorFunctionInner<I, A>, SyncValidatorFunctionInner<A, B>, SyncValidatorFunctionInner<B, C>, SyncValidatorFunctionInner<C, D>, SyncValidatorFunctionInner<D, E>, SyncValidatorFunctionInner<E, F>, SyncValidatorFunctionInner<F, G>, SyncValidatorFunctionInner<G, H>, SyncValidatorFunctionInner<H, J>, SyncValidatorFunctionInner<J, K>, SyncValidatorFunctionInner<K, L>, SyncValidatorFunctionInner<L, M>, SyncValidatorFunctionInner<M, P>, SyncValidatorFunctionInner<P, Q>, SyncValidatorFunctionInner<Q, R>, SyncValidatorFunctionInner<R, S>, SyncValidatorFunctionInner<S, T>, SyncValidatorFunctionInner<T, U>, SyncValidatorFunctionInner<U, V>, SyncValidatorFunctionInner<V, W>, SyncValidatorFunctionInner<W, O>];
export type SyncValidatorFunctionList22<I, A, B, C, D, E, F, G, H, J, K, L, M, P, Q, R, S, T, U, V, W, X, O> = [SyncValidatorFunctionInner<I, A>, SyncValidatorFunctionInner<A, B>, SyncValidatorFunctionInner<B, C>, SyncValidatorFunctionInner<C, D>, SyncValidatorFunctionInner<D, E>, SyncValidatorFunctionInner<E, F>, SyncValidatorFunctionInner<F, G>, SyncValidatorFunctionInner<G, H>, SyncValidatorFunctionInner<H, J>, SyncValidatorFunctionInner<J, K>, SyncValidatorFunctionInner<K, L>, SyncValidatorFunctionInner<L, M>, SyncValidatorFunctionInner<M, P>, SyncValidatorFunctionInner<P, Q>, SyncValidatorFunctionInner<Q, R>, SyncValidatorFunctionInner<R, S>, SyncValidatorFunctionInner<S, T>, SyncValidatorFunctionInner<T, U>, SyncValidatorFunctionInner<U, V>, SyncValidatorFunctionInner<V, W>, SyncValidatorFunctionInner<W, X>, SyncValidatorFunctionInner<X, O>];
export type SyncValidatorFunctionList23<I, A, B, C, D, E, F, G, H, J, K, L, M, P, Q, R, S, T, U, V, W, X, Y, O> = [SyncValidatorFunctionInner<I, A>, SyncValidatorFunctionInner<A, B>, SyncValidatorFunctionInner<B, C>, SyncValidatorFunctionInner<C, D>, SyncValidatorFunctionInner<D, E>, SyncValidatorFunctionInner<E, F>, SyncValidatorFunctionInner<F, G>, SyncValidatorFunctionInner<G, H>, SyncValidatorFunctionInner<H, J>, SyncValidatorFunctionInner<J, K>, SyncValidatorFunctionInner<K, L>, SyncValidatorFunctionInner<L, M>, SyncValidatorFunctionInner<M, P>, SyncValidatorFunctionInner<P, Q>, SyncValidatorFunctionInner<Q, R>, SyncValidatorFunctionInner<R, S>, SyncValidatorFunctionInner<S, T>, SyncValidatorFunctionInner<T, U>, SyncValidatorFunctionInner<U, V>, SyncValidatorFunctionInner<V, W>, SyncValidatorFunctionInner<W, X>, SyncValidatorFunctionInner<X, Y>, SyncValidatorFunctionInner<Y, O>];
export type SyncValidatorFunctionList24<I, A, B, C, D, E, F, G, H, J, K, L, M, P, Q, R, S, T, U, V, W, X, Y, Z, O> = [SyncValidatorFunctionInner<I, A>, SyncValidatorFunctionInner<A, B>, SyncValidatorFunctionInner<B, C>, SyncValidatorFunctionInner<C, D>, SyncValidatorFunctionInner<D, E>, SyncValidatorFunctionInner<E, F>, SyncValidatorFunctionInner<F, G>, SyncValidatorFunctionInner<G, H>, SyncValidatorFunctionInner<H, J>, SyncValidatorFunctionInner<J, K>, SyncValidatorFunctionInner<K, L>, SyncValidatorFunctionInner<L, M>, SyncValidatorFunctionInner<M, P>, SyncValidatorFunctionInner<P, Q>, SyncValidatorFunctionInner<Q, R>, SyncValidatorFunctionInner<R, S>, SyncValidatorFunctionInner<S, T>, SyncValidatorFunctionInner<T, U>, SyncValidatorFunctionInner<U, V>, SyncValidatorFunctionInner<V, W>, SyncValidatorFunctionInner<W, X>, SyncValidatorFunctionInner<X, Y>, SyncValidatorFunctionInner<Y, Z>, SyncValidatorFunctionInner<Z, O>];
export type SyncValidatorFunctionList<I, A, B, C, D, E, F, G, H, J, K, L, M, P, Q, R, S, T, U, V, W, X, Y, Z, O> =
    | SyncValidatorFunctionList1<I, O>
    | SyncValidatorFunctionList2<I, A, O>
    | SyncValidatorFunctionList3<I, A, B, O>
    | SyncValidatorFunctionList4<I, A, B, C, O>
    | SyncValidatorFunctionList5<I, A, B, C, D, O>
    | SyncValidatorFunctionList6<I, A, B, C, D, E, O>
    | SyncValidatorFunctionList7<I, A, B, C, D, E, F, O>
    | SyncValidatorFunctionList8<I, A, B, C, D, E, F, G, O>
    | SyncValidatorFunctionList9<I, A, B, C, D, E, F, G, H, O>
    | SyncValidatorFunctionList10<I, A, B, C, D, E, F, G, H, J, O>
    | SyncValidatorFunctionList11<I, A, B, C, D, E, F, G, H, J, K, O>
    | SyncValidatorFunctionList12<I, A, B, C, D, E, F, G, H, J, K, L, O>
    | SyncValidatorFunctionList13<I, A, B, C, D, E, F, G, H, J, K, L, M, O>
    | SyncValidatorFunctionList14<I, A, B, C, D, E, F, G, H, J, K, L, M, P, O>
    | SyncValidatorFunctionList15<I, A, B, C, D, E, F, G, H, J, K, L, M, P, Q, O>
    | SyncValidatorFunctionList16<I, A, B, C, D, E, F, G, H, J, K, L, M, P, Q, R, O>
    | SyncValidatorFunctionList17<I, A, B, C, D, E, F, G, H, J, K, L, M, P, Q, R, S, O>
    | SyncValidatorFunctionList18<I, A, B, C, D, E, F, G, H, J, K, L, M, P, Q, R, S, T, O>
    | SyncValidatorFunctionList19<I, A, B, C, D, E, F, G, H, J, K, L, M, P, Q, R, S, T, U, O>
    | SyncValidatorFunctionList20<I, A, B, C, D, E, F, G, H, J, K, L, M, P, Q, R, S, T, U, V, O>
    | SyncValidatorFunctionList21<I, A, B, C, D, E, F, G, H, J, K, L, M, P, Q, R, S, T, U, V, W, O>
    | SyncValidatorFunctionList22<I, A, B, C, D, E, F, G, H, J, K, L, M, P, Q, R, S, T, U, V, W, X, O>
    | SyncValidatorFunctionList23<I, A, B, C, D, E, F, G, H, J, K, L, M, P, Q, R, S, T, U, V, W, X, Y, O>
    | SyncValidatorFunctionList24<I, A, B, C, D, E, F, G, H, J, K, L, M, P, Q, R, S, T, U, V, W, X, Y, Z, O>;

export type ValidatorFunctionList1<I, O> = [ValidatorFunction<I, O>];
export type ValidatorFunctionList2<I, A, O> = [ValidatorFunction<I, A>, ValidatorFunction<A, O>];
export type ValidatorFunctionList3<I, A, B, O> = [ValidatorFunction<I, A>, ValidatorFunction<A, B>, ValidatorFunction<B, O>];
export type ValidatorFunctionList4<I, A, B, C, O> = [ValidatorFunction<I, A>, ValidatorFunction<A, B>, ValidatorFunction<B, C>, ValidatorFunction<C, O>];
export type ValidatorFunctionList5<I, A, B, C, D, O> = [ValidatorFunction<I, A>, ValidatorFunction<A, B>, ValidatorFunction<B, C>, ValidatorFunction<C, D>, ValidatorFunction<D, O>];
export type ValidatorFunctionList6<I, A, B, C, D, E, O> = [ValidatorFunction<I, A>, ValidatorFunction<A, B>, ValidatorFunction<B, C>, ValidatorFunction<C, D>, ValidatorFunction<D, E>, ValidatorFunction<E, O>];
export type ValidatorFunctionList7<I, A, B, C, D, E, F, O> = [ValidatorFunction<I, A>, ValidatorFunction<A, B>, ValidatorFunction<B, C>, ValidatorFunction<C, D>, ValidatorFunction<D, E>, ValidatorFunction<E, F>, ValidatorFunction<F, O>];
export type ValidatorFunctionList8<I, A, B, C, D, E, F, G, O> = [ValidatorFunction<I, A>, ValidatorFunction<A, B>, ValidatorFunction<B, C>, ValidatorFunction<C, D>, ValidatorFunction<D, E>, ValidatorFunction<E, F>, ValidatorFunction<F, G>, ValidatorFunction<G, O>];
export type ValidatorFunctionList9<I, A, B, C, D, E, F, G, H, O> = [ValidatorFunction<I, A>, ValidatorFunction<A, B>, ValidatorFunction<B, C>, ValidatorFunction<C, D>, ValidatorFunction<D, E>, ValidatorFunction<E, F>, ValidatorFunction<F, G>, ValidatorFunction<G, H>, ValidatorFunction<H, O>];
export type ValidatorFunctionList10<I, A, B, C, D, E, F, G, H, J, O> = [ValidatorFunction<I, A>, ValidatorFunction<A, B>, ValidatorFunction<B, C>, ValidatorFunction<C, D>, ValidatorFunction<D, E>, ValidatorFunction<E, F>, ValidatorFunction<F, G>, ValidatorFunction<G, H>, ValidatorFunction<H, J>, ValidatorFunction<J, O>];
export type ValidatorFunctionList11<I, A, B, C, D, E, F, G, H, J, K, O> = [ValidatorFunction<I, A>, ValidatorFunction<A, B>, ValidatorFunction<B, C>, ValidatorFunction<C, D>, ValidatorFunction<D, E>, ValidatorFunction<E, F>, ValidatorFunction<F, G>, ValidatorFunction<G, H>, ValidatorFunction<H, J>, ValidatorFunction<J, K>, ValidatorFunction<K, O>];
export type ValidatorFunctionList12<I, A, B, C, D, E, F, G, H, J, K, L, O> = [ValidatorFunction<I, A>, ValidatorFunction<A, B>, ValidatorFunction<B, C>, ValidatorFunction<C, D>, ValidatorFunction<D, E>, ValidatorFunction<E, F>, ValidatorFunction<F, G>, ValidatorFunction<G, H>, ValidatorFunction<H, J>, ValidatorFunction<J, K>, ValidatorFunction<K, L>, ValidatorFunction<L, O>];
export type ValidatorFunctionList13<I, A, B, C, D, E, F, G, H, J, K, L, M, O> = [ValidatorFunction<I, A>, ValidatorFunction<A, B>, ValidatorFunction<B, C>, ValidatorFunction<C, D>, ValidatorFunction<D, E>, ValidatorFunction<E, F>, ValidatorFunction<F, G>, ValidatorFunction<G, H>, ValidatorFunction<H, J>, ValidatorFunction<J, K>, ValidatorFunction<K, L>, ValidatorFunction<L, M>, ValidatorFunction<M, O>];
export type ValidatorFunctionList14<I, A, B, C, D, E, F, G, H, J, K, L, M, P, O> = [ValidatorFunction<I, A>, ValidatorFunction<A, B>, ValidatorFunction<B, C>, ValidatorFunction<C, D>, ValidatorFunction<D, E>, ValidatorFunction<E, F>, ValidatorFunction<F, G>, ValidatorFunction<G, H>, ValidatorFunction<H, J>, ValidatorFunction<J, K>, ValidatorFunction<K, L>, ValidatorFunction<L, M>, ValidatorFunction<M, P>, ValidatorFunction<P, O>];
export type ValidatorFunctionList15<I, A, B, C, D, E, F, G, H, J, K, L, M, P, Q, O> = [ValidatorFunction<I, A>, ValidatorFunction<A, B>, ValidatorFunction<B, C>, ValidatorFunction<C, D>, ValidatorFunction<D, E>, ValidatorFunction<E, F>, ValidatorFunction<F, G>, ValidatorFunction<G, H>, ValidatorFunction<H, J>, ValidatorFunction<J, K>, ValidatorFunction<K, L>, ValidatorFunction<L, M>, ValidatorFunction<M, P>, ValidatorFunction<P, Q>, ValidatorFunction<Q, O>];
export type ValidatorFunctionList16<I, A, B, C, D, E, F, G, H, J, K, L, M, P, Q, R, O> = [ValidatorFunction<I, A>, ValidatorFunction<A, B>, ValidatorFunction<B, C>, ValidatorFunction<C, D>, ValidatorFunction<D, E>, ValidatorFunction<E, F>, ValidatorFunction<F, G>, ValidatorFunction<G, H>, ValidatorFunction<H, J>, ValidatorFunction<J, K>, ValidatorFunction<K, L>, ValidatorFunction<L, M>, ValidatorFunction<M, P>, ValidatorFunction<P, Q>, ValidatorFunction<Q, R>, ValidatorFunction<R, O>];
export type ValidatorFunctionList17<I, A, B, C, D, E, F, G, H, J, K, L, M, P, Q, R, S, O> = [ValidatorFunction<I, A>, ValidatorFunction<A, B>, ValidatorFunction<B, C>, ValidatorFunction<C, D>, ValidatorFunction<D, E>, ValidatorFunction<E, F>, ValidatorFunction<F, G>, ValidatorFunction<G, H>, ValidatorFunction<H, J>, ValidatorFunction<J, K>, ValidatorFunction<K, L>, ValidatorFunction<L, M>, ValidatorFunction<M, P>, ValidatorFunction<P, Q>, ValidatorFunction<Q, R>, ValidatorFunction<R, S>, ValidatorFunction<S, O>];
export type ValidatorFunctionList18<I, A, B, C, D, E, F, G, H, J, K, L, M, P, Q, R, S, T, O> = [ValidatorFunction<I, A>, ValidatorFunction<A, B>, ValidatorFunction<B, C>, ValidatorFunction<C, D>, ValidatorFunction<D, E>, ValidatorFunction<E, F>, ValidatorFunction<F, G>, ValidatorFunction<G, H>, ValidatorFunction<H, J>, ValidatorFunction<J, K>, ValidatorFunction<K, L>, ValidatorFunction<L, M>, ValidatorFunction<M, P>, ValidatorFunction<P, Q>, ValidatorFunction<Q, R>, ValidatorFunction<R, S>, ValidatorFunction<S, T>, ValidatorFunction<T, O>];
export type ValidatorFunctionList19<I, A, B, C, D, E, F, G, H, J, K, L, M, P, Q, R, S, T, U, O> = [ValidatorFunction<I, A>, ValidatorFunction<A, B>, ValidatorFunction<B, C>, ValidatorFunction<C, D>, ValidatorFunction<D, E>, ValidatorFunction<E, F>, ValidatorFunction<F, G>, ValidatorFunction<G, H>, ValidatorFunction<H, J>, ValidatorFunction<J, K>, ValidatorFunction<K, L>, ValidatorFunction<L, M>, ValidatorFunction<M, P>, ValidatorFunction<P, Q>, ValidatorFunction<Q, R>, ValidatorFunction<R, S>, ValidatorFunction<S, T>, ValidatorFunction<T, U>, ValidatorFunction<U, O>];
export type ValidatorFunctionList20<I, A, B, C, D, E, F, G, H, J, K, L, M, P, Q, R, S, T, U, V, O> = [ValidatorFunction<I, A>, ValidatorFunction<A, B>, ValidatorFunction<B, C>, ValidatorFunction<C, D>, ValidatorFunction<D, E>, ValidatorFunction<E, F>, ValidatorFunction<F, G>, ValidatorFunction<G, H>, ValidatorFunction<H, J>, ValidatorFunction<J, K>, ValidatorFunction<K, L>, ValidatorFunction<L, M>, ValidatorFunction<M, P>, ValidatorFunction<P, Q>, ValidatorFunction<Q, R>, ValidatorFunction<R, S>, ValidatorFunction<S, T>, ValidatorFunction<T, U>, ValidatorFunction<U, V>, ValidatorFunction<V, O>];
export type ValidatorFunctionList21<I, A, B, C, D, E, F, G, H, J, K, L, M, P, Q, R, S, T, U, V, W, O> = [ValidatorFunction<I, A>, ValidatorFunction<A, B>, ValidatorFunction<B, C>, ValidatorFunction<C, D>, ValidatorFunction<D, E>, ValidatorFunction<E, F>, ValidatorFunction<F, G>, ValidatorFunction<G, H>, ValidatorFunction<H, J>, ValidatorFunction<J, K>, ValidatorFunction<K, L>, ValidatorFunction<L, M>, ValidatorFunction<M, P>, ValidatorFunction<P, Q>, ValidatorFunction<Q, R>, ValidatorFunction<R, S>, ValidatorFunction<S, T>, ValidatorFunction<T, U>, ValidatorFunction<U, V>, ValidatorFunction<V, W>, ValidatorFunction<W, O>];
export type ValidatorFunctionList22<I, A, B, C, D, E, F, G, H, J, K, L, M, P, Q, R, S, T, U, V, W, X, O> = [ValidatorFunction<I, A>, ValidatorFunction<A, B>, ValidatorFunction<B, C>, ValidatorFunction<C, D>, ValidatorFunction<D, E>, ValidatorFunction<E, F>, ValidatorFunction<F, G>, ValidatorFunction<G, H>, ValidatorFunction<H, J>, ValidatorFunction<J, K>, ValidatorFunction<K, L>, ValidatorFunction<L, M>, ValidatorFunction<M, P>, ValidatorFunction<P, Q>, ValidatorFunction<Q, R>, ValidatorFunction<R, S>, ValidatorFunction<S, T>, ValidatorFunction<T, U>, ValidatorFunction<U, V>, ValidatorFunction<V, W>, ValidatorFunction<W, X>, ValidatorFunction<X, O>];
export type ValidatorFunctionList23<I, A, B, C, D, E, F, G, H, J, K, L, M, P, Q, R, S, T, U, V, W, X, Y, O> = [ValidatorFunction<I, A>, ValidatorFunction<A, B>, ValidatorFunction<B, C>, ValidatorFunction<C, D>, ValidatorFunction<D, E>, ValidatorFunction<E, F>, ValidatorFunction<F, G>, ValidatorFunction<G, H>, ValidatorFunction<H, J>, ValidatorFunction<J, K>, ValidatorFunction<K, L>, ValidatorFunction<L, M>, ValidatorFunction<M, P>, ValidatorFunction<P, Q>, ValidatorFunction<Q, R>, ValidatorFunction<R, S>, ValidatorFunction<S, T>, ValidatorFunction<T, U>, ValidatorFunction<U, V>, ValidatorFunction<V, W>, ValidatorFunction<W, X>, ValidatorFunction<X, Y>, ValidatorFunction<Y, O>];
export type ValidatorFunctionList24<I, A, B, C, D, E, F, G, H, J, K, L, M, P, Q, R, S, T, U, V, W, X, Y, Z, O> = [ValidatorFunction<I, A>, ValidatorFunction<A, B>, ValidatorFunction<B, C>, ValidatorFunction<C, D>, ValidatorFunction<D, E>, ValidatorFunction<E, F>, ValidatorFunction<F, G>, ValidatorFunction<G, H>, ValidatorFunction<H, J>, ValidatorFunction<J, K>, ValidatorFunction<K, L>, ValidatorFunction<L, M>, ValidatorFunction<M, P>, ValidatorFunction<P, Q>, ValidatorFunction<Q, R>, ValidatorFunction<R, S>, ValidatorFunction<S, T>, ValidatorFunction<T, U>, ValidatorFunction<U, V>, ValidatorFunction<V, W>, ValidatorFunction<W, X>, ValidatorFunction<X, Y>, ValidatorFunction<Y, Z>, ValidatorFunction<Z, O>];
export type ValidatorFunctionList<I, A, B, C, D, E, F, G, H, J, K, L, M, P, Q, R, S, T, U, V, W, X, Y, Z, O> =
    | ValidatorFunctionList1<I, O>
    | ValidatorFunctionList2<I, A, O>
    | ValidatorFunctionList3<I, A, B, O>
    | ValidatorFunctionList4<I, A, B, C, O>
    | ValidatorFunctionList5<I, A, B, C, D, O>
    | ValidatorFunctionList6<I, A, B, C, D, E, O>
    | ValidatorFunctionList7<I, A, B, C, D, E, F, O>
    | ValidatorFunctionList8<I, A, B, C, D, E, F, G, O>
    | ValidatorFunctionList9<I, A, B, C, D, E, F, G, H, O>
    | ValidatorFunctionList10<I, A, B, C, D, E, F, G, H, J, O>
    | ValidatorFunctionList11<I, A, B, C, D, E, F, G, H, J, K, O>
    | ValidatorFunctionList12<I, A, B, C, D, E, F, G, H, J, K, L, O>
    | ValidatorFunctionList13<I, A, B, C, D, E, F, G, H, J, K, L, M, O>
    | ValidatorFunctionList14<I, A, B, C, D, E, F, G, H, J, K, L, M, P, O>
    | ValidatorFunctionList15<I, A, B, C, D, E, F, G, H, J, K, L, M, P, Q, O>
    | ValidatorFunctionList16<I, A, B, C, D, E, F, G, H, J, K, L, M, P, Q, R, O>
    | ValidatorFunctionList17<I, A, B, C, D, E, F, G, H, J, K, L, M, P, Q, R, S, O>
    | ValidatorFunctionList18<I, A, B, C, D, E, F, G, H, J, K, L, M, P, Q, R, S, T, O>
    | ValidatorFunctionList19<I, A, B, C, D, E, F, G, H, J, K, L, M, P, Q, R, S, T, U, O>
    | ValidatorFunctionList20<I, A, B, C, D, E, F, G, H, J, K, L, M, P, Q, R, S, T, U, V, O>
    | ValidatorFunctionList21<I, A, B, C, D, E, F, G, H, J, K, L, M, P, Q, R, S, T, U, V, W, O>
    | ValidatorFunctionList22<I, A, B, C, D, E, F, G, H, J, K, L, M, P, Q, R, S, T, U, V, W, X, O>
    | ValidatorFunctionList23<I, A, B, C, D, E, F, G, H, J, K, L, M, P, Q, R, S, T, U, V, W, X, Y, O>
    | ValidatorFunctionList24<I, A, B, C, D, E, F, G, H, J, K, L, M, P, Q, R, S, T, U, V, W, X, Y, Z, O>;

// Value validators are necessary, because we don't have generics in mapped types.
// Validator object values only support the return type of last validator function.
export type SyncValueValidator<O> = SyncValidatorFunctionList1<any, O> | SyncValidatorFunctionList2<any, any, O> | SyncValidatorFunctionList3<any, any, any, O> | SyncValidatorFunctionInner<any, O> | SyncValidatingFunction<any, O> | SyncValidatorObject<O>;
export type SyncValidatorObject<O> = {
    [key in keyof O]: SyncValueValidator<O[key]>;
};
export type ValueValidator<O> = ValidatorFunctionList1<any, O> | ValidatorFunctionList2<any, any, O> | ValidatorFunctionList3<any, any, any, O> | ValidatorFunction<any, O> | ValidatingFunction<any, O> | ValidatorObject<O>;
export type ValidatorObject<O> = {
    [key in keyof O]: ValueValidator<O[key]>;
};

export type SyncValidatorInner<I, A, B, C, D, E, F, G, H, J, K, L, M, P, Q, R, S, T, U, V, W, X, Y, Z, O> =
    | SyncValidatorFunctionList1<I, O>
    | SyncValidatorFunctionList2<I, A, O>
    | SyncValidatorFunctionList3<I, A, B, O>
    | SyncValidatorFunctionList4<I, A, B, C, O>
    | SyncValidatorFunctionList5<I, A, B, C, D, O>
    | SyncValidatorFunctionList6<I, A, B, C, D, E, O>
    | SyncValidatorFunctionList7<I, A, B, C, D, E, F, O>
    | SyncValidatorFunctionList8<I, A, B, C, D, E, F, G, O>
    | SyncValidatorFunctionList9<I, A, B, C, D, E, F, G, H, O>
    | SyncValidatorFunctionList10<I, A, B, C, D, E, F, G, H, J, O>
    | SyncValidatorFunctionList11<I, A, B, C, D, E, F, G, H, J, K, O>
    | SyncValidatorFunctionList12<I, A, B, C, D, E, F, G, H, J, K, L, O>
    | SyncValidatorFunctionList13<I, A, B, C, D, E, F, G, H, J, K, L, M, O>
    | SyncValidatorFunctionList14<I, A, B, C, D, E, F, G, H, J, K, L, M, P, O>
    | SyncValidatorFunctionList15<I, A, B, C, D, E, F, G, H, J, K, L, M, P, Q, O>
    | SyncValidatorFunctionList16<I, A, B, C, D, E, F, G, H, J, K, L, M, P, Q, R, O>
    | SyncValidatorFunctionList17<I, A, B, C, D, E, F, G, H, J, K, L, M, P, Q, R, S, O>
    | SyncValidatorFunctionList18<I, A, B, C, D, E, F, G, H, J, K, L, M, P, Q, R, S, T, O>
    | SyncValidatorFunctionList19<I, A, B, C, D, E, F, G, H, J, K, L, M, P, Q, R, S, T, U, O>
    | SyncValidatorFunctionList20<I, A, B, C, D, E, F, G, H, J, K, L, M, P, Q, R, S, T, U, V, O>
    | SyncValidatorFunctionList21<I, A, B, C, D, E, F, G, H, J, K, L, M, P, Q, R, S, T, U, V, W, O>
    | SyncValidatorFunctionList22<I, A, B, C, D, E, F, G, H, J, K, L, M, P, Q, R, S, T, U, V, W, X, O>
    | SyncValidatorFunctionList23<I, A, B, C, D, E, F, G, H, J, K, L, M, P, Q, R, S, T, U, V, W, X, Y, O>
    | SyncValidatorFunctionList24<I, A, B, C, D, E, F, G, H, J, K, L, M, P, Q, R, S, T, U, V, W, X, Y, Z, O>
    | SyncValidatorFunctionInner<I, O>
    | SyncValidatorObject<O>;
export type ValidatorInner<I, A, B, C, D, E, F, G, H, J, K, L, M, P, Q, R, S, T, U, V, W, X, Y, Z, O> =
    | ValidatorFunctionList1<I, O>
    | ValidatorFunctionList2<I, A, O>
    | ValidatorFunctionList3<I, A, B, O>
    | ValidatorFunctionList4<I, A, B, C, O>
    | ValidatorFunctionList5<I, A, B, C, D, O>
    | ValidatorFunctionList6<I, A, B, C, D, E, O>
    | ValidatorFunctionList7<I, A, B, C, D, E, F, O>
    | ValidatorFunctionList8<I, A, B, C, D, E, F, G, O>
    | ValidatorFunctionList9<I, A, B, C, D, E, F, G, H, O>
    | ValidatorFunctionList10<I, A, B, C, D, E, F, G, H, J, O>
    | ValidatorFunctionList11<I, A, B, C, D, E, F, G, H, J, K, O>
    | ValidatorFunctionList12<I, A, B, C, D, E, F, G, H, J, K, L, O>
    | ValidatorFunctionList13<I, A, B, C, D, E, F, G, H, J, K, L, M, O>
    | ValidatorFunctionList14<I, A, B, C, D, E, F, G, H, J, K, L, M, P, O>
    | ValidatorFunctionList15<I, A, B, C, D, E, F, G, H, J, K, L, M, P, Q, O>
    | ValidatorFunctionList16<I, A, B, C, D, E, F, G, H, J, K, L, M, P, Q, R, O>
    | ValidatorFunctionList17<I, A, B, C, D, E, F, G, H, J, K, L, M, P, Q, R, S, O>
    | ValidatorFunctionList18<I, A, B, C, D, E, F, G, H, J, K, L, M, P, Q, R, S, T, O>
    | ValidatorFunctionList19<I, A, B, C, D, E, F, G, H, J, K, L, M, P, Q, R, S, T, U, O>
    | ValidatorFunctionList20<I, A, B, C, D, E, F, G, H, J, K, L, M, P, Q, R, S, T, U, V, O>
    | ValidatorFunctionList21<I, A, B, C, D, E, F, G, H, J, K, L, M, P, Q, R, S, T, U, V, W, O>
    | ValidatorFunctionList22<I, A, B, C, D, E, F, G, H, J, K, L, M, P, Q, R, S, T, U, V, W, X, O>
    | ValidatorFunctionList23<I, A, B, C, D, E, F, G, H, J, K, L, M, P, Q, R, S, T, U, V, W, X, Y, O>
    | ValidatorFunctionList24<I, A, B, C, D, E, F, G, H, J, K, L, M, P, Q, R, S, T, U, V, W, X, Y, Z, O>
    | ValidatorFunction<I, O>
    | ValidatorObject<O>;

export type SyncValidator<I, O> = SyncValidatorInner<I, unknown, unknown, unknown, unknown, unknown, unknown, unknown, unknown, unknown, unknown, unknown, unknown, unknown, unknown, unknown, unknown, unknown, unknown, unknown, unknown, unknown, unknown, unknown, O>;
export type Validator<I, O> = ValidatorInner<I, unknown, unknown, unknown, unknown, unknown, unknown, unknown, unknown, unknown, unknown, unknown, unknown, unknown, unknown, unknown, unknown, unknown, unknown, unknown, unknown, unknown, unknown, unknown, O>;

export interface FailureFunction<T> {
    (v: T, conf: ValidatorConfiguration): string;
}

export type InferValidator<T> = T extends ValidatorInner<infer I, infer A, infer B, infer C, infer D, infer E, infer F, infer G, infer H, infer J, infer K, infer L, infer M, infer P, infer Q, infer R, infer S, infer T, infer U, infer V, infer W, infer X, infer Y, infer Z, infer O> ? O : never;
