import App from './App.svelte'

var app = new App({
    target: document.body,
})

export default app

if (import.meta.hot) {
    import.meta.hot.accept()
    import.meta.hot.dispose(() => {
        app.$destroy()
    })
}

/**
 * The purpose of the following line is to retrieve the actual
 * hot-module reloaded components from `src`, which is mounted
 * into `_dist_` by Snowpack.
 * 
 * Ideally, we may replace the following dirty hack by
 * cleanier dynamic imports, one remaining issue would be
 * typings handling, thus making `svelte-check` happy.
 */

// @ts-ignore
export { AntdSvelte } from '../_dist_/index.js'