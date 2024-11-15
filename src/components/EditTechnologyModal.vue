<template>
    <div class="admin-technology-modal">
      <div class="admin-technology-modal-content">
        <h1>Please verify all information is correct on the technology prediction before altering!</h1>
        <div class="modal-scroll-container">
          <form @submit.prevent="updateTechnology">
            <div class="form-group">
              <label for="Symbol">Symbol:</label>
              <input 
                type="text" 
                id="Symbol" 
                v-model="Symbol" 
                required
                :disabled="isLoading"
              >
            </div>
            <div class="form-group">
              <label for="AssetType">Asset Type:</label>
              <input 
                type="text" 
                id="AssetType" 
                v-model="AssetType" 
                required
                :disabled="isLoading"
              >
            </div>
            <div class="form-group">
              <label for="Name">Name:</label>
              <input 
                type="text" 
                id="Name" 
                v-model="Name" 
                required
                :disabled="isLoading"
              >
            </div>
            <div class="form-group">
              <label for="Description">Description:</label>
              <textarea 
                id="Description" 
                v-model="Description" 
                :disabled="isLoading"
              ></textarea>
            </div>
            <div class="form-group">
              <label for="CIK">CIK:</label>
              <input 
                type="text" 
                id="CIK" 
                v-model="CIK" 
                :disabled="isLoading"
              >
            </div>
            <div class="form-group">
              <label for="Exchange">Exchange:</label>
              <input 
                type="text" 
                id="Exchange" 
                v-model="Exchange" 
                :disabled="isLoading"
              >
            </div>
            <div class="form-group">
              <label for="Currency">Currency:</label>
              <input 
                type="text" 
                id="Currency" 
                v-model="Currency" 
                :disabled="isLoading"
              >
            </div>
            <div class="form-group">
              <label for="Country">Country:</label>
              <input 
                type="text" 
                id="Country" 
                v-model="Country" 
                :disabled="isLoading"
              >
            </div>
            <div class="form-group">
              <label for="Sector">Sector:</label>
              <input 
                type="text" 
                id="Sector" 
                v-model="Sector" 
                :disabled="isLoading"
              >
            </div>
            <div class="form-group">
              <label for="Industry">Industry:</label>
              <input 
                type="text" 
                id="Industry" 
                v-model="Industry" 
                :disabled="isLoading"
              >
            </div>
            <div class="form-group">
              <label for="Address">Address:</label>
              <input 
                type="text" 
                id="Address" 
                v-model="Address" 
                :disabled="isLoading"
              >
            </div>
            <div class="form-group">
              <label for="OfficialSite">Official Site:</label>
              <input 
                type="text" 
                id="OfficialSite" 
                v-model="OfficialSite" 
                :disabled="isLoading"
              >
            </div>
            <div class="form-group">
              <label for="FiscalYearEnd">Fiscal Year End:</label>
              <input 
                type="text" 
                id="FiscalYearEnd" 
                v-model="FiscalYearEnd" 
                :disabled="isLoading"
              >
            </div>
            <div class="form-group">
              <label for="LatestQuarter">Latest Quarter:</label>
              <input 
                type="text" 
                id="LatestQuarter" 
                v-model="LatestQuarter" 
                :disabled="isLoading"
              >
            </div>
            <div class="form-group">
              <label for="MarketCapitalization">Market Capitalization:</label>
              <input 
                type="number" 
                id="MarketCapitalization" 
                v-model.number="MarketCapitalization"
                step="0.01" 
                :disabled="isLoading"
              >
            </div>
            <div class="form-group">
              <label for="EBITDA">EBITDA:</label>
              <input 
                type="number" 
                id="EBITDA" 
                v-model.number="EBITDA" 
                step="0.01"
                :disabled="isLoading"
              >
            </div>
            <div class="form-group">
              <label for="PERatio">P/E Ratio:</label>
              <input 
                type="number" 
                id="PERatio" 
                v-model.number="PERatio"
                 step="0.01"
                :disabled="isLoading"
              >
            </div>
            <div class="form-group">
              <label for="PEGRatio">PEG Ratio:</label>
              <input 
                type="number" 
                id="PEGRatio" 
                v-model.number="PEGRatio" 
                 step="0.01"
                :disabled="isLoading"
              >
            </div>
            <div class="form-group">
              <label for="BookValue">Book Value:</label>
              <input 
                type="number" 
                id="BookValue" 
                v-model.number="BookValue" 
                 step="0.01"
                :disabled="isLoading"
              >
            </div>
            <div class="form-group">
              <label for="DividendPerShare">Dividend Per Share:</label>
              <input 
                type="number" 
                id="DividendPerShare" 
                v-model.number="DividendPerShare" 
                 step="0.01"
                :disabled="isLoading"
              >
            </div>
            <div class="form-group">
              <label for="DividendYield">Dividend Yield:</label>
              <input 
                type="number" 
                id="DividendYield" 
                v-model.number="DividendYield" 
                 step="0.01"
                :disabled="isLoading"
              >
            </div>
            <div class="form-group">
              <label for="EPS">EPS:</label>
              <input 
                type="number" 
                id="EPS" 
                v-model.number="EPS" 
                 step="0.01"
                :disabled="isLoading"
              >
            </div>
            <div class="form-group">
              <label for="RevenuePerShareTTM">Revenue Per Share TTM:</label>
              <input 
                type="number" 
                id="RevenuePerShareTTM" 
                v-model.number="RevenuePerShareTTM" 
                 step="0.01"
                :disabled="isLoading"
              >
            </div>
            <div class="form-group">
              <label for="ProfitMargin">Profit Margin:</label>
              <input 
                type="number" 
                id="ProfitMargin" 
                v-model.number="ProfitMargin" 
                 step="0.01"
                :disabled="isLoading"
              >
            </div>
            <div class="form-group">
              <label for="OperatingMarginTTM">Operating Margin TTM:</label>
              <input 
                type="number" 
                id="OperatingMarginTTM" 
                v-model.number="OperatingMarginTTM" 
                 step="0.01"
                :disabled="isLoading"
              >
            </div>
            <div class="form-group">
              <label for="ReturnOnAssetsTTM">Return On Assets TTM:</label>
              <input 
                type="number" 
                id="ReturnOnAssetsTTM" 
                v-model.number="ReturnOnAssetsTTM" 
                 step="0.01"
                :disabled="isLoading"
              >
            </div>
            <div class="form-group">
              <label for="ReturnOnEquityTTM">Return On Equity TTM:</label>
              <input 
                type="number" 
                id="ReturnOnEquityTTM" 
                v-model.number="ReturnOnEquityTTM" 
                 step="0.01"
                :disabled="isLoading"
              >
            </div>
            <div class="form-group">
              <label for="RevenueTTM">Revenue TTM:</label>
              <input 
                type="number" 
                id="RevenueTTM" 
                v-model.number="RevenueTTM"
                step="0.01" 
                :disabled="isLoading"
              >
            </div>
            <div class="form-group">
              <label for="GrossProfitTTM">Gross Profit TTM:</label>
              <input 
                type="number" 
                id="GrossProfitTTM" 
                v-model.number="GrossProfitTTM"
                 step="0.01"
                :disabled="isLoading"
              >
            </div>
            <div class="form-group">
              <label for="DilutedEPSTTM">Diluted EPS TTM:</label>
              <input 
                type="number" 
                id="DilutedEPSTTM" 
                v-model.number="DilutedEPSTTM" 
                 step="0.01"
                :disabled="isLoading"
              >
            </div>
            <div class="form-group">
              <label for="QuarterlyEarningsGrowthYOY">Quarterly Earnings Growth YOY:</label>
              <input 
                type="number" 
                id="QuarterlyEarningsGrowthYOY"
                v-model.number="QuarterlyEarningsGrowthYOY" 
                 step="0.01"
                :disabled="isLoading"
              >
            </div>
            <div class="form-group">
              <label for="QuarterlyRevenueGrowthYOY">Quarterly Revenue Growth YOY:</label>
              <input 
                type="number" 
                id="QuarterlyRevenueGrowthYOY" 
                v-model.number="QuarterlyRevenueGrowthYOY" 
                 step="0.01"
                :disabled="isLoading"
              >
            </div>
            <div class="form-group">
              <label for="AnalystTargetPrice">Analyst Target Price:</label>
              <input 
                type="number" 
                id="AnalystTargetPrice" 
                v-model.number="AnalystTargetPrice" 
                 step="0.01"
                :disabled="isLoading"
              >
            </div>
            <div class="form-group">
              <label for="AnalystRatingStrongBuy">Analyst Rating Strong Buy:</label>
              <input 
                type="number" 
                id="AnalystRatingStrongBuy" 
                v-model.number="AnalystRatingStrongBuy" 
                :disabled="isLoading"
              >
            </div>
            <div class="form-group">
              <label for="AnalystRatingBuy">Analyst Rating Buy:</label>
              <input 
                type="number" 
                id="AnalystRatingBuy" 
                v-model.number="AnalystRatingBuy" 
                :disabled="isLoading"
              >
            </div>
            <div class="form-group">
              <label for="AnalystRatingHold">Analyst Rating Hold:</label>
              <input 
                type="number" 
                id="AnalystRatingHold" 
                v-model.number="AnalystRatingHold" 
                :disabled="isLoading"
              >
            </div>
            <div class="form-group">
              <label for="AnalystRatingSell">Analyst Rating Sell:</label>
              <input 
                type="number" 
                id="AnalystRatingSell" 
                v-model.number="AnalystRatingSell" 
                :disabled="isLoading"
              >
            </div>
            <div class="form-group">
              <label for="AnalystRatingStrongSell">Analyst Rating Strong Sell:</label>
              <input 
                type="number" 
                id="AnalystRatingStrongSell" 
                v-model.number="AnalystRatingStrongSell" 
                :disabled="isLoading"
              >
            </div>
            <div class="form-group">
              <label for="TrailingPE">Trailing P/E:</label>
              <input 
                type="number" 
                id="TrailingPE" 
                v-model.number="TrailingPE" 
                 step="0.01"
                :disabled="isLoading"
              >
            </div>
            <div class="form-group">
              <label for="ForwardPE">Forward P/E:</label>
              <input 
                type="number" 
                id="ForwardPE" 
                v-model.number="ForwardPE" 
                 step="0.01"
                :disabled="isLoading"
              >
            </div>
            <div class="form-group">
              <label for="PriceToSalesRatioTTM">Price To Sales Ratio TTM:</label>
              <input 
                type="number" 
                id="PriceToSalesRatioTTM" 
                v-model.number="PriceToSalesRatioTTM" 
                 step="0.01"
                :disabled="isLoading"
              >
            </div>
            <div class="form-group">
              <label for="PriceToBookRatio">Price To Book Ratio:</label>
              <input 
                type="number" 
                id="PriceToBookRatio" 
                v-model.number="PriceToBookRatio" 
                 step="0.01"
                :disabled="isLoading"
              >
            </div>
            <div class="form-group">
              <label for="EVToRevenue">EV To Revenue:</label>
              <input 
                type="number" 
                id="EVToRevenue" 
                v-model.number="EVToRevenue" 
                 step="0.01"
                :disabled="isLoading"
              >
            </div>
            <div class="form-group">
              <label for="EVToEBITDA">EV To EBITDA:</label>
              <input 
                type="number" 
                id="EVToEBITDA" 
                v-model.number="EVToEBITDA" 
                 step="0.01"
                :disabled="isLoading"
              >
            </div>
            <div class="form-group">
              <label for="Beta">Beta:</label>
              <input 
                type="number" 
                id="Beta" 
                v-model.number="Beta" 
                 step="0.01"
                :disabled="isLoading"
              >
            </div>
            <div class="form-group">
              <label for="Week52High">52-Week High:</label>
              <input 
                type="number" 
                id="Week52High" 
                v-model.number="Week52High" 
                 step="0.01"
                :disabled="isLoading"
              >
            </div>
            <div class="form-group">
              <label for="Week52Low">52-Week Low:</label>
              <input 
                type="number" 
                id="Week52Low" 
                v-model.number="Week52Low" 
                 step="0.01"
                :disabled="isLoading"
              >
            </div>
            <div class="form-group">
              <label for="Day50MovingAverage">50-Day Moving Average:</label>
              <input 
                type="number" 
                id="Day50MovingAverage" 
                v-model.number="Day50MovingAverage" 
                 step="0.01"
                :disabled="isLoading"
              >
            </div>
            <div class="form-group">
              <label for="Day200MovingAverage">200-Day Moving Average:</label>
              <input 
                type="number" 
                id="Day200MovingAverage" 
                v-model.number="Day200MovingAverage" 
                 step="0.01"
                :disabled="isLoading"
              >
            </div>
            <div class="form-group">
              <label for="SharesOutstanding">Shares Outstanding:</label>
              <input 
                type="number" 
                id="SharesOutstanding" 
                v-model.number="SharesOutstanding" 
                :disabled="isLoading"
              >
            </div>
            <div class="form-group">
              <label for="DividendDate">Dividend Date:</label>
              <input 
                type="date" 
                id="DividendDate" 
                v-model="DividendDate" 
                :disabled="isLoading"
              >
            </div>
            <div class="form-group">
              <label for="ExDividendDate">Ex-Dividend Date:</label>
              <input 
                type="date" 
                id="ExDividendDate" 
                v-model="ExDividendDate" 
                :disabled="isLoading"
              >
            </div>
            <div class="button-group">
              <button 
                type="submit" 
                class="save-button"
                :disabled="isLoading"
              >
                {{ isLoading ? 'Updating...' : 'Update Prediction' }}
              </button>
            </div>
          </form>
        </div>
        <button 
          class="close-button" 
          @click="$emit('close')"
          :disabled="isLoading"
        >
          &times;
        </button>
      </div>
    </div>
  </template>
  
  <script>
  import { mapActions } from 'vuex';
  
  export default {
    props: {
      technology: Object,
      isLoading: Boolean
    },
    data() {
        return {
      Symbol: '',
      AssetType: '',
      Name: '',
      Description: '',
      CIK: '',
      Exchange: '',
      Currency: '',
      Country: '',
      Sector: '',
      Industry: '',
      Address: '',
      OfficialSite: '',
      FiscalYearEnd: '',
      LatestQuarter: '',
      MarketCapitalization: null,
      EBITDA: null,
      PERatio: null,
      PEGRatio: null,
      BookValue: null,
      DividendPerShare: null,
      DividendYield: null,
      EPS: null,
      RevenuePerShareTTM: null,
      ProfitMargin: null,
      OperatingMarginTTM: null,
      ReturnOnAssetsTTM: null,
      ReturnOnEquityTTM: null,
      RevenueTTM: null,
      GrossProfitTTM: null,
      DilutedEPSTTM: null,
      QuarterlyEarningsGrowthYOY: null,
      QuarterlyRevenueGrowthYOY: null,
      AnalystTargetPrice: null,
      AnalystRatingStrongBuy: null,
      AnalystRatingBuy: null,
      AnalystRatingHold: null,
      AnalystRatingSell: null,
      AnalystRatingStrongSell: null,
      TrailingPE: null,
      ForwardPE: null,
      PriceToSalesRatioTTM: null,
      PriceToBookRatio: null,
      EVToRevenue: null,
      EVToEBITDA: null,
      Beta: null,
      Week52High: null,
      Week52Low: null,
      Day50MovingAverage: null,
      Day200MovingAverage: null,
      SharesOutstanding: null,
      DividendDate: '',
      ExDividendDate: ''
    }
    },
    watch: {
      technology: {
        handler(newTechnology) {
          if (newTechnology) {
            this.populateForm(newTechnology);
          }
        },
        immediate: true
      }
    },
    methods: {
      ...mapActions(['updateTechnology']),
      
      populateForm(technology) {
        this.Symbol = technology.Symbol || '';
        this.AssetType = technology.AssetType || '';
        this.Name =  technology.Name || '';
        this.Description = technology.Description || '';
        this.CIK = technology.CIK || '';
        this.Exchange = technology.Exchange || '';
        this.Currency = technology.Currency || ''
        this.Country = technology.Country || '';
        this.Sector = technology.Sector || '';
        this.Industry = technology.Industry || '';
        this.Address = technology.Address || '';
        this.OfficialSite = technology.OfficialSite || '';
        this.FiscalYearEnd = technology.FiscalYearEnd || '';
        this.LatestQuarter = technology.LatestQuarter || '';
        this.MarketCapitalization = technology.MarketCapitalization != undefined ? technology.MarketCapitalization : null;
        this.EBITDA = technology.EBITDA != undefined ? technology.EBITDA : null;
        this.PERatio = technology.PERatio != undefined ? technology.PERatio : null;
        this.PEGRatio = technology.PEGRatio != undefined ? technology.PEGRatio : null;
        this.BookValue = technology.BookValue != undefined ? technology.BookValue : null;
        this.DividendPerShare = technology.DividendPerShare != undefined ? technology.DividendPerShare : null;
        this.DividendYield = technology.DividendYield != undefined ? technology.DividendYield : null;
        this.EPS = technology.EPS != undefined ? technology.EPS : null;
        this.RevenuePerShareTTM = technology.RevenuePerShareTTM != undefined ? technology.RevenuePerShareTTM : null;
        this.ProfitMargin = technology.ProfitMargin != undefined ? technology.ProfitMargin : null;
        this.OperatingMarginTTM = technology.OperatingMarginTTM != undefined ? technology.OperatingMarginTTM : null;
        this.ReturnOnAssetsTTM = technology.ReturnOnAssetsTTM != undefined ? technology.ReturnOnAssetsTTM : null;
        this.ReturnOnEquityTTM = technology .ReturnOnEquityTTM != undefined ? technology.ReturnOnEquityTTM : null;
        this.RevenueTTM = technology.RevenueTTM != undefined ? technology.RevenueTTM : null;
        this.GrossProfitTTM = technology.GrossProfitTTM != undefined ? technology.GrossProfitTTM : null;
        this.DilutedEPSTTM = technology.DilutedEPSTTM != undefined ? technology.DilutedEPSTTM  : null;
        this.QuarterlyEarningsGrowthYOY = technology.QuarterlyEarningsGrowthYOY != undefined ? technology.QuarterlyEarningsGrowthYOY : null;
        this.QuarterlyRevenueGrowthYOY = technology.QuarterlyRevenueGrowthYOY != undefined ? technology.QuarterlyRevenueGrowthYOY : null;
        this.AnalystTargetPrice = technology.AnalystTargetPrice != undefined ? technology.AnalystTargetPrice : null;
        this.AnalystRatingStrongBuy = technology.AnalystRatingStrongBuy != undefined ? technology.AnalystRatingStrongBuy : null;
        this.AnalystRatingBuy = technology.AnalystRatingBuy != undefined ? technology.AnalystRatingBuy : null;
        this.AnalystRatingHold = technology.AnalystRatingHold != undefined ? technology.AnalystRatingHold : null;
        this.AnalystRatingSell = technology.AnalystRatingSell != undefined ? technology.AnalystRatingSell : null;
        this.AnalystRatingStrongSell = technology.AnalystRatingStrongSell != undefined ? technology.AnalystRatingStrongSell : null;
        this.TrailingPE = technology.TrailingPE != undefined ? technology.TrailingPE : null;
        this.ForwardPE = technology.ForwardPE != undefined ? technology.ForwardPE : null;
        this.PriceToSalesRatioTTM = technology.PriceToSalesRatioTTM != undefined ? technology.PriceToSalesRatioTTM : null;
        this.PriceToBookRatio = technology.PriceToBookRatio != undefined ? technology.PriceToBookRatio : null;
        this.EVToRevenue = technology.EVToRevenue != undefined ? technology.EVToRevenue : null;
        this.EVToEBITDA = technology.EVToEBITDA != undefined ? technology.EVToEBITDA : null;
        this.Beta = technology.Beta != undefined ? technology.Beta : null;
        this.Week52High = technology['52WeekHigh'] != undefined ? technology['52WeekHigh'] : null;
        this.Week52Low = technology['52WeekLow'] != undefined ? technology['52WeekLow'] : null;
        this.Day50MovingAverage = technology['50DayMovingAverage'] != undefined ? technology['50DayMovingAverage'] : null;
        this.Day200MovingAverage = technology['200DayMovingAverage'] != undefined ? technology['200DayMovingAverage'] : null;
        this.SharesOutstanding = technology.SharesOutstanding != undefined ? technology.SharesOutstanding : null;
        this.DividendDate = technology.DividendDate ? technology.DividendDate.split('T')[0] : '';
  this.ExDividendDate = technology.ExDividendDate ? technology.ExDividendDate.split('T')[0] : '';
      },
      
      async updateTechnology() {
    const technologylId = this.technology.id;
    console.log('tech  object:', this.technology);
    console.log('tech  ID:', technologylId);
  
    if (!technologylId) {
      console.error('tech  ID is undefined');
      return;
    }
  
    console.log('Updating tech with ID:', technologylId);
  
    const technologyData = {
  Symbol: (this.Symbol || '').trim(),
  AssetType: (this.AssetType || '').trim(),
  Name: (this.Name || '').trim(),
  Description: (this.Description || '').trim(),
  CIK: (this.CIK || '').trim(),
  Exchange: (this.Exchange || '').trim(),
  Currency: (this.Currency || '').trim(),
  Country: (this.Country || '').trim(),
  Sector: (this.Sector || '').trim(),
  Industry: (this.Industry || '').trim(),
  Address: (this.Address || '').trim(),
  OfficialSite: (this.OfficialSite || '').trim(),
  FiscalYearEnd: (this.FiscalYearEnd || '').trim(),
  LatestQuarter: (this.LatestQuarter || '').trim(),
  MarketCapitalization: this.MarketCapitalization || null,
  EBITDA: this.EBITDA || null,
  PERatio: this.PERatio || null,
  PEGRatio: this.PEGRatio || null,
  BookValue: this.BookValue || null,
  DividendYield: this.DividendYield || null,
  EPS: this.EPS || null,
  RevenuePerShareTTM: this.RevenuePerShareTTM || null,
  ProfitMargin: this.ProfitMargin || null,
  OperatingMarginTTM: this.OperatingMarginTTM || null,
  ReturnOnAssetsTTM: this.ReturnOnAssetsTTM || null,
  ReturnOnEquityTTM: this.ReturnOnEquityTTM || null,
  RevenueTTM: this.RevenueTTM || null,
  GrossProfitTTM: this.GrossProfitTTM || null,
  DilutedEPSTTM: this.DilutedEPSTTM || null,
  QuarterlyEarningsGrowthYOY: this.QuarterlyEarningsGrowthYOY || null,
  QuarterlyRevenueGrowthYOY: this.QuarterlyRevenueGrowthYOY || null,
  AnalystTargetPrice: this.AnalystTargetPrice || null,
  AnalystRatingStrongBuy: this.AnalystRatingStrongBuy || null,
  AnalystRatingBuy: this.AnalystRatingBuy || null,
  AnalystRatingHold: this.AnalystRatingHold || null,
  AnalystRatingSell: this.AnalystRatingSell || null,
  AnalystRatingStrongSell: this.AnalystRatingStrongSell || null,
  TrailingPE: this.TrailingPE || null,
  ForwardPE: this.ForwardPE || null,
  PriceToSalesRatioTTM: this.PriceToSalesRatioTTM || null,
  PriceToBookRatio: this.PriceToBookRatio || null,
  EVToRevenue: this.EVToRevenue || null,
  EVToEBITDA: this.EVToEBITDA || null,
  Beta: this.Beta || null,
  Week52High: this.Week52High || null,
  Week52Low: this.Week52Low || null,
  Day50MovingAverage: this.Day50MovingAverage || null,
  Day200MovingAverage: this.Day200MovingAverage || null,
  SharesOutstanding: this.SharesOutstanding || null,
  DividendDate: (this.DividendDate || '').trim(),
  ExDividendDate: (this.ExDividendDate || '').trim()
};
  
    console.log('tech  data to be sent:', technologyData);
    try {
      await this.$store.dispatch('updateTechnology', { id: technologylId, technologyData });
      this.$emit('close'); // Close the modal after updating
    } catch (error) {
      console.error('Update error:', error);
      this.$emit('error', 'Failed to update technology data. Please try again.');
    }
  }
    }
  };
  </script>
  
  <style scoped>
  .admin-technology-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.1)!important;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  h1 {
    text-align: center;
  }
  
  .admin-technology-modal-content {
    background: #4169E1;
    padding: 20px;
    border-radius: 8px;
    width: 50%;
    height: 50%;
    position: relative;
    display: flex;
    flex-direction: column;
    max-width: 800px;
    max-height: 600px;
    min-height: 400px;
  }
  
  .modal-scroll-container {
    overflow-y: auto;
    margin-right: -10px;
    padding-right: 10px;
    flex-grow: 1;
  }
  
  .modal-scroll-container::-webkit-scrollbar {
    width: 8px;
  }
  
  .modal-scroll-container::-webkit-scrollbar-track {
    background: #2d5bd7;
    border-radius: 4px;
  }
  
  .modal-scroll-container::-webkit-scrollbar-thumb {
    background: #1a3c9e;
    border-radius: 4px;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  .form-group label {
    display: block;
    margin-bottom: 5px;
    color: rgb(45, 43, 43);
    text-align: center;
    font-family: 'Montserrat', sans-serif;
    font-weight: 500;
  }
  
  .form-group input,
  .form-group select, .form-group textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: white;
  }
  
  .form-group input:disabled,
  .form-group select:disabled {
    background-color: #f5f5f5;
    cursor: not-allowed;
  }
  
  .button-group {
    display: flex;
    justify-content: center;
    margin-top: 20px;
    margin-bottom: 10px;
  }
  
  .save-button {
    background-color: white;
    color: #4169E1;
    border: 2px solid #002080;
    padding: 10px 20px;
    font-family: 'Montserrat', sans-serif;
    font-weight: 900;
    cursor: pointer;
    border-radius: 4px;
    transition: background-color 0.3s;
  }
  
  .save-button:hover {
    background-color: #1249ef;
    color: black;
    border: solid black;
  }
  
  .save-button:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
  
  .close-button {
    background: none;
    border: none;
    color: #000;
    font-size: 24px;
    cursor: pointer;
    margin-top: 10px;
    transition: color 0.3s;
  }
  
  .close-button:hover {
    color: black;
    background: #0f3dc6;
    border: solid black;
  }
  
  .close-button:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
  
  h1 {
    margin: 0 0 20px 0;
    font-family: 'Montserrat', sans-serif;
    font-weight: 900;
    color: white;
    font-size: 24px;
  }
  
  /* Media Queries */
  @media (max-width: 450px) {
  /* .admin-modal-content {
    width: 90vw; 
    height: auto;
    padding: 15px;
    max-height: 85vh;
  } */
  
  .form-group input,
  .form-group select {
    padding: 8px;
  }
  
  h1 {
    font-size: 20px;
  }
  }
  
  @media (max-width: 300px) {
  /* .admin-modal-content {
    padding: 10px;
  } */
  
  .form-group {
    margin-bottom: 10px;
  }
  
  .save-button {
    padding: 8px 16px;
  }
  
  .close-button {
    font-size: 20px;
  }
  }
  </style>