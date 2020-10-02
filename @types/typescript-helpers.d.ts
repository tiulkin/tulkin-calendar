/** https://stackoverflow.com/a/50014868/7785430 */
type ArgumentTypes<T> = T extends (...args: infer U) => infer R ? U : never;
type ReplaceReturnType<T, TNewReturn> = (...a: ArgumentTypes<T>) => TNewReturn;

/** https://stackoverflow.com/a/50677584/7785430 */
type FirstArgument<T> = T extends (arg1: infer U, ...args: any[]) => any ? U : any;
type SecondArgument<T> = T extends (arg1: any, arg2: infer U, ...args: any[]) => any ? U : any;

/** https://stackoverflow.com/a/50084862/7785430 */
type ExtractProps<TComponentOrTProps> = TComponentOrTProps extends React.ComponentType<infer TProps>
    ? TProps
    : TComponentOrTProps;

type Nullable<T> = { [P in keyof T]: T[P] | null };
type OfType<T, TYPE> = { [P in keyof T]: TYPE };
type DiscriminateUnion<T, K extends keyof T, V extends T[K]> = T extends Record<K, V> ? T : never;
type EnumedDict<Y extends string, T> = { [P in Y]: T };

/** https://stackoverflow.com/questions/45372227/how-to-implement-typescript-deep-partial-mapped-type-not-breaking-array-properti/49936686#49936686 */
type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends Array<infer U>
        ? Array<DeepPartial<U>>
        : T[P] extends ReadonlyArray<infer U>
        ? ReadonlyArray<DeepPartial<U>>
        : DeepPartial<T[P]>;
};

/** https://stackoverflow.com/a/53743245/7785430 */
type OptionalKey<T, O extends keyof T> = Pick<T, Exclude<keyof T, O>> & Partial<{ [P in O]: T[P] }>;

/** https://stackoverflow.com/a/60574436/7785430 */
type RequiredWithoutNull<T> = {
    [P in keyof T]-?: Exclude<T[P], null | undefined>;
};

interface SuccessCallback<R = never> {
    (result: R): void;
}
interface ErrorCallback<E = Error> {
    (error: E): void;
}
