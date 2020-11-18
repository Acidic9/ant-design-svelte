module.exports = {
    buildOptions: {
        clean: true
    },
    mount: {
        public: '/',
        src: '/_dist_',
    },
    plugins: [
        /* ["./plugins/use-skypack.js", ["react", "react-dom"]] */,
        '@snowpack/plugin-svelte',
        '@snowpack/plugin-dotenv',
    ],
};