<template>
    <div class="predict-data">
        <h1 v-if="symbolData">{{ symbolData.Name }} ({{ symbolData.Symbol }}) Prediction Data</h1>      <div v-if="isLoading">Loading...</div>
      <div v-else-if="error">{{ error }}</div>
      <div v-else>
        <div class="overview-section">
          <h2>Overview</h2>
          <p><strong>Asset Type:</strong> {{ symbolData.AssetType }}</p>
          <p><strong>Description:</strong> {{ symbolData.Description }}</p>
          <p><strong>Exchange:</strong> {{ symbolData.Exchange }}</p>
          <p><strong>Currency:</strong> {{ symbolData.Currency }}</p>
          <p><strong>Country:</strong> {{ symbolData.Country }}</p>
          <p><strong>Sector:</strong> {{ symbolData.Sector }}</p>
          <p><strong>Industry:</strong> {{ symbolData.Industry }}</p>
          <p><strong>Address:</strong> {{ symbolData.Address }}</p>
          <p><strong>Official Site:</strong> <a :href="symbolData.OfficialSite" target="_blank">{{ symbolData.OfficialSite }}</a></p>
          <p><strong>Fiscal Year End:</strong> {{ symbolData.FiscalYearEnd }}</p>
          <p><strong>Latest Quarter:</strong> {{ symbolData.LatestQuarter }}</p>
        </div>
       <div class="charts-container">
        <div class="chart">
          <h2>Growth Metrics</h2>
          <LineChart :chartData="growthMetricsChartData" />
        </div>
        <div class="chart">
          <h2>Financial Performance</h2>
          <LineChart :chartData="financialPerformanceChartData" />
        </div>
        <div class="chart">
          <h2>Profitability Metrics</h2>
          <RadarChart :chartData="profitabilityMetricsChartData" />
        </div>
        <div class="chart">
          <h2>Efficiency Metrics</h2>
          <RadarChart :chartData="efficiencyMetricsChartData" />
        </div>
        <div class="chart">
          <h2>Valuation Metrics</h2>
          <BarChart :chartData="valuationMetricsChartData" />
        </div>
        <div class="chart">
          <h2>Analyst Expectations</h2>
          <BarChart :chartData="analystExpectationsChartData" />
        </div>
        <div class="chart">
          <h2>Stock Performance</h2>
          <ScatterChart :chartData="stockPerformanceChartData" />
        </div>
        <div class="chart">
          <h2>Analyst Target Price</h2>
          <GaugeChart :chartData="analystTargetPriceChartData" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import LineChart from '@/components/LineChart.vue';
import RadarChart from '@/components/RadarChart.vue';
import BarChart from '@/components/BarChart.vue';
import ScatterChart from '@/components/ScatterChart.vue';
import GaugeChart from '@/components/GaugeChart.vue';

export default defineComponent({
  name: 'PredictionData',
  components: {
    LineChart,
    RadarChart,
    BarChart,
    ScatterChart,
    GaugeChart
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const symbol = computed(() => route.params.symbol);
    const isLoading = computed(() => store.state.isLoading);
    const error = computed(() => store.state.error);
    const symbolData = computed(() => store.getters.getSymbolData[symbol.value]);
    
const growthMetricsChartData = computed(() => store.state.growthMetricsData);
const financialPerformanceChartData = computed(() => store.state.financialPerformanceData);
const profitabilityMetricsChartData = computed(() => store.state.profitabilityMetricsData);
const efficiencyMetricsChartData = computed(() => store.state.efficiencyMetricsData);
const valuationMetricsChartData = computed(() => store.state.valuationMetricsData);
const analystExpectationsChartData = computed(() => store.state.analystExpectationsData);
const stockPerformanceChartData = computed(() => store.state.stockPerformanceData);
const analystTargetPriceChartData = computed(() => store.state.analystTargetPriceData);
    
onMounted(() => {
  store.dispatch('fetchSymbolData', { symbol: symbol.value, sector: route.params.sector });
});

    return {
      symbolData,
      isLoading,
      error,
      growthMetricsChartData,
      financialPerformanceChartData,
      profitabilityMetricsChartData,
      efficiencyMetricsChartData,
      valuationMetricsChartData,
      analystExpectationsChartData,
      stockPerformanceChartData,
      analystTargetPriceChartData
    };
  }
});
</script>

<style scoped>
.charts-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.chart {
  width: 48%;
}

.chart-container {
  position: relative;
  height: 400px;
}
</style>