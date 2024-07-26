import loadJs from './loadJs.js'

function withCdn(url) {
    const CDN_BASE = 'https://unpkg.com/'
    return new URL(url, CDN_BASE).toString()
}

await Promise.all([
    loadJs(withCdn('/vue@3.4.34/dist/vue.global.prod.js')),
    loadJs(withCdn('/file-saver@2.0.5/dist/FileSaver.min.js')),
])

async function getMonaco() {
    await loadJs(withCdn('/monaco-editor@0.50.0/min/vs/loader.js'))

    window.require.config({
        paths: {
            vs: withCdn('/monaco-editor@0.50.0/min/vs'),
        },
        'vs/nls': {
            availableLanguages: {
                '*': 'zh-cn'
            },
        },
    })

    return new Promise((resolve) => {
        window.require(['vs/editor/editor.main'], (monaco) => {
            resolve(monaco)
        })
    })
}

export const monaco = await getMonaco()
export const Vue = window.Vue
export const saveAs = window.saveAs
