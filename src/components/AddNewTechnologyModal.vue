<template>
    <div class="admin-technology-modal">
      <div class="admin-technology-modal-content">
        <h1>This will lead in an unmaintained technology prediction!</h1>
        <div class="modal-scroll-container">
          <form @submit.prevent="createTechnology">
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
                :disabled="isLoading"
              >
            </div>
            <div class="form-group">
              <label for="EBITDA">EBITDA:</label>
              <input 
                type="number" 
                id="EBITDA" 
                v-model.number="EBITDA" 
                :disabled="isLoading"
              >
            </div>
            <div class="form-group">
              <label for="PERatio">P/E Ratio:</label>
              <input 
                type="number" 
                id="PERatio" 
                v-model.number="PERatio" 
                :disabled="isLoading"
              >
            </div>
            <div class="form-group">
              <label for="PEGRatio">PEG Ratio:</label>
              <input 
                type="number" 
                id="PEGRatio" 
                v-model.number="PEGRatio" 
                :disabled="isLoading"
              >
            </div>
            <div class="form-group">
              <label for="BookValue">Book Value:</label>
              <input 
                type="number" 
                id="BookValue" 
                v-model.number="BookValue" 
                :disabled="isLoading"
              >
            </div>
            <div class="form-group">
              <label for="DividendPerShare">Dividend Per Share:</label>
              <input 
                type="number" 
                id="DividendPerShare" 
                v-model.number="DividendPerShare" 
                :disabled="isLoading"
              >
            </div>
            <div class="form-group">
              <label for="DividendYield">Dividend Yield:</label>
              <input 
                type="number" 
                id="DividendYield" 
                v-model.number="DividendYield" 
                :disabled="isLoading"
              >
            </div>
            <div class="form-group">
              <label for="EPS">EPS:</label>
              <input 
                type="number" 
                id="EPS" 
                v-model.number="EPS" 
                :disabled="isLoading"
              >
            </div>
            <div class="form-group">
              <label for="RevenuePerShareTTM">Revenue Per Share TTM:</label>
              <input 
                type="number" 
                id="RevenuePerShareTTM" 
                v-model.number="RevenuePerShareTTM" 
                :disabled="isLoading"
              >
            </div>
            <div class="form-group">
              <label for="ProfitMargin">Profit Margin:</label>
              <input 
                type="number" 
                id="ProfitMargin" 
                v-model.number="ProfitMargin" 
                :disabled="isLoading"
              >
            </div>
            <div class="form-group">
              <label for="OperatingMarginTTM">Operating Margin TTM:</label>
              <input 
                type="number" 
                id="OperatingMarginTTM" 
                v-model.number="OperatingMarginTTM" 
                :disabled="isLoading"
              >
            </div>
            <div class="form-group">
              <label for="ReturnOnAssetsTTM">Return On Assets TTM:</label>
              <input 
                type="number" 
                id="ReturnOnAssetsTTM" 
                v-model.number="ReturnOnAssetsTTM" 
                :disabled="isLoading"
              >
            </div>
            <div class="form-group">
              <label for="ReturnOnEquityTTM">Return On Equity TTM:</label>
              <input 
                type="number" 
                id="ReturnOnEquityTTM" 
                v-model.number="ReturnOnEquityTTM" 
                :disabled="isLoading"
              >
            </div>
            <div class="form-group">
              <label for="RevenueTTM">Revenue TTM:</label>
              <input 
                type="number" 
                id="RevenueTTM" 
                v-model.number="RevenueTTM" 
                :disabled="isLoading"
              >
            </div>
            <div class="form-group">
              <label for="GrossProfitTTM">Gross Profit TTM:</label>
              <input 
                type="number" 
                id="GrossProfitTTM" 
                v-model.number="GrossProfitTTM" 
                :disabled="isLoading"
              >
            </div>
            <div class="form-group">
              <label for="DilutedEPSTTM">Diluted EPS TTM:</label>
              <input 
                type="number" 
                id="DilutedEPSTTM" 
                v-model.number="DilutedEPSTTM" 
                :disabled="isLoading"
              >
            </div>
            <div class="form-group">
              <label for="QuarterlyEarningsGrowthYOY">Quarterly Earnings Growth YOY:</label>
              <input 
                type="number" 
                id="QuarterlyEarningsGrowthYOY"
                v-model.number="QuarterlyEarningsGrowthYOY" 
                :disabled="isLoading"
              >
            </div>
            <div class="form-group">
              <label for="QuarterlyRevenueGrowthYOY">Quarterly Revenue Growth YOY:</label>
              <input 
                type="number" 
                id="QuarterlyRevenueGrowthYOY" 
                v-model.number="QuarterlyRevenueGrowthYOY" 
                :disabled="isLoading"
              >
            </div>
            <div class="form-group">
              <label for="AnalystTargetPrice">Analyst Target Price:</label>
              <input 
                type="number" 
                id="AnalystTargetPrice" 
                v-model.number="AnalystTargetPrice" 
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
                :disabled="isLoading"
              >
            </div>
            <div class="form-group">
              <label for="ForwardPE">Forward P/E:</label>
              <input 
                type="number" 
                id="ForwardPE" 
                v-model.number="ForwardPE" 
                :disabled="isLoading"
              >
            </div>
            <div class="form-group">
              <label for="PriceToSalesRatioTTM">Price To Sales Ratio TTM:</label>
              <input 
                type="number" 
                id="PriceToSalesRatioTTM" 
                v-model.number="PriceToSalesRatioTTM" 
                :disabled="isLoading"
              >
            </div>
            <div class="form-group">
              <label for="PriceToBookRatio">Price To Book Ratio:</label>
              <input 
                type="number" 
                id="PriceToBookRatio" 
                v-model.number="PriceToBookRatio" 
                :disabled="isLoading"
              >
            </div>
            <div class="form-group">
              <label for="EVToRevenue">EV To Revenue:</label>
              <input 
                type="number" 
                id="EVToRevenue" 
                v-model.number="EVToRevenue" 
                :disabled="isLoading"
              >
            </div>
            <div class="form-group">
              <label for="EVToEBITDA">EV To EBITDA:</label>
              <input 
                type="number" 
                id="EVToEBITDA" 
                v-model.number="EVToEBITDA" 
                :disabled="isLoading"
              >
            </div>
            <div class="form-group">
              <label for="Beta">Beta:</label>
              <input 
                type="number" 
                id="Beta" 
                v-model.number="Beta" 
                :disabled="isLoading"
              >
            </div>
            <div class="form-group">
              <label for="Week52High">Week 52 High:</label>
              <input 
                type="number" 
                id="Week52High" 
                v-model.number="Week52High" 
                :disabled="isLoading"
              >
            </div>
            <div class="form-group">
              <label for="Week52Low">Week 52 Low:</label>
              <input 
                type="number" 
                id="Week52Low" 
                v-model.number="Week52Low" 
                :disabled="isLoading"
              >
            </div>
            <div class="form-group">
              <label for="Day50MovingAverage">50-Day Moving Average:</label>
              <input 
                type="number" 
                id="Day50MovingAverage" 
                v-model.number="Day50MovingAverage" 
                :disabled="isLoading"
              >
            </div>
            <div class="form-group">
              <label for="Day200MovingAverage">200-Day Moving Average:</label>
              <input 
                type="number" 
                id="Day200MovingAverage" 
                v-model.number="Day200MovingAverage" 
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
                {{ isLoading ? 'Adding...' : 'Add' }}
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
import { mapState } from 'vuex';

export default {
  props: {
    showAddNewTechnologyModal: Boolean,
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
  computed: {
    ...mapState(['isLoading']),
    isFormValid() {
      return (
        this.Symbol &&
        this.AssetType &&
        this.Name &&
        (!this.Description || this.Description.length <= 500) && // Optional, max length
        (!this.CIK || this.CIK.length <= 20) && // Optional, max length
        (!this.Exchange || this.Exchange.length <= 10) && // Optional, max length
        (!this.Currency || this.Currency.length === 3) && // Optional, must be 3 characters
        (!this.Country || this.Country.length <= 10) && // Optional, max length
        (!this.Sector || this.Sector.length <= 20) && // Optional, max length
        (!this.Industry || this.Industry.length <= 50) && // Optional, max length
        (!this.Address || this.Address.length <= 100) && // Optional, max length
        (!this.OfficialSite || this.OfficialSite.length <= 100) && // Optional, max length
        (!this.FiscalYearEnd || this.FiscalYearEnd.length <= 10) && // Optional, max length
        (!this.LatestQuarter || this.LatestQuarter.length <= 10) && // Optional, max length
        (this.MarketCapitalization >= 0 || this.MarketCapitalization === null) && // Optional, must be non-negative
        (this.EBITDA >= 0 || this.EBITDA === null) && // Optional, must be non-negative
        (this.PERatio >= 0 || this.PERatio === null) && // Optional, must be non-negative
        (this.PEGRatio >= 0 || this.PEGRatio === null) && // Optional, must be non-negative
        (this.BookValue >= 0 || this.BookValue === null) && // Optional, must be non-negative
        (this.DividendPerShare >= 0 || this.DividendPerShare === null) && // Optional, must be non-negative
        (this.DividendYield >= 0 || this.DividendYield === null) && // Optional, must be non-negative
        (this.EPS >= 0 || this.EPS === null) && // Optional, must be non-negative
        (this.RevenuePerShareTTM >= 0 || this.RevenuePerShareTTM === null) && // Optional, must be non-negative
        (this.ProfitMargin >= 0 || this.ProfitMargin === null) && // Optional, must be non-negative
        (this.OperatingMarginTTM >= 0 || this.OperatingMarginTTM === null) && // Optional, must be non-negative
        (this.ReturnOnAssetsTTM >= 0 || this.ReturnOnAssetsTTM === null) && // Optional, must be non-negative
        (this.ReturnOnEquityTTM >= 0 || this.ReturnOnEquityTTM === null) && // Optional, must be non-negative
        (this.RevenueTTM >= 0 || this.RevenueTTM === null) && // Optional, must be non-negative
        (this.GrossProfitTTM >= 0 || this.GrossProfitTTM === null) && // Optional, must be non-negative
        (this.DilutedEPSTTM >= 0 || this.DilutedEPSTTM === null) && // Optional, must be non-negative
        (this.QuarterlyEarningsGrowthYOY >= 0 || this.QuarterlyEarningsGrowthYOY === null) && // Optional, must be non-negative
        (this.QuarterlyRevenueGrowthYOY >= 0 || this.QuarterlyRevenueGrowthYOY === null) && // Optional, must be non-negative
        (this.AnalystTargetPrice >= 0 || this.AnalystTargetPrice === null) && // Optional, must be non-negative
        (this.AnalystRatingStrongBuy >= 0 || this.AnalystRatingStrongBuy === null) && // Optional, must be non-negative
        (this.AnalystRatingBuy >= 0 || this.AnalystRatingBuy === null) && // Optional, must be non-negative
        (this.AnalystRatingHold >= 0 || this.AnalystRatingHold === null) && // Optional, must be non-negative
        (this.AnalystRatingSell >= 0 || this.AnalystRatingSell === null) && // Optional, must be non-negative
        (this.AnalystRatingStrongSell >= 0 || this.AnalystRatingStrongSell === null) && // Optional, must be non-negative
        (this.TrailingPE >= 0 || this.TrailingPE === null) && // Optional, must be non-negative
        (this.ForwardPE >= 0 || this.ForwardPE === null) && // Optional, must be non-negative
        (this.PriceToSalesRatioTTM >= 0 || this.PriceToSalesRatioTTM === null) && // Optional, must be non-negative
        (this.PriceToBookRatio >= 0 || this.PriceToBookRatio === null) && // Optional, must be non-negative
        (this.EVToRevenue >= 0 || this.EVToRevenue === null) && // Optional, must be non-negative
        (this.EVToEBITDA >= 0 || this.EVToEBITDA === null) && // Optional, must be non-negative
        (this.Beta >= 0 || this.Beta === null) && // Optional, must be non-negative
        (this.Week52High >= 0 || this.Week52High === null) && // Optional, must be non-negative
        (this.Week52Low >= 0 || this.Week52Low === null) && // Optional, must be non-negative
        (this.Day50MovingAverage >= 0 || this.Day50MovingAverage === null) && // Optional, must be non-negative
        (this.Day200MovingAverage >= 0 || this.Day200MovingAverage === null) && // Optional, must be non-negative
        (this.SharesOutstanding >= 0 || this.SharesOutstanding === null) && // Optional, must be non-negative
        (!this.DividendDate || this.isValidDate(this.DividendDate)) && // Optional, must be a valid date
        (!this.ExDividendDate || this.isValidDate(this.ExDividendDate)) // Optional, must be a valid date
      );
    }
  },
  methods: {
    async createTechnology() {
      if (!this.isFormValid) {
        return;
      }

      try {
        const technologyData = {
          Symbol: this.Symbol.trim(),
          AssetType: this.AssetType.trim(),
          Name: this.Name.trim(),
          Description: this.Description.trim(),
          CIK: this.CIK.trim(),
          Exchange: this.Exchange.trim(),
          Currency: this.Currency.trim(),
          Country: this.Country.trim(),
          Sector: this.Sector.trim(),
          Industry: this.Industry.trim(),
          Address: this.Address.trim(),
          OfficialSite: this.OfficialSite.trim(),
          FiscalYearEnd: this.FiscalYearEnd.trim(),
          LatestQuarter: this.LatestQuarter.trim(),
          MarketCapitalization: this.MarketCapitalization,
          EBITDA: this.EBITDA,
          PERatio: this.PERatio,
          PEGRatio: this.PEGRatio,
          BookValue: this.BookValue,
          DividendPerShare: this.DividendPerShare,
          DividendYield: this.DividendYield,
          EPS: this.EPS,
          RevenuePerShareTTM: this.RevenuePerShareTTM,
          ProfitMargin: this.ProfitMargin,
          OperatingMarginTTM: this.OperatingMarginTTM,
          ReturnOnAssetsTTM: this.ReturnOnAssetsTTM,
          ReturnOnEquityTTM: this.ReturnOnEquityTTM,
          RevenueTTM: this.RevenueTTM,
          GrossProfitTTM: this.GrossProfitTTM,
          DilutedEPSTTM: this.DilutedEPSTTM,
          QuarterlyEarningsGrowthYOY: this.QuarterlyEarningsGrowthYOY,
          QuarterlyRevenueGrowthYOY: this.QuarterlyRevenueGrowthYOY,
          AnalystTargetPrice: this.AnalystTargetPrice,
          AnalystRatingStrongBuy: this.AnalystRatingStrongBuy,
          AnalystRatingBuy: this.AnalystRatingBuy,
          AnalystRatingHold: this.AnalystRatingHold,
          AnalystRatingSell: this.AnalystRatingSell,
          AnalystRatingStrongSell: this.AnalystRatingStrongSell,
          TrailingPE: this.TrailingPE,
          ForwardPE: this.ForwardPE,
          PriceToSalesRatioTTM: this.PriceToSalesRatioTTM,
          PriceToBookRatio: this.PriceToBookRatio,
          EVToRevenue: this.EVToRevenue,
          EVToEBITDA: this.EVToEBITDA,
          Beta: this.Beta,
          Week52High: this.Week52High,
          Week52Low: this.Week52Low,
          Day50MovingAverage: this.Day50MovingAverage,
          Day200MovingAverage: this.Day200MovingAverage,
          SharesOutstanding: this.SharesOutstanding,
          DividendDate: this.DividendDate,
          ExDividendDate: this.ExDividendDate
        };

        await this.$store.dispatch('createTechnology', technologyData);
        
        // Reset form
        this.resetForm();
        
        this.$emit('close'); // Close the modal after submission
      } catch (error) {
        console.error('Error adding retail prediction:', error);
      }
    },
    resetForm() {
      this.Symbol = '';
      this.AssetType = '';
      this.Name = '';
      this.Description = '';
      this.CIK = '';
      this.Exchange = '';
      this.Currency = '';
      this.Country = '';
      this.Sector = '';
      this.Industry = '';
      this.Address = '';
      this.OfficialSite = '';
      this.FiscalYearEnd = '';
      this.LatestQuarter = '';
      this.MarketCapitalization = null;
      this.EBITDA = null;
      this.PERatio = null;
      this.PEGRatio = null;
      this.BookValue = null;
      this.DividendPerShare = null;
      this.DividendYield = null;
      this.EPS = null;
      this.RevenuePerShareTTM = null;
      this.ProfitMargin = null;
      this.OperatingMarginTTM = null;
      this.ReturnOnAssetsTTM = null;
      this.ReturnOnEquityTTM = null;
      this.RevenueTTM = null;
      this.GrossProfitTTM = null;
      this.DilutedEPSTTM = null;
      this.QuarterlyEarningsGrowthYOY = null;
      this.QuarterlyRevenueGrowthYOY = null;
      this.AnalystTargetPrice = null;
      this.AnalystRatingStrongBuy = null;
      this.AnalystRatingBuy = null;
      this.AnalystRatingHold = null;
      this.AnalystRatingSell = null;
      this.AnalystRatingStrongSell = null;
      this.TrailingPE = null;
      this.ForwardPE = null;
      this.PriceToSalesRatioTTM = null;
      this.PriceToBookRatio = null;
      this.EVToRevenue = null;
      this.EVToEBITDA = null;
      this.Beta = null;
      this.Week52High = null;
      this.Week52Low = null;
      this.Day50MovingAverage = null;
      this.Day200MovingAverage = null;
      this.SharesOutstanding = null;
      this.DividendDate = '';
      this.ExDividendDate = '';
    }
  }
}
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
  .admin-modal-content {
    width: 90vw; 
    height: auto;
    padding: 15px;
    max-height: 85vh;
  }

  .form-group input,
  .form-group select {
    padding: 8px;
  }

  h1 {
    font-size: 20px;
  }
}

@media (max-width: 300px) {
  .admin-modal-content {
    padding: 10px;
  }

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