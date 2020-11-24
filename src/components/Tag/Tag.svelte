<script>
    type Maybe<T> = T | undefined
    export let color: Maybe<string> = undefined
    export let closable: boolean = false
    export let visible: boolean = true
    export let style: Maybe<string> = undefined
    $: classes = [
        'ant-tag',
        color ? 'ant-tag-has-color' : false,
        visible ? false : 'ant-tag-hidden',
    ].filter(item => item).join(' ')
    $: computedStyles = [
        style,
        color ? `background: ${color};` : false,
    ].filter(item => item).join(' ')
</script>

<span class={classes} style={computedStyles}>
    <slot></slot>
    {#if closable}
        <span><!-- TODO: Support closing icon --></span>
    {/if}
</span>