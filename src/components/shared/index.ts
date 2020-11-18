import type * as React from 'react'
/**
 * This is a simple type that allows us to import and use Ant Design types
 * without inheriting `React.HTMLAttributes<HTMLDivElement>`
 */
export type AntdSveltePropsDev<T> = Omit<T, keyof React.HTMLAttributes<HTMLDivElement>>
export type AntdSvelteProps<T> = {
    target: Element;
    anchor?: Element;
    props?: T;
    hydrate?: boolean;
    intro?: boolean;
    $$inline?: boolean;
}