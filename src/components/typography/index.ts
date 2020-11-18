import { default as Text } from './Text.svelte'
import { default as Title } from './Title.svelte'
import type { AntdSveltePropsDev, AntdSvelteProps } from '../shared'
import type { TitleProps } from 'antd/lib/typography/Title'
import type { TextProps } from 'antd/lib/typography/Text'
import type { BlockProps } from 'antd/lib/typography/Base'

export type AntdSvelteTitleProps = AntdSveltePropsDev<Omit<TitleProps, keyof BlockProps>>
export type AntdSvelteTextProps = AntdSveltePropsDev<Pick<TextProps, "ellipsis">>

export class AntdSvelteTitle extends Title {
    constructor(options: AntdSvelteProps<AntdSvelteTitleProps>) {
        super(options)
    }
}
export class AntdSvelteText extends Text {
    constructor(options: AntdSvelteProps<AntdSvelteTextProps>) {
        super(options)
    }
}

export const Typography = { Title: AntdSvelteTitle, Text: AntdSvelteText }
export { AntdSvelteText as Text, AntdSvelteTitle as Title }