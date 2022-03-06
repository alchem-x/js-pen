export default {
    template: `
      <select class="pen-select" :value="value" @change="handleChange">
      <option v-for="it of options" :key="it.value" :value="it.value">
        {{ it.label }}
      </option>
      </select>
    `,
    props: {
        options: {
            type: Array,
            default: () => [],
        },
        value: {
            type: String,
        },
        onChange: {
            type: Function,
        },
    },
    setup(props) {
        function handleChange(ev) {
            props.onChange?.(ev.target.value)
        }

        return {
            handleChange,
        }
    },
}