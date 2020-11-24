<script>
    import { getContext } from 'svelte'
    export let xs: any | undefined = undefined
    export let sm: any | undefined = undefined
    export let md: any | undefined = undefined
    export let lg: any | undefined = undefined
    export let xl: any | undefined = undefined
    export let xxl: any | undefined = undefined
    export let span: any | undefined = undefined
    let gutter: number | undefined = getContext('gutter')
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