import { defineAppSetup } from '@slidev/types'
import LineChart from '../components/LineChart/LineChart.vue'
import LineChartLegend from '../components/LineChart/LineChartLegend.vue'

export default defineAppSetup(({ app }) => {
  // Register components globally
  app.component('LineChart', LineChart)
  app.component('LineChartLegend', LineChartLegend)
})
