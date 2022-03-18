import { Vue } from './dependencies.js'

const { ref, computed } = Vue

export default {
    template: `
      <input type="text" class="pen-input" :style="style"
             placeholder="输入查询URL"
             :value="value"
             :title="value"
             @input="onInput($event.target.value)"
             @focus="inputting = true"
             @blur="inputting = false">
    `,
    props: {
        value: {
            type: String,
        },
        onInput: {
            type: Function,
            default: () => undefined,
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

        return {
            inputting,
            style,
        }
    }
}