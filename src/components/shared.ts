export type AntdSveltePropsDev<T> = Omit<T, keyof Element>
export type AntdSvelteProps<T> = {
    target: Element;
    anchor?: Element;
    props?: T;
    hydrate?: boolean;
    intro?: boolean;
    $$inline?: boolean;
}