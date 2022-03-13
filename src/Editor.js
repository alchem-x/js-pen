import { monaco, Vue } from './dependencies.js'

const { onMounted, ref, watch } = Vue

export default {
    template: `
      <div ref="editorContainerRef" class="editor-container"/>
    `,
    props: {
        state: {
            type: Object,
        },
    },
    setup(props) {
        const editorContainerRef = ref()
        let editor

        watch(() => props.state.contentValue, (val) => {
            if (!editor || editor.getModel().getValue() === val) {
                return
            }
            editor.getModel().setValue(val)
        })

        onMounted(() => {
            editor = monaco.editor.create(editorContainerRef.value, {
                value: props.state.contentValue,
                language: props.state.language,
                automaticLayout: true,
                minimap: {
                    enabled: false,
                },
                unicodeHighlight: {
                    ambiguousCharacters: false,
                },
            })

            editor.getModel().onDidChangeContent((ev) => {
                const newVal = editor.getModel().getValue() || ''
                if (props.state.contentValue !== newVal) {
                    props.state.contentValue = newVal
                }
            })

            editor.onDidChangeCursorSelection((ev) => {
                props.state.selectedContentValue = editor.getModel().getValueInRange(ev.selection)
            })

            props.state.ready = true
        })

        return {
            editorContainerRef,
        }
    },
}
