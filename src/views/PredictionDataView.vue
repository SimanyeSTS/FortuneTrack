<template>
  <h1 class="heading">Prediction Data</h1>
  <div class="prediction-data-view">
    <SpinnerComp v-if="isLoading" />    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else-if="predictionData">
      <h1>{{ predictionData.Name }} ({{ predictionData.Symbol }})</h1>
      <p>Sector: {{ sector }}</p>

      <div class="data-section">
        <h2>Prediction Overview</h2>
        <p><strong>Asset Type:</strong> {{ predictionData.AssetType || 'N/A' }}</p>
        <p><strong>Description:</strong> {{ predictionData.Description || 'N/A' }}</p>
        <p><strong>Exchange:</strong> {{ predictionData.Exchange || 'N/A' }}</p>
        <p><strong>Currency:</strong> {{ predictionData.Currency || 'N/A' }}</p>
        <p><strong>Country:</strong> {{ predictionData.Country || 'N/A' }}</p>
        <p><strong>Industry:</strong> {{ predictionData.Industry || 'N/A' }}</p>
        <p><strong>Address:</strong> {{ predictionData.Address || 'N/A' }}</p>
        <p><strong>Official Site:</strong> <a :href="predictionData.OfficialSite || '#'">{{ predictionData.OfficialSite || 'N/A' }}</a></p>
        <p><strong>Fiscal Year End:</strong> {{ predictionData.FiscalYearEnd || 'N/A' }}</p>
        <p><strong>Latest Quarter:</strong> {{ formatDate(predictionData.LatestQuarter) }}</p>
      </div>

      <div class="chart-section" v-if="predictionData.QuarterlyEarningsGrowthYOY !== undefined && predictionData.QuarterlyRevenueGrowthYOY !== undefined">
        <h2>Growth Metrics</h2>
        <LineChart :chartData="prepareGrowthMetricsData()" />
      </div>

      <div class="chart-section" v-if="predictionData.MarketCapitalization !== undefined && predictionData.EBITDA !== undefined && predictionData.RevenueTTM !== undefined">
        <h2>Financial Performance</h2>
        <LineChart :chartData="prepareFinancialPerformanceData()" />
      </div>

      <div class="chart-section" v-if="predictionData.ProfitMargin !== undefined && predictionData.OperatingMarginTTM !== undefined && predictionData.ReturnOnAssetsTTM !== undefined && predictionData.ReturnOnEquityTTM !== undefined">
        <h2>Profitability Metrics</h2>
        <RadarChart :chartData="prepareProfitabilityMetricsData()" />
      </div>

      <div class="chart-section" v-if="predictionData.Beta !== undefined && predictionData.Day50MovingAverage !== undefined && predictionData.Day200MovingAverage !== undefined">
        <h2>Efficiency Metrics</h2>
        <RadarChart :chartData="prepareEfficiencyMetricsData()" />
      </div>

      <div class="chart-section" v-if="predictionData.PERatio !== undefined && predictionData.PEGRatio !== undefined && predictionData.PriceToSalesRatioTTM !== undefined && predictionData.PriceToBookRatio !== undefined && predictionData.EVToRevenue !== undefined && predictionData.EVToEBITDA !== undefined">
        <h2>Valuation Metrics</h2>
        <BarChart :chartData="prepareValuationMetricsData()" />
      </div>

      <div class="chart-section" v-if="predictionData.AnalystRatingStrongBuy !== undefined && predictionData.AnalystRatingBuy !== undefined && predictionData.AnalystRatingHold !== undefined && predictionData.AnalystRatingSell !== undefined && predictionData.AnalystRatingStrongSell !== undefined">
        <h2>Analyst Expectations</h2>
        <BarChart :chartData="prepareAnalystExpectationsData()" />
      </div>

      <div class="chart-section" v-if="predictionData.StockPerformance1Year !== undefined && predictionData.StockPerformance3Year !== undefined && predictionData.StockPerformance5Year !== undefined">
        <h2>Stock Performance</h2>
        <ScatterChart :chartData="prepareStockPerformanceData()" />
      </div>

      <div class="chart-section" v-if="predictionData.AnalystTargetPriceLow !== undefined && predictionData.AnalystTargetPriceHigh !== undefined && predictionData.AnalystTargetPriceMedian !== undefined">
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
import SpinnerComp from '@/components/SpinnerComp.vue';

export default defineComponent({
  name: 'PredictionDataView',
  components: {
    LineChart,
    RadarChart,
    BarChart,
    ScatterChart,
    GaugeChart,
    SpinnerComp
  },
  setup() {
    const store = useStore()
    const route = useRoute()

    const symbol = computed(() => route.params.symbol)
    const sector = computed(() => route.params.sector);
    const isLoading = computed(() => store.state.isLoading)
    const error = computed(() => store.state.error)

    const predictionData = computed(() => store.getters.singlePrediction);

    const formatNumber = (value) => {
      return value ? parseFloat(value).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : 'N/A';
    }

    const formatPercentage = (value) => {
      return value ? (parseFloat(value) * 100).toFixed(2) + '%' : 'N/A';
    }

    const formatDate = (dateString) => {
      return dateString ? new Date(dateString).toLocaleDateString() : 'N/A';
    }

    const prepareGrowthMetricsData = () => ({
  labels: ['Quarterly Earnings Growth YOY', 'Quarterly Revenue Growth YOY'],
  datasets: [{
    label: 'Growth Metrics',
    data: [
      parseFloat(predictionData.value.QuarterlyEarningsGrowthYOY) * 100,
      parseFloat(predictionData.value.QuarterlyRevenueGrowthYOY) * 100
    ],
    borderColor: 'rgba(0, 123, 255, 0.8)',
    backgroundColor: 'rgba(0, 123, 255, 0.2)',
    tension: 0.1
  }]
})

const prepareFinancialPerformanceData = () => ({
  labels: ['Market Capitalization', 'EBITDA', 'Revenue TTM'],
  datasets: [{
    label: 'Financial Performance (Billions USD)',
    data: [
      parseFloat(predictionData.value.MarketCapitalization) / 1e9,
      parseFloat(predictionData.value.EBITDA) / 1e9,
      parseFloat(predictionData.value.RevenueTTM) / 1e9
    ],
    borderColor: 'rgba(40, 167, 69, 0.8)',
    backgroundColor: 'rgba(40, 167, 69, 0.2)',
    tension: 0.1
  }]
})

const prepareProfitabilityMetricsData = () => ({
  labels: ['Profit Margin', 'Operating Margin TTM', 'Return on Assets TTM', 'Return on Equity TTM'],
  datasets: [{
    label: 'Profitability Metrics',
    data: [
      parseFloat(predictionData.value.ProfitMargin),
      parseFloat(predictionData.value.OperatingMarginTTM),
      parseFloat(predictionData.value.ReturnOnAssetsTTM),
      parseFloat(predictionData.value.ReturnOnEquityTTM)
    ],
    backgroundColor: 'rgba(255, 193, 7, 0.2)',
    borderColor: 'rgba(255, 193, 7, 0.8)',
    pointBackgroundColor: 'rgba(255, 193, 7, 0.8)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(255, 193, 7, 0.8)'
  }]
})

const prepareEfficiencyMetricsData = () => ({
  labels: ['Beta', '50 Day Moving Average', '200 Day Moving Average'],
  datasets: [{
    label: 'Efficiency Metrics',
    data: [
      parseFloat(predictionData.value.Beta),
      parseFloat(predictionData.value.Day50MovingAverage),
      parseFloat(predictionData.value.Day200MovingAverage)
    ],
    backgroundColor: 'rgba(23, 162, 184, 0.2)',
    borderColor: 'rgba(23, 162, 184, 0.8)',
    pointBackgroundColor: 'rgba(23, 162, 184, 0.8)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(23, 162, 184, 0.8)'
  }]
})

const prepareValuationMetricsData = () => ({
  labels: ['P/E Ratio', 'PEG Ratio', 'Price to Sales Ratio TTM', 'Price to Book Ratio', 'EV to Revenue', 'EV to EBITDA'],
  datasets: [{
    label: 'Valuation Metrics',
    data: [
      parseFloat(predictionData.value.PERatio),
      parseFloat(predictionData.value.PEGRatio),
      parseFloat(predictionData.value.PriceToSalesRatioTTM),
      parseFloat(predictionData.value.PriceToBookRatio),
      parseFloat(predictionData.value.EVToRevenue),
      parseFloat(predictionData.value.EVToEBITDA)
    ],
    backgroundColor: [
      'rgba(255, 99, 132, 0.5)', // Bright pink
      'rgba(54, 162, 235, 0.5)', // Bright blue
      'rgba(255, 206, 86, 0.5)', // Bright yellow
      'rgba(75, 192, 192, 0.5)', // Bright teal
      'rgba(153, 102, 255, 0.5)', // Bright purple
      'rgba(255, 159, 64, 0.5)'  // Bright orange
    ],
    borderColor: [
      'rgba(255, 99, 132, 1)',   // Bright pink
      'rgba(54, 162, 235, 1)',   // Bright blue
      'rgba(255, 206, 86, 1)',   // Bright yellow
      'rgba(75, 192, 192, 1)',   // Bright teal
      'rgba(153, 102, 255, 1)',  // Bright purple
      'rgba(255, 159, 64, 1)'    // Bright orange
    ],
    borderWidth: 1
  }]
})

const prepareAnalystExpectationsData = () => ({
  labels: ['Strong Buy', 'Buy', 'Hold', 'Sell', 'Strong Sell'],
  datasets: [{
    label: 'Analyst Expectations',
    data: [
      parseFloat(predictionData.value.AnalystRatingStrongBuy),
      parseFloat(predictionData.value.AnalystRatingBuy),
      parseFloat(predictionData.value.AnalystRatingHold),
      parseFloat(predictionData.value.AnalystRatingSell),
      parseFloat(predictionData.value.AnalystRatingStrongSell)
    ],
    backgroundColor: [
      'rgba(255, 99, 132, 0.5)', 
      'rgba(54, 162, 235, 0.5)',
      'rgba(255, 206, 86, 0.5)', 
      'rgba(75, 192, 192, 0.5)', 
      'rgba(153, 102, 255, 0.5)' 
    ],
    borderColor: [
      'rgba(255, 99, 132, 1)',
      'rgba(54, 162, 235, 1)',   
      'rgba(255, 206, 86, 1)',  
      'rgba(75, 192, 192, 1)',   
      'rgba(153, 102, 255, 1)'  
    ],
    borderWidth: 1
  }]
})
const prepareStockPerformanceData = () => ({
  labels: ['1 Year', '3 Year', '5 Year'],
  datasets: [{
    label: 'Stock Performance',
    data: [
      parseFloat(predictionData.value.StockPerformance1Year),
      parseFloat(predictionData.value.StockPerformance3Year),
      parseFloat(predictionData.value.StockPerformance5Year)
    ],
    backgroundColor: [
      'rgba(52, 58, 64, 0.2)',
      'rgba(255, 193, 7, 0.2)',
      'rgba(0, 123, 255, 0.2)'
    ],
    borderColor: [
      'rgba(52, 58, 64, 0.8)',
      'rgba(255, 193, 7, 0.8)',
      'rgba(0, 123, 255, 0.8)'
    ],
    pointBackgroundColor: [
      'rgba(52, 58, 64, 0.8)',
      'rgba(255, 193, 7, 0.8)',
      'rgba(0, 123, 255, 0.8)'
    ],
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: [
      'rgba(52, 58, 64, 0.8)',
      'rgba(255, 193, 7, 0.8)',
      'rgba(0, 123, 255, 0.8)'
    ]
  }]
})

const prepareAnalystTargetPriceData = () => ({
  labels: ['Low', 'High', 'Median'],
  datasets: [{
    label: 'Analyst Target Price',
    data: [
      parseFloat(predictionData.value.AnalystTargetPriceLow),
      parseFloat(predictionData.value.AnalystTargetPriceHigh),
      parseFloat(predictionData.value.AnalystTargetPriceMedian)
    ],
    backgroundColor: [
      'rgba(0, 123, 255, 0.2)',
      'rgba(255, 82, 82, 0.2)',
      'rgba(23, 162, 184, 0.2)'
    ],
    borderColor: [
      'rgba(0, 123, 255, 0.8)',
      'rgba(255, 82, 82, 0.8)',
      'rgba(23, 162, 184, 0.8)'
    ],
    pointBackgroundColor: [
      'rgba(0, 123, 255, 0.8)',
      'rgba(255, 82, 82, 0.8)',
      'rgba(23, 162, 184, 0.8)'
    ],
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: [
      'rgba(0, 123, 255, 0.8)',
      'rgba(255, 82, 82, 0.8)',
      'rgba(23, 162, 184, 0.8)'
    ]
  }]
})

    onMounted(() => {
      if (symbol.value) {
        store.dispatch('fetchPredictionBySymbol', symbol.value);
      }
    })

    return {
      symbol,
      sector,
      isLoading,
      error,
      predictionData,
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
      prepareAnalystTargetPriceData
    }
  }
})
</script>

<style scoped>
.prediction-data-view {
  font-family: 'Montserrat';
  color: white;
  padding: 20px;
}

.data-section {
  margin-bottom: 20px;
}

.chart-section {
  margin-bottom: 30px;
}

.error {
  color: white;
}

.heading{
  margin-top: 1%;
  margin: 1%;
  font-family: 'Montserrat', sans-serif;
    font-weight: 900;
    color: white;
    font-size: 30px;
}

h1, h2{
  font-family: 'Montserrat', sans-serif;
    font-weight: 900;
    color: white;
    font-size: 26px;
}

p{
  font-family: 'Montserrat', sans-serif;
    font-weight: 900;
    color: white;
    font-size: 17px;
}
</style>
