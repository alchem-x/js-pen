export default {
    template: `
      <select class="pen-select" :value="value" @change="onChange($event.target.value)">
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
            default: () => undefined,
        },
    },
}