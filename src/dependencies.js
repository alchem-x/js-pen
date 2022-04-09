import loadJs from './loadJs.js'

function withCdn(url) {
    const CDN_BASE = 'https://cdn.staticfile.org/'
    return new URL(url, CDN_BASE).toString()
}

await Promise.all([
    loadJs(withCdn('/monaco-editor/0.33.0/min/vs/loader.js')),
    loadJs(withCdn('/vue/3.2.31/vue.global.prod.min.js')),
])

window.require.config({
    paths: {
        vs: withCdn('/monaco-editor/0.33.0/min/vs'),
    },
    'vs/nls': {
        availableLanguages: {
            '*': 'zh-cn'
        },
    },
})

function getDependencies() {
    return new Promise((resolve) => {
        window.require(['vs/editor/editor.main'], (monaco) => {
            resolve({
                monaco,
                Vue: window.Vue,
            })
        })
    })
}

export const { monaco, Vue } = await getDependencies()
