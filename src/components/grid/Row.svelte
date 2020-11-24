<script>
    import { setContext } from 'svelte'
    export let justify = 'start'
    export let align = 'top'
    export let gutter = 0
    setContext('gutter', gutter)
    $: classes = [
        'ant-row',
        justify ? `ant-row-${justify}` : false,
        align ? `ant-row-${align}` : false
    ].filter(item => item).join(' ')
</script>

<style>
    .ant-row {
        width: 100%;
    }
</style>

<div class={classes}>
    <slot></slot>
</div>