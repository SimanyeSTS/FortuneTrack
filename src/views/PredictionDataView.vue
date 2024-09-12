<template>
  <div class="prediction-data-view">
    <div v-if="isLoading">Loading...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else-if="symbolData">
      <h1>{{ symbolData.Name }} ({{ symbolData.Symbol }})</h1>
      <p>Sector: {{ sector }}</p>
      
      <div class="data-section">
        <h2>Prediction Overview</h2>
        <p><strong>Asset Type:</strong> {{ symbolData.AssetType }}</p>
        <p><strong>Description:</strong> {{ symbolData.Description }}</p>
        <p><strong>Exchange:</strong> {{ symbolData.Exchange }}</p>
        <p><strong>Currency:</strong> {{ symbolData.Currency }}</p>
        <p><strong>Country:</strong> {{ symbolData.Country }}</p>
        <p><strong>Industry:</strong> {{ symbolData.Industry }}</p>
        <p><strong>Address:</strong> {{ symbolData.Address }}</p>
        <p><strong>Official Site:</strong> <a :href="symbolData.OfficialSite" target="_blank">{{ symbolData.OfficialSite }}</a></p>
        <p><strong>Fiscal Year End:</strong> {{ symbolData.FiscalYearEnd }}</p>
        <p><strong>Latest Quarter:</strong> {{ formatDate(symbolData.LatestQuarter) }}</p>
      </div>

      <div class="chart-section">
        <h2>Growth Metrics</h2>
        <LineChart :chartData="prepareGrowthMetricsData()" />
      </div>

      <div class="chart-section">
        <h2>Financial Performance</h2>
        <LineChart :chartData="prepareFinancialPerformanceData()" />
      </div>

      <div class="chart-section">
        <h2>Profitability Metrics</h2>
        <RadarChart :chartData="prepareProfitabilityMetricsData()" />
      </div>

      <div class="chart-section">
        <h2>Efficiency Metrics</h2>
        <RadarChart :chartData="prepareEfficiencyMetricsData()" />
      </div>

      <div class="chart-section">
        <h2>Valuation Metrics</h2>
        <BarChart :chartData="prepareValuationMetricsData()" />
      </div>

      <div class="chart-section">
        <h2>Analyst Expectations</h2>
        <BarChart :chartData="prepareAnalystExpectationsData()" />
      </div>

      <div class="chart-section">
        <h2>Stock Performance</h2>
        <ScatterChart :chartData="prepareStockPerformanceData()" />
      </div>

      <div class="chart-section">
        <h2>Analyst Target Price</h2>
        <GaugeChart :chartData="prepareAnalystTargetPriceData()" />
      </div>
    </div>
    <div v-else class="error">No data available for this symbol</div>
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
  name: 'PredictionDataView',
  components: {
    LineChart,
    RadarChart,
    BarChart,
    ScatterChart,
    GaugeChart,
  },
  setup() {
    const store = useStore();
    const route = useRoute();

    const symbol = computed(() => route.params.symbol);
    const sector = computed(() => route.params.sector);
    const isLoading = computed(() => store.state.isLoading);
    const error = computed(() => store.state.error);
    const symbolData = computed(() => store.state.symbolData);

    const formatNumber = (value) => {
      return parseFloat(value).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    };

    const formatPercentage = (value) => {
      return (parseFloat(value) * 100).toFixed(2) + '%';
    };

    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString();
    };

    const prepareGrowthMetricsData = () => ({
      labels: ['Quarterly Earnings Growth YOY', 'Quarterly Revenue Growth YOY'],
      datasets: [{
        label: 'Growth Metrics',
        data: [
          parseFloat(symbolData.value.QuarterlyEarningsGrowthYOY) * 100,
          parseFloat(symbolData.value.QuarterlyRevenueGrowthYOY) * 100
        ],
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }]
    });

    const prepareFinancialPerformanceData = () => ({
      labels: ['Market Capitalization', 'EBITDA', 'Revenue TTM'],
      datasets: [{
        label: 'Financial Performance (Billions USD)',
        data: [
          parseFloat(symbolData.value.MarketCapitalization) / 1e9,
          parseFloat(symbolData.value.EBITDA) / 1e9,
          parseFloat(symbolData.value.RevenueTTM) / 1e9
        ],
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.1
      }]
    });

    const prepareProfitabilityMetricsData = () => ({
      labels: ['Profit Margin', 'Operating Margin TTM', 'Return on Assets TTM', 'Return on Equity TTM'],
      datasets: [{
        label: 'Profitability Metrics',
        data: [
          parseFloat(symbolData.value.ProfitMargin),
          parseFloat(symbolData.value.OperatingMarginTTM),
          parseFloat(symbolData.value.ReturnOnAssetsTTM),
          parseFloat(symbolData.value.ReturnOnEquityTTM)
        ],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgb(255, 99, 132)',
        pointBackgroundColor: 'rgb(255, 99, 132)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(255, 99, 132)'
      }]
    });

    const prepareEfficiencyMetricsData = () => ({
      labels: ['Beta', '50 Day Moving Average', '200 Day Moving Average'],
      datasets: [{
        label: 'Efficiency Metrics',
        data: [
          parseFloat(symbolData.value.Beta),
          parseFloat(symbolData.value.Day50MovingAverage),
          parseFloat(symbolData.value.Day200MovingAverage)
        ],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgb(54, 162, 235)',
        pointBackgroundColor: 'rgb(54, 162, 235)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(54, 162, 235)'
      }]
    });

    const prepareValuationMetricsData = () => ({
      labels: ['PE Ratio', 'PEG Ratio', 'Price to Sales Ratio TTM', 'Price to Book Ratio', 'EV To Revenue', 'EV To EBITDA'],
      datasets: [{
        label: 'Valuation Metrics',
        data: [
          parseFloat(symbolData.value.PERatio),
          parseFloat(symbolData.value.PEGRatio),
          parseFloat(symbolData.value.PriceToSalesRatioTTM),
          parseFloat(symbolData.value.PriceToBookRatio),
          parseFloat(symbolData.value.EVToRevenue),
          parseFloat(symbolData.value.EVToEBITDA)
        ],
        backgroundColor: 'rgba(255, 206, 86, 0.2)',
        borderColor: 'rgb(255, 206, 86)',
        borderWidth: 1
      }]
    });

    const prepareAnalystExpectationsData = () => ({
      labels: ['Strong Buy', 'Buy', 'Hold', 'Sell', 'Strong Sell'],
      datasets: [{
        label: 'Analyst Ratings',
        data: [
          symbolData.value.AnalystRatingStrongBuy,
          symbolData.value.AnalystRatingBuy,
          symbolData.value.AnalystRatingHold,
          symbolData.value.AnalystRatingSell,
          symbolData.value.AnalystRatingStrongSell
        ],
        backgroundColor: [
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(153, 102, 255, 0.2)'
        ],
        borderColor: [
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
          'rgb(255, 206, 86)',
          'rgb(255, 99, 132)',
          'rgb(153, 102, 255)'
        ],
        borderWidth: 1
      }]
    });

    const prepareStockPerformanceData = () => ({
      datasets: [{
        label: 'Stock Performance',
        data: [
          { x: parseFloat(symbolData.value.Week52Low), y: parseFloat(symbolData.value.DividendYield) * 100 }
        ],
        backgroundColor: 'rgb(255, 99, 132)'
      }]
    });

    const prepareAnalystTargetPriceData = () => ({
      datasets: [{
        data: [parseFloat(symbolData.value.AnalystTargetPrice)],
        backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)'],
        borderColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 206, 86)'],
      }],
      labels: ['Low', 'Target', 'High'],
      min: parseFloat(symbolData.value.Week52Low),
      max: parseFloat(symbolData.value.Week52High),
    });

    onMounted(() => {
      store.dispatch('fetchPredictionData', { symbol: symbol.value, sector: sector.value });
    });

    return {
      isLoading,
      error,
      symbolData,
      sector,
      formatNumber,
      formatPercentage,
      formatDate,
      prepareGrowthMetricsData,
      prepareFinancialPerformanceData,
      prepareProfitabilityMetricsData,
      prepareEfficiencyMetricsData,
      prepareValuationMetricsData,
      prepareAnalystExpectationsData,
      prepareStockPerformanceData,
      prepareAnalystTargetPriceData,
    };
  },
});
</script>

<style scoped>
.prediction-data-view {
  padding: 20px;
}

h1, h2 {
  font-family: 'Montserrat', sans-serif;
  font-weight: 900;
  color: white;
}

.data-section, .chart-section {
  margin-top: 20px;
  background-color: rgba(65, 105, 225, 0.1);
  padding: 20px;
  border-radius: 10px;
}

.error {
  color: red;
  font-weight: bold;
  font-family: 'Montserrat', sans-serif;
  font-weight: 900;
}
</style>