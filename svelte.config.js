module.exports = {
	preprocess: require("svelte-preprocess")({
        defaults: { script: "typescript" },
        typescript: { transpileOnly: true }
    })
}