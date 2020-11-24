<script>
    type Maybe<T> = T | undefined
    export let style: Maybe<string> = ''
    $: classes = [
        'ant-layout-header',
        $$props.class ? $$props.class : false,
    ].filter(item => item).join(' ')
</script>

<header class={classes} {style}><slot></slot></header>