import { Vue } from './dependencies.js'
import { LANGUAGE_TYPE, languageOptions } from './language.js'
import { changeLanguage } from './urlSearchParams.js'
import runJs from './runJs.js'
import Select from './Select.js'
import Button from './Button.js'
import UrlInput from './UrlInput.js'
import { querySql } from './sql.js'
import { readAsText } from './file.js'

const { computed } = Vue

export default {
    template: `
      <header class="header">
      <a class="no-underline whitespace-nowrap" :href="indexUrl">
        <strong class="color-black select-none text-base">JS Pen</strong>
      </a>
      <div class="flex items-center" style="gap: 8px;">
        <UrlInput v-if="isQueryMode"
                  :value="state.sqlQueryUrl"
                  :on-input="handleSqlQueryUrlInput"/>
        <Button v-if="showOpenFileButton" style="width: 60px;" :on-click="handleOpenFile">打开文件</Button>
        <Button v-if="showRunButton" style="width: 60px;" :on-click="handleRun">运行</Button>
        <Select style="width: 100px;"
                :value="state.language"
                :options="languageOptions"
                :on-change="handleLanguageChange"/>
      </div>
      </header>
    `,
    props: {
        state: {
            type: Object,
        },
        isQueryMode: {
            type: Boolean,
            default: () => false,
        },
    },
    setup(props) {
        function handleSqlQueryUrlInput(ev) {
            props.state.sqlQueryUrl = ev.trim()
        }

        const showOpenFileButton = computed(() => {
            return !props.state.contentValue;
        })

        const showRunButton = computed(() => {
            if (!props.state.contentValue) {
                return false
            }
            if (props.isQueryMode) {
                return true
            }
            return [LANGUAGE_TYPE.JAVASCRIPT,].includes(props.state.language)
        })

        function handleLanguageChange(ev) {
            if (ev !== props.state.language) {
                changeLanguage(ev)
            }
        }

        function handleOpenFile(ev) {
            const inputRef = document.createElement('input')
            inputRef.type = 'file'
            inputRef.addEventListener('change', async (ev) => {
                const file = ev.target.files[0]
                if (!file) {
                    return
                }
                props.state.contentValue = await readAsText(file)
                inputRef.remove()
            })
            document.body.appendChild(inputRef)
            inputRef.click()
        }

        function runJavaScript() {
            runJs(props.state.contentValue, true)
        }

        async function runSqlQuery() {
            try {
                props.state.tableData = [{
                    ['提示']: '<查询中...>'
                }]
                const result = await querySql(props.state.sqlQueryUrl, props.state.selectedContentValue || props.state.contentValue)
                if (!result || !result.length) {
                    props.state.tableData = [{
                        ['结果']: '<空>'
                    }]
                } else {
                    props.state.tableData = result
                }
            } catch (err) {
                props.state.tableData = [{
                    ['错误']: err.message
                }]
            }
        }

        function handleRun() {
            switch (props.state.language) {
                case LANGUAGE_TYPE.JAVASCRIPT:
                    return runJavaScript()
                case LANGUAGE_TYPE.SQL:
                    return runSqlQuery()
                default:
                    return
            }
        }

        return {
            languageOptions,
            handleLanguageChange,
            handleOpenFile,
            showOpenFileButton,
            handleRun,
            showRunButton,
            handleSqlQueryUrlInput,
            indexUrl: location.pathname.startsWith('/js-pen/') ? '/js-pen/' : '/'
        }
    },
    components: {
        Button,
        Select,
        UrlInput,
    }
}
