<script>
  import { getContext } from "svelte"
  import { context } from "./context"
  type Maybe<T> = T | undefined
  export let title: Maybe<string> = undefined
  export let style: Maybe<string> = undefined
  export let active: boolean = false
  export let disabled: boolean = false
  export let key: symbol | string = Symbol()
  export let onClick: Maybe<() => void> = undefined
  export let sub: Maybe<symbol | string> = undefined
  const { selectedKey, subSelected } = getContext(context)
  function handleActive() {
    active = !active
  }
  function handleSelect() {
    if (onClick) onClick();
    selectedKey.set(key);
    subSelected.set(sub);
  }
  let el: any;
</script>

<li
  bind:this={el}
  class="ant-menu-item"
  role="menuitem"
  on:mouseenter|self={handleActive}
  on:mouseleave|self={handleActive}
  class:ant-menu-item-selected={$selectedKey === key}
  class:ant-menu-item-active={active}
  class:ant-menu-item-disabled={disabled}
  class:ant-menu-item-only-child={false}
  on:click={handleSelect}
  {style}>
  {#if title}
    {title}
  {:else}
    <slot></slot>
  {/if}
</li>