const {mdsvex} = require('mdsvex')

module.exports = {
    extensions: [
        '.svelte',
        '.svx'
    ],
	preprocess: [
        mdsvex(),
        require("svelte-preprocess")({
            defaults: { script: "typescript" },
            typescript: { transpileOnly: true }
        })
    ]
}