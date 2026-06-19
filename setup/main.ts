import { defineAppSetup } from '@slidev/types'
import LineChart from '../components/LineChart/LineChart.vue'
import LineChartLegend from '../components/LineChart/LineChartLegend.vue'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'

export default defineAppSetup(({ app }) => {
  // Configure Vuetify
  const vuetify = createVuetify({
    components,
    directives,
    theme: {
      defaultTheme: 'light',
    },
  })
  
  app.use(vuetify)
  
  // Register custom components globally
  app.component('LineChart', LineChart)
  app.component('LineChartLegend', LineChartLegend)
})
