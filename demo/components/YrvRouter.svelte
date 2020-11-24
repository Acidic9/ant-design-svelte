<script>
  import { YrvRouter, YrvRoute, Routes } from '../router'
  import { Welcome } from '../views'
</script>

<YrvRouter>
    <YrvRoute exact component={Welcome}/>
    {#each Routes as { path, component }}
        <YrvRoute exact {path} {component}/>
    {/each}
    <YrvRoute fallback>Not found</YrvRoute>
</YrvRouter>