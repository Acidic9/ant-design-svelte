<script>
    export let level: 2 | 1 | 3 | 4 | 5 | undefined = 1;
</script>

{#if level === 1}
    <h1 class={'ant-typography'}><slot></slot></h1>
{:else if level === 2}
    <h2 class={'ant-typography'}><slot></slot></h2>
{:else if level === 3}
    <h3 class={'ant-typography'}><slot></slot></h3>
{:else if level === 4}
    <h4 class={'ant-typography'}><slot></slot></h4>
{:else if level === 5}
    <h5 class={'ant-typography'}><slot></slot></h5>
{:else}
    <!---->
{/if}
