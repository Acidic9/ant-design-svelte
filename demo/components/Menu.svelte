<script>
    import { AntdSvelte } from '../'
    import { navigateTo } from 'yrv'
    import { Routes, ShowcaseStatus } from '../router'
    const { Menu, MenuItem, Tag } = AntdSvelte
</script>
  
<style>
  :global(.full-height-menu) {
     height: 100%;
     width: 100%;
  }

  @media (min-width: 772px) {
     :global(.full-height-menu) {
        height: calc(100vh - 100px);
        overflow-y: hidden;
        position: sticky;
        top: 0;
      }

      :global(.full-height-menu:hover) {
        overflow-y: scroll;
        border-right: none;
      }
  }
</style>
  
<Menu className={"full-height-menu"}>
    {#each Routes as { path, title, component, status }}
        <MenuItem
          style="padding: 0 35px;"
          {component}
           onClick={() => navigateTo(path)}
        >
            <a href={'#' + path}>{title}</a>
            {#if status != ShowcaseStatus.STABLE}
                <Tag style="margin-left: 8px;">{status}</Tag>
            {/if}
        </MenuItem>
    {/each}
</Menu>