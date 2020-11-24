module.exports = {
    buildOptions: {
        clean: true
    },
    mount: {
        demo: '/',
        src: '/_dist_',
    },
    plugins: [
        ['./plugins/use-skypack.js', ['react', 'react-dom', 'antd']],
        '@snowpack/plugin-svelte',
        '@snowpack/plugin-dotenv',
    ],
};