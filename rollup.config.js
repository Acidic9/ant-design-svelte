import cleaner from 'rollup-plugin-cleaner'
import svelte from 'rollup-plugin-svelte'
import preprocess from 'svelte-preprocess'
import typescript from '@rollup/plugin-typescript'
import resolve from '@rollup/plugin-node-resolve'
import pkg from './package.json'

const name = pkg.name
	.replace(/^(@\S+\/)?(svelte-)?(\S+)/, '$3')
	.replace(/^\w/, m => m.toUpperCase())
	.replace(/-\w/g, m => m[1].toUpperCase());

export default [{
    input: 'src/index.ts',
    output: [
        { file: pkg.module, format: 'es', sourcemap: true },
        { file: pkg.main, format: 'umd', name, sourcemap: true }
    ],
	plugins: [
        cleaner({ targets: ['./dist/'] }),
        svelte({
            preprocess: preprocess({
                defaults: { script: 'ts' },
                typescript: { transpileOnly: true }
            })
        }),
        typescript({ sourceMap: true }),
        resolve(),
    ]
}, {
    input: 'src/index.ts',
    output: [
        { file: 'dist/ssr/index.mjs', format: 'es', sourcemap: true },
        { file: 'dist/ssr/index.js', format: 'umd', name, sourcemap: true }
    ],
	plugins: [
        svelte({
            generate: 'ssr',
            preprocess: preprocess({
                defaults: { script: 'ts' },
                typescript: { transpileOnly: true }
            })
        }),
        typescript({ sourceMap: true }),
        resolve(),
    ]
}]