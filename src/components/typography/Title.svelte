<script>
    export let level: number = 1
</script>

<svelte:options accessors/>

{#if level === 1}
    <h1 class={'ant-typography'} on:click={clickHandler}><slot></slot></h1>
{:else if level === 2}
    <h2 class={'ant-typography'} on:click={clickHandler}><slot></slot></h2>
{:else if level === 3}
    <h3 class={'ant-typography'} on:click={clickHandler}><slot></slot></h3>
{:else if level === 4}
    <h4 class={'ant-typography'} on:click={clickHandler}><slot></slot></h4>
{:else if level === 5}
    <h5 class={'ant-typography'} on:click={clickHandler}><slot></slot></h5>
{:else}
    <h5 class={'ant-typography'} on:click={clickHandler}><slot></slot></h5>
{/if}