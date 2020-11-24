<script>
    type Maybe<T> = T | undefined
    export let style: Maybe<string> = undefined
    export let hasSider: boolean = false
    export let className: Maybe<string> = undefined
    $: classes = [
        'ant-layout',
        className ? className : false,
    ].filter(item => item).join(' ')
</script>

<section class={classes} class:ant-layout-has-sider={hasSider} {style}><slot></slot></section>