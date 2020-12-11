<script>
    import { getContext } from 'svelte'
    export let xs: any | undefined = undefined
    export let sm: any | undefined = undefined
    export let md: any | undefined = undefined
    export let lg: any | undefined = undefined
    export let xl: any | undefined = undefined
    export let span: any | undefined = undefined
    let gutter: number | undefined = getContext('gutter')
    let gutterProp = gutter ? `padding-left: ${gutter/2}px; padding-right: ${gutter/2}px;` : false
    $: classes = [
        'ant-col',
        span ? `ant-col-${span}` : false,
        xs ? `ant-col-xs-${xs}` : false,
        sm ? `ant-col-sm-${sm}` : false,
        md ? `ant-col-md-${md}` : false,
        lg ? `ant-col-lg-${lg}` : false,
        xl ? `ant-col-xl-${xl}` : false
    ].filter(item => item).join(' ')
</script>

<div
    class={classes}
    style={[gutterProp].filter(item => item).join(' ')}
>
    <slot></slot>
</div>
