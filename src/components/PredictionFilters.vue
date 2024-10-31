<template>
    <div class="filters-container">
      <div class="search-section">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Search by company name or symbol..."
          class="search-input"
          @input="handleFilters"
        />
      </div>
      <div class="filter-section">
        <select v-model="selectedCategory" class="filter-select" @change="handleFilters">
          <option value="">All Categories</option>
          <option v-for="category in categories" :key="category" :value="category">
            {{ category }}
          </option>
        </select>
        <select v-model="sortBy" class="filter-select" @change="handleFilters">
          <option value="">Sort By</option>
          <option value="priceAsc">Price: Low to High</option>
          <option value="priceDesc">Price: High to Low</option>
          <option value="growthAsc">Growth: Low to High</option>
          <option value="growthDesc">Growth: High to Low</option>
          <option value="revenueAsc">Revenue: Low to High</option>
          <option value="revenueDesc">Revenue: High to Low</option>
          <option value="alphabetical">Company Name: A-Z</option>
          <option value="alphabeticalDesc">Company Name: Z-A</option>
        </select>
      </div>
    </div>
  </template>
  
  <script>
export default {
  name: 'PredictionFilters',
  props: {
    sectors: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      searchQuery: '',
      selectedCategory: '',
      sortBy: '',
      categories: ['Retail', 'Technology', 'Food and Beverages', 'Healthcare']
    }
  },
  methods: {
    handleFilters() {
      this.$emit('filter-change', {
        searchQuery: this.searchQuery,
        selectedCategory: this.selectedCategory,
        sortBy: this.sortBy
      });
    }
  }
}
</script>
  
  <style scoped>
  .filters-container {
    margin: 20px 0;
    padding: 15px;
    border-radius: 8px;
  }
  
  .search-section {
    margin-bottom: 15px;
  }
  
  .search-input {
    font-family: 'Montserrat', sans-serif;
  font-weight: 900;
    width: 100%;
    padding: 10px;
    border: 2px solid #3668ff;
    border-radius: 4px;
    font-size: 16px;
    background-color: white;
    color: black;
  }
  
  .filter-section {
    font-family: 'Montserrat', sans-serif;
  font-weight: 900;
    display: flex;
    gap: 15px;
  }
  
  .filter-select {
    font-family: 'Montserrat', sans-serif;
  font-weight: 900;
    flex: 1;
    padding: 10px;
    border: 2px solid #3668ff;
    border-radius: 4px;
    font-size: 16px;
    background-color: white;
    color: black;
    cursor: pointer;
  }
  
  @media (max-width: 768px) {
    .filter-section {
      flex-direction: column;
    }
    
    .filter-select {
      width: 100%;
    }
  }
  </style>