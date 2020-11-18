<script>
  // @ts-ignore
  import { Router, Route, Link } from 'yrv'
  import Sample from './pages/Sample/index.svelte'
  import Typography from './pages/Typography/index.svelte'
  import Card from './pages/Card/index.svelte'
</script>

<style>
    .my-menu {
        display: block;
        font-size: 14px;
        overflow-y: hidden;
        height: 100vh;
    }
    .my-menu:hover {
        overflow-y: scroll;
    }
    .my-menu-item {
        padding: 5px 15px;
        color: red;
    }
</style>

<div style="display: flex; justify-content: space-between;">
    <div style="min-width: 120px; width: 25%; height: 25vh; position: -webkit-sticky; position: sticky; top: 0; display: block;">
        <div class="my-menu">
            <div class="my-menu-item">
                <Link href="/">
                    <div><p>Home</p></div>
                </Link>
            </div>
            <div class="my-menu-item">
                <Link href="/typography">
                    <div><p>Typography</p></div>
                </Link>
            </div>
            <div class="my-menu-item">
                <Link href="/card">
                    <div><p>Card</p></div>
                </Link>
            </div>
        </div>
    </div>
    <div style="width: 74%; min-height: 100vh; padding: 15px;">
        <Router>
            <Route exact component={Sample} />
            <Route exact path="/typography" component={Typography}></Route>
            <Route exact path="/card" component={Card}></Route>
            <Route fallback>Not found</Route>
        </Router>
    </div>
</div>