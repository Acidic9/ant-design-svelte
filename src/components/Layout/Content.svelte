<script>
    type Maybe<T> = T | undefined
    export let style: Maybe<string> = undefined
    export let className: Maybe<string> = undefined
    $: classes = [
        'ant-layout-content',
        className ? className : false,
    ].filter(item => item).join(' ')
</script>

<main class={classes} {style}><slot></slot></main>