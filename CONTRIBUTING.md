# 🤝 Contributing

First of all, thank you for your interest in contributing to Ant Design Svelte.

The following is a set of guidelines and notes about contributing to the unofficial Svelte adaptation of Ant Design. Please spend several minutes reading these guidelines before you create an issue or pull request.

## Code of conduct

We have adopted a [Code of Conduct](https://github.com/tommywalkie/ant-design-svelte/blob/master/CODE_OF_CONDUCT.md) that we expect project participants to adhere to. Please read the full text so that you can understand what actions will and will not be tolerated.

## Submit new Pull Request

> **Note:** Currently, :us: English is the only supported language for any contribution. Thank you for your understanding.

We welcome and monitor new feature proposals and bugfixes via new pull requests, using a set of rules slightly inspired from [Ant Design PR Principle](https://github.com/ant-design/ant-design/wiki/PR-principle). 

0. This principle is suitable for [antd-svelte](http://github.com/tommywalkie/antd-svelte).
1. Similarly to [Ant Design branch organization](https://ant.design/docs/react/contributing#Branch-Organization), all the `new feature` **must PR** to `feature` branch.
2. `new feature` contains new feature added, obviously UI modification, interactive update, reconstruction, etc.
3. `feature` branch is locked and not allow push code directly. **All the modification must use Pull Request**.
4. **Use follow PR template to submit feature related info**.
5. CI and other check tools pass.
6. **Modification must contains related changelog which contains truthful feedback to user**, and also easy for releaser to check.
7. Merge PR must get at least **one another collaborator**'s approve.
8. Daily bugfix, doc update, site maintain, branch merge is free for the principle (But still update through PR for trace).
9. Ant Design of Svelte official maintainers must comply with the principle. Other contributor can use PR template optional.

## Development

The following section is about getting started with Ant Design Svelte and giving a few advices about possible quirks and gotchas, and what shall be doable.

The unofficial Ant Design Svelte project is devoting to be lightweight, type-safe and using shared [Ant Design of React](https://ant.design/docs/spec/introduce) design resources, while using Svelte's full capabilities.

### Stack

The project includes the Ant Design Svelte components source code (within `/src/components`), and a development and documentation purpose Snowpack server (within `/src/dev`), supporting both Svelte and React components. It should be noted that the Rollup bundler is set up with `src/index.ts` as entrypoint, meaning the development server (which has `src/dev-server.ts` as entrypoint) won't be bundled.

Currently, the Snowpack server aims to be both a convenient development purpose server, and a decent documentation platform, exposing both Svelte components and original React-based Ant Design component for side-by-side comparison.

##### Component library

- Svelte 3+ (with type-checking via `svelte-check`)
- Rollup
- TypeScript (via `svelte-preprocess`)

##### Development server

- Snowpack
- Svelte 3+ (with TypeScript support via `svelte-preprocess`)
- React 16+ (with TypeScript support)
- Ant Design of React

Here is the codebase structure with the relevant parts.

```
.
├─── plugins               # Snowpack plugins
├─── src
|	├   components         # Components source code
|	├   dev                # Snowpack dev server source code
|	|   ├─── pages         # Individual component showcase pages
|	|   └    App.svelte    # Snowpack dev server router
|	├   dev-server.ts      # Snowpack dev server entrypoint
|	└   index.ts           # Library entrypoint
├   rollup.config.js       # Library Rollup configuration
├   snowpack.config.js     # Snowpack dev server configuration
├   svelte.config.js       # Svelte configuration
├   package.json           # NPM package manifest
└   tsconfig.json          # Default TypeScript configuration
```

### Type safety

To ensure prop type safety and consistency, the unofficial Ant Design Svelte project is relying on Ant Design types directly, with a few edits, like explicitly omitting any `React.HTMLAttributes<HTMLDivElement>` field for props, in order to provide the most accurate Svelte component prop types.

```typescript
/**
 * Assuming we want to reproduce Ant Design's divider component,
 * it would make sense to simply use "DividerProps", except it comes
 * with React typed fields which are inappropriate for Svelte.
 *
 * export interface DividerProps = {
 *    ✔️ prefixCls?: string | undefined;
 *    ✔️ type?: "horizontal" | "vertical" | undefined;
 *    ❌ className?: string;
 *    ❌ children?: React.ReactNode;
 *    ✔️ orientation?: "left" | "right" | "center" | undefined;
 *    ❌ style?: React.CSSProperties;
 *    ✔️ dashed?: boolean | undefined;
 *    ✔️ plain?: boolean | undefined;
 * }
 */
import type { DividerProps } from 'antd/lib/divider'

/**
 * Instead, combine with utility types like Omit, Exclude, Pick etc.
 * in order to cherry-pick among imported Ant Design types.
 *
 * export type AntdSvelteDividerProps = {
 *    ✔️ prefixCls?: string | undefined;
 *    ✔️ type?: "horizontal" | "vertical" | undefined;
 *    ✔️ orientation?: "left" | "right" | "center" | undefined;
 *    ✔️ dashed?: boolean | undefined;
 *    ✔️ plain?: boolean | undefined;
 * }
 */
export type AntdSvelteDividerProps = Omit<DividerProps, keyof React.HTMLAttributes<HTMLDivElement>>

/**
 * Using provided "AntdSveltePropsDev" utility type,
 * the previous snippet can be shortened as:
 */
import type { AntdSveltePropsDev } from 'src/components/shared'
export type AntdSvelteDividerProps = AntdSveltePropsDev<DividerProps>
```

Ant Design Svelte temporarily provides an `AntdSvelteProps<T>` type which can be used as a Svelte component constructor parameter.

```typescript
import type { AntdSvelteProps } from 'src/components/shared'
import { default as Divider } from './Divider.svelte'
export class AntdSvelteDivider extends Divider { 
    constructor(options: AntdSvelteProps<AntdSvelteDividerProps>) {
        super(options)
    }
}
```

Using this trick, users can **autocomplete** and **type-check** props via Intellisense.

```typescript
/**
 * Here, Intellisense should complain because:
 * 1. The 'dashed' field is expecting a boolean value
 * 2. The 'foo' field doesn't exist
 */
const MyDivider = new AntdSvelteDivider({
    target: document.body,
    props: { type: 'horizontal', dashed: 'yes', foo: 'bar' }
})
```

However, as opposed to props, the events and slots cannot be type-checked due to being injected at compile-time, though stuff like [sveltejs/svelte#5431](https://github.com/sveltejs/svelte/pull/5431) or [sveltejs/rfcs#38](https://github.com/sveltejs/rfcs/pull/38) are being reviewed.

### FAQ

#### Consider using Skypack ?

Currently, contributors are required to install React and Ant Design as development dependencies so TypeScript Intellisense can type-check our source code. Using Skypack would allow us to start the Snowpack development server without bundling React and Ant Design, and drastically reduce the install size.

But there are two issues:

1. If using Skypack, we lose the type-checking feature as TypeScript is unable to retrieve remote definitions ([microsoft/typescript#28985](https://github.com/microsoft/TypeScript/issues/28985) and [microsoft/typescript#35749](https://github.com/microsoft/TypeScript/issues/35749))
2. There is an incompatibility issue with Ant Design and Skypack ([snowpackjs/skypack-cdn#73](https://github.com/snowpackjs/skypack-cdn/issues/73))

The provided `plugins/use-skypack.js` Snowpack plugin would partially solve the issues by switching import URLs at Snowpack server startup, hopefully we will be able to add `antd` to the list when [snowpackjs/skypack-cdn#73](https://github.com/snowpackjs/skypack-cdn/issues/73) get solved.

```js
// snowpack.config.json
module.exports = {
    plugins: [
        // Here, we tell Snowpack to switch any React or React DOM import
        // with Skypack CDN ones. Any "import React from 'react'" will become
        // "import React from 'https://cdn.skypack.dev/react'"
        ["./plugins/use-skypack.js", ["react", "react-dom"]],
    ]
}
```

```
⦿ web_modules/                  size       gzip       brotli   
    ├─ antd.js                   2592 KB    554.75 KB  397.79 KB  
    ├─ react-dom.js              1 KB       0.35 KB    0.3 KB     
    ├─ react.js                  1.57 KB    0.51 KB    0.44 KB
    ├─ svelte.js                 0.14 KB    0.13 KB    0.1 KB     
    ├─ svelte/internal.js        0.59 KB    0.35 KB    0.29 KB    
    ├─ svelte/store.js           0.1 KB     0.1 KB     0.07 KB    
    └─ yrv.js                    55.64 KB   12.46 KB   10.91 KB
```

#### Are React and Ant Design of React really needed ?

Theoretically, users need to install React and Ant Design of React only for types and styles, though we [consider using Skypack](#consider-using-skypack) for the development server. Ditching `react` in favor of `@types/react` and telling users to simply retrieve styles directly from CDNs are not an issue, but it is a whole different story for `antd` which has typings from `moment` and packages from [`react-component`](https://github.com/react-component) foundation.

#### How to use React in Svelte ?

During server startup, Snowpack handles any Svelte or React component via ESBuild or plugins, then runs a Svelte-based application. Using a React component in Svelte is fairly simple, using the provided `ReactWrapper` component and defining props (even `children`) via the `props` attribute.

On a side note, in order to avoid the [_"Hooks + multiple instances of React"_](https://github.com/facebook/react/issues/13991) issue, please make sure the said React component and its imported modules use the same instance of React.

```vue
<script>
  import ReactWrapper from '/src/dev/utils/ReactWrapper.svelte'
  import MyReactComponent from './MyReactComponent'
</script>

<ReactWrapper
  component={MyReactComponent}
  props={{...}}
/>
```

#### Why not Storybook ?

Subjectively, Storybook is way too [heavy](https://bundlephobia.com/scan-results?packages=svelte@3.24.0,@storybook/addon-essentials@6.0.28,@storybook/svelte@6.0.28,@storybook/addon-actions@6.0.28,@storybook/addon-links@6.0.28,storybook@6.0.28&sortMode=size), though there is a possibility that they adopt Snowpack someday ([storybookjs/storybook#10987](https://github.com/storybookjs/storybook/issues/10987)).

