import type { AntdSvelteProps } from '../shared'
import type { RowProps, ColProps } from 'antd/lib/grid'
export { default as Row } from './Row.svelte'
export { default as Col } from './Col.svelte'

export type AntdSvelteRowProps = AntdSvelteProps<RowProps>
export type AntdSvelteColProps = AntdSvelteProps<ColProps>