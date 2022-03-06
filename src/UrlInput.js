import { Vue } from './dependencies.js'

const { ref, computed } = Vue

export default {
    template: `
      <input type="text" class="pen-input" :style="style"
             placeholder="输入查询URL"
             :value="value"
             :title="value"
             @input="handleInput"
             @focus="inputting = true"
             @blur="inputting = false">
    `,
    props: {
        value: {
            type: String,
        },
        onInput: {
            type: Function,
        },
    },
    setup(props) {
        const inputting = ref(false)
        const style = computed(() => {
            if (inputting.value) {
                return 'width: 240px;'
            } else {
                return 'width: 120px;'
            }
        })

        function handleInput(ev) {
            props.onInput?.(ev.target.value)
        }

        return {
            inputting,
            style,
            handleInput,
        }
    }
}