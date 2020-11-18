// The purpose of this file is to setup a Svelte based Snowpack server
// based on 'dev' folder content, for showcasing antd-svelte components. 
//
// NOTE: None of these will be bundled by Rollup.

import App from './dev/App.svelte'

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