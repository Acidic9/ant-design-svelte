<script>
  import { setContext } from "svelte"
  import { writable } from "svelte/store"
  import { context } from './context'
  type Maybe<T> = T | undefined
  export let className: Maybe<string> = undefined
  export let style: Maybe<string> = undefined
  export let theme: Maybe<string> = "light"
  export let mode: Maybe<string> = "vertical"
  export let divider: boolean = false
  export let collapsed: boolean = false
  export let defaultSelectedKey: Maybe<symbol | string> = undefined
  export let defaultOpenKey: Maybe<symbol | string> = undefined
  let selectedKey = writable(defaultSelectedKey)
  let openKey = writable(defaultOpenKey)
  let inlineCollapsed = writable(collapsed)
  let subSelected = writable(defaultOpenKey)
  $: {
    inlineCollapsed.set(collapsed)
  }
  let menu: any
  setContext(context, {
    mode,
    divider,
    menu,
    selectedKey,
    openKey,
    subSelected,
    collapsed: inlineCollapsed
  });
</script>

<ul
  bind:this={menu}
  class={`ant-menu ant-menu-root ${className}`}
  class:ant-menu-light={theme === 'light'}
  class:ant-menu-dark={theme === 'dark'}
  class:ant-menu-inline={mode === 'inline'}
  class:ant-menu-horizontal={mode === 'horizontal'}
  class:ant-menu-vertical={mode === 'vertical'}
  class:ant-menu-vertical-right={mode === 'vertical-right'}
  class:ant-menu-vertical-left={mode === 'vertical-left'}
  class:iant-menu-nline-collapsed={collapsed}
  role="menu"
  {style}>
  <slot />
</ul>