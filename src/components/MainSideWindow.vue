<template>
  <div class="card">
    <h3>{{ data.Symbol }} - {{ data.Name }}</h3>
    <p><strong>Sector:</strong> {{ sector }}</p>
    <p><strong>Latest Quarter Revenue:</strong> ${{ parseFloat(data.RevenueTTM).toLocaleString() }}</p>
    <p><strong>Earnings Growth:</strong> {{ parseFloat(data.QuarterlyEarningsGrowthYOY) * 100 }}%</p>
    <button @click="navigateToPrediction">Predict</button>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';

export default {
  name: 'MainSideWindow',
  props: {
    data: Object,
    sector: String
  },
  setup(props) {
    const router = useRouter();

    const navigateToPrediction = () => {
      router.push({ 
        name: 'prediction-data',
        params: { symbol: props.data.Symbol, sector: props.sector }
      });
    };

    return {
      navigateToPrediction
    };
  }
};
</script>

<style scoped>
.card {
  width: 300px;
  padding: 20px;
  height: 24.5rem;
  border-radius: 0% !important;
  background-color: #4169E1;
  font-family: 'Montserrat', sans-serif;
  font-weight: 900;
  color: black;
  font-size: 17px;
  text-align: center;
}

.card h3 {
  margin-top: 0;
  font-family: 'Montserrat', sans-serif;
  font-weight: 900;
  color: black;
  font-size: 30px;
  text-align: center;
}

.card p {
  margin-bottom: 10px;
}

.card button {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
}

button {
  background-color: white;
  color: #4169E1;
  border: 2px solid #002080;
  padding: 8px !important;
  width: 6rem !important;
  margin-left: 4rem !important;
  font-family: 'Montserrat', sans-serif;
  font-weight: 900;
  font-size: 1em;
  cursor: pointer;
  border-radius: 40%;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #1249ef;
  color: black;
  border: solid black;
}
</style>
