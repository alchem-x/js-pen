import { Vue } from './dependencies.js'

const { ref } = Vue

export default {
    template: `
      <button class="pen-button" :disabled="disabled" @click="handleClick">
      <slot></slot>
      </button>
    `,
    props: {
        onClick: {
            type: Function,
        }
    },
    setup(props) {
        const disabled = ref(false)

        async function handleClick() {
            try {
                disabled.value = true
                await props.onClick?.()
            } finally {
                disabled.value = false
            }
        }

        return {
            disabled,
            handleClick,
        }
    }
}