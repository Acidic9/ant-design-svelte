const swapUrls = async function(content, regexes) {
    regexes.forEach(re => {
        content = content.replaceAll(re, '$<import> from "https://cdn.skypack.dev/$<module>"')
    })
    return content
}

const generateRegex = function(element) {
    const pattern = `(?<import>import ([a-zA-Z0-9_ \$\{\},\*\n]+)) from \"(?<module>${element})\"`
    return new RegExp(pattern, 'gi')
}

module.exports = function (_snowpackConfig, modules) {
    const regexes = modules.map(generateRegex)
    return {
        name: 'use-skypack',
        transform: async function({ contents, filePath }) {
            if (filePath.match(/^.+\.(js|svelte)$/gi))
                contents = await swapUrls(contents, regexes)
            return contents
        },
    }
}