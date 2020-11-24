import type * as React from 'react'
import type * as Antd from 'antd'
/**
 * This is a simple type that allows us to import and use Ant Design types
 * without inheriting `React.HTMLAttributes<HTMLDivElement>`
 */
export type AntdSveltePropsDev<T> = Omit<T, keyof React.HTMLAttributes<HTMLDivElement>>
/**
 * This simple type is meant to mimic the expected options parameter when
 * using `new SvelteComponent(options)` which accept a generic type `T`
 * for defining prop types
 */
export type AntdSvelteProps<T> = {
    target: Element;
    anchor?: Element;
    props?: T;
    hydrate?: boolean;
    intro?: boolean;
    $$inline?: boolean;
}