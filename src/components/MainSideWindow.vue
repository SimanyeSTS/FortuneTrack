<template>
  <div class="card">
    <div class="card-header">
      <h3>{{ data.Symbol }} - {{ data.Name }}</h3>
    </div>
    <div class="card-content">
      <p><strong>Sector:</strong> {{ sector }}</p>
      <p><strong>Latest Quarter Revenue:</strong> ${{ parseFloat(data.RevenueTTM).toLocaleString() }}</p>
      <p><strong>Earnings Growth:</strong> {{ parseFloat(data.QuarterlyEarningsGrowthYOY) * 100 }}%</p>
    </div>
    <div class="card-footer">
      <button @click="handlePredictClick">Predict</button>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { computed } from 'vue';
import Swal from 'sweetalert2';

export default {
  name: 'MainSideWindow',
  props: {
    data: {
      type: Object,
      required: true,
      validator: value => value && value.Symbol && value.RevenueTTM
    },
    sector: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const router = useRouter();
    const store = useStore();

    const currentUser = computed(() => store.getters.current);

    const navigateToPrediction = () => {
      router.push({ 
        name: 'prediction-data',
        params: { symbol: props.data.Symbol, sector: props.sector }
      });
    };

    const handlePredictClick = () => {
      if (!currentUser.value) {
        Swal.fire({
          title: 'Authentication Required',
          text: 'Please login to access prediction data',
          icon: 'warning',
          showCancelButton: false,
          confirmButtonColor: '#4169E1',
          cancelButtonColor: '#d33',
          cancelButtonText: 'Cancel'
        }).then((result) => {
          if (result.isConfirmed) {
            router.push('/predict');
          }
        });
      } else {
        navigateToPrediction();
      }
    };

    return {
      handlePredictClick
    };
  }
}
</script>

<style scoped>
.card {
  width: 300px;
  min-height: 400px;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #4169E1;
  border-radius: 0;
}

.card-header {
  padding: 1.5rem 1rem;
}

.card-content {
  flex: 1;
  padding: 0 1rem;
}

.card-footer {
  padding: 1.5rem 1rem;
}

h3 {
  margin: 0;
  font-family: 'Montserrat', sans-serif;
  font-weight: 900;
  color: black;
  font-size: 24px;
  text-align: center;
}

p {
  margin-bottom: 1rem;
  font-family: 'Montserrat', sans-serif;
  font-weight: 900;
  color: black;
  font-size: 17px;
  text-align: center;
}

button {
  background-color: white;
  color: #4169E1;
  border: 2px solid #002080;
  padding: 8px 16px;
  width: 100% !important;
  max-width: 200px;
  margin: 0 auto;
  display: block;
  font-family: 'Montserrat', sans-serif;
  font-weight: 900;
  font-size: 1em;
  cursor: pointer;
  border-radius: 20px;
  transition: all 0.3s ease;
}

button:hover {
  background-color: #1249ef;
  color: black;
  border: solid black;
}

@media (max-width: 1024px) {
  .card {
    width: 100%;
    min-height: 300px;
  }

  .card-header {
    padding: 1rem;
  }

  .card-content {
    padding: 0.5rem 1rem;
  }

  .card-footer {
    padding: 1rem;
  }
}
</style>