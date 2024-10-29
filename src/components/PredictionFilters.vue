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
        // Emit the filter values to parent component
        this.$emit('filter-change', {
          searchQuery: this.searchQuery,
          selectedCategory: this.selectedCategory,
          sortBy: this.sortBy
        });
      },
      filterData(data) {
        let filteredData = [...data];
  
        // Apply search filter
        if (this.searchQuery) {
          const query = this.searchQuery.toLowerCase();
          filteredData = filteredData.filter(item => 
            item.Symbol.toLowerCase().includes(query) || 
            item.Name.toLowerCase().includes(query)
          );
        }
  
        // Apply category filter
        if (this.selectedCategory) {
          filteredData = filteredData.filter(item => item.Sector === this.selectedCategory);
        }
  
        // Apply sorting
        if (this.sortBy) {
          switch(this.sortBy) {
            case 'priceAsc':
              filteredData.sort((a, b) => parseFloat(a.Price) - parseFloat(b.Price));
              break;
            case 'priceDesc':
              filteredData.sort((a, b) => parseFloat(b.Price) - parseFloat(a.Price));
              break;
            case 'growthAsc':
              filteredData.sort((a, b) => parseFloat(a.QuarterlyEarningsGrowthYOY) - parseFloat(b.QuarterlyEarningsGrowthYOY));
              break;
            case 'growthDesc':
              filteredData.sort((a, b) => parseFloat(b.QuarterlyEarningsGrowthYOY) - parseFloat(a.QuarterlyEarningsGrowthYOY));
              break;
            case 'revenueAsc':
              filteredData.sort((a, b) => parseFloat(a.RevenueTTM) - parseFloat(b.RevenueTTM));
              break;
            case 'revenueDesc':
              filteredData.sort((a, b) => parseFloat(b.RevenueTTM) - parseFloat(a.RevenueTTM));
              break;
            case 'alphabetical':
              filteredData.sort((a, b) => a.Name.localeCompare(b.Name));
              break;
            case 'alphabeticalDesc':
              filteredData.sort((a, b) => b.Name.localeCompare(a.Name));
              break;
          }
        }
  
        return filteredData;
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
    width: 100%;
    padding: 10px;
    border: 2px solid #3668ff;
    border-radius: 4px;
    font-size: 16px;
    background-color: white;
    color: black;
  }
  
  .filter-section {
    display: flex;
    gap: 15px;
  }
  
  .filter-select {
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