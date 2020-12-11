<script>
    import { getContext } from 'svelte'
    type Maybe<T> = T | undefined
    export let xs: Maybe<number> = undefined
    export let sm: Maybe<number> = undefined
    export let md: Maybe<number>= undefined
    export let lg: Maybe<number> = undefined
    export let xl: Maybe<number>= undefined
    export let xxl: Maybe<number> = undefined
    export let span: Maybe<number> = undefined
    let gutter: Maybe<number> = getContext('gutter')
    let gutterProp = gutter ? `padding-left: ${gutter/2}px; padding-right: ${gutter/2}px;` : false
    $: classes = [
        'ant-col',
        span ? `ant-col-${span}` : false,
        String(xs) ? `ant-col-xs-${xs}` : false,
        String(sm) ? `ant-col-sm-${sm}` : false,
        String(md) ? `ant-col-md-${md}` : false,
        String(lg) ? `ant-col-lg-${lg}` : false,
        String(xl) ? `ant-col-xl-${xl}` : false,
        String(xxl) ? `ant-col-xxl-${xxl}` : false
    ].filter(item => item).join(' ')
</script>

<style>
    @media screen and (max-width: 575px) {
        .ant-col-xs-0 {
            display: none;
        }
    }
    @media screen and (max-width: 767px) {
        .ant-col-sm-0 {
            display: none;
        }
    }
    @media screen and (max-width: 991px) {
        .ant-col-md-0 {
            display: none;
        }
    }
    @media screen and (max-width: 1199px) {
        .ant-col-lg-0 {
            display: none;
        }
    }
    @media screen and (max-width: 1599px) {
        .ant-col-xl-0 {
            display: none;
        }
    }
    @media screen and (min-width: 1600px) {
        .ant-col-xxl-0 {
            display: none;
        }
    }
</style>

<div
    class={classes}
    style={[gutterProp].filter(item => item).join(' ')}
>
    <slot></slot>
</div>
