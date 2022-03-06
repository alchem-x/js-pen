import loadJs from './loadJs.js'

await loadJs('https://unpkg.com/monaco-editor@0.32.1/min/vs/loader.js')

window.require.config({
    paths: {
        vs: 'https://unpkg.com/monaco-editor@0.32.1/min/vs',
        vue: 'https://unpkg.com/vue-umd@3.2.31/dist/vue.umd',
    },
    'vs/nls': {
        availableLanguages: {
            '*': 'zh-cn'
        },
    },
})

function getDependencies() {
    return new Promise((resolve) => {
        window.require(['vs/editor/editor.main', 'vue'], (monaco, Vue) => {
            resolve({
                monaco,
                Vue,
            })
        })
    })
}

export const { monaco, Vue } = await getDependencies()
