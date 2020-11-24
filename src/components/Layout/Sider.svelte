<script>
    type Maybe<T> = T | undefined
    export let style: Maybe<string> = undefined
</script>

<aside class={'ant-layout-sider'} {style}><slot></slot></aside>