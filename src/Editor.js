import { monaco, Vue } from './dependencies.js'

const { onMounted, ref } = Vue

export default {
    template: `
      <div ref="editorContainer" class="editor-container"/>
    `,
    props: {
        state: {
            type: Object,
        },
    },
    setup(props) {
        const editorContainer = ref()

        onMounted(() => {
            const editor = monaco.editor.create(editorContainer.value, {
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
                props.state.contentValue = editor.getModel().getValue() || ''
            })

            editor.onDidChangeCursorSelection((ev) => {
                props.state.selectedContentValue = editor.getModel().getValueInRange(ev.selection)
            })

            props.state.ready = true
        })

        return {
            editorContainer,
        }
    },
}
