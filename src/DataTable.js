import { Vue } from './dependencies.js'

const { computed } = Vue

export default {
    template: `
      <div class="data-table">
      <table>
        <thead>
        <th v-for="it of headerList" :key="it">{{ it }}</th>
        </thead>
        <tbody>
        <tr v-for="(data, index) of dataList" :key="index">
          <td v-for="it of headerList" :key="it">
            {{ data[it] }}
          </td>
        </tr>
        </tbody>
      </table>
      </div>
    `,
    props: {
        state: {
            type: Object,
        },
    },
    setup(props) {
        const headerList = computed(() => {
            const data0 = props.state.tableData[0]
            if (!props.state.tableData[0]) {
                return []
            }
            return Object.keys(data0)
        })

        const dataList = computed(() => {
            return props.state.tableData
        })

        return {
            headerList,
            dataList,
        }
    }
}