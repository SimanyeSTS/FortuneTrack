import { connection as db } from "../config/index.js";
import axios from "axios";
import cron from "node-cron";

const apikey = "K9HED7RC8QLPJTT0";
const apikey2 = "W7VKF4FSAGSTIUY2";
const apikey3 = "I7FZD4K4SRHYLEL8";
const baseUrl = "https://www.alphavantage.co/query";

const safeParseFloat = (value) => {
  if (!value || value === "None" || value === "-") return null;
  const cleanValue = String(value).replace(/[$,]/g, "");
  const parsed = parseFloat(cleanValue);
  return isNaN(parsed) ? null : parsed;
};

const safeParseInt = (value) => {
  if (!value || value === "None" || value === "-") return null;
  const parsed = parseInt(value, 10);
  return isNaN(parsed) ? null : parsed;
};

const transformApiData = (data) => ({
  Symbol: data.Symbol,
  AssetType: data.AssetType || null,
  Name: data.Name || null,
  Description: data.Description || null,
  CIK: data.CIK || null,
  Exchange: data.Exchange || null,
  Currency: data.Currency || null,
  Country: data.Country || null,
  Sector: data.Sector || null,
  Industry: data.Industry || null,
  Address: data.Address || null,
  OfficialSite: data.OfficialSite || null,
  FiscalYearEnd: data.FiscalYearEnd || null,
  LatestQuarter: data.LatestQuarter || null,
  MarketCapitalization: safeParseFloat(data.MarketCapitalization),
  EBITDA: safeParseFloat(data.EBITDA),
  PERatio: safeParseFloat(data.PERatio),
  PEGRatio: safeParseFloat(data.PEGRatio),
  BookValue: safeParseFloat(data.BookValue),
  DividendPerShare: safeParseFloat(data.DividendPerShare),
  DividendYield: safeParseFloat(data.DividendYield),
  EPS: safeParseFloat(data.EPS),
  RevenuePerShareTTM: safeParseFloat(data.RevenuePerShareTTM),
  ProfitMargin: safeParseFloat(data.ProfitMargin),
  OperatingMarginTTM: safeParseFloat(data.OperatingMarginTTM),
  ReturnOnAssetsTTM: safeParseFloat(data.ReturnOnAssetsTTM),
  ReturnOnEquityTTM: safeParseFloat(data.ReturnOnEquityTTM),
  RevenueTTM: safeParseFloat(data.RevenueTTM),
  GrossProfitTTM: safeParseFloat(data.GrossProfitTTM),
  DilutedEPSTTM: safeParseFloat(data.DilutedEPSTTM),
  QuarterlyEarningsGrowthYOY: safeParseFloat(data.QuarterlyEarningsGrowthYOY),
  QuarterlyRevenueGrowthYOY: safeParseFloat(data.QuarterlyRevenueGrowthYOY),
  AnalystTargetPrice: safeParseFloat(data.AnalystTargetPrice),
  AnalystRatingStrongBuy: safeParseInt(data.AnalystRatingStrongBuy),
  AnalystRatingBuy: safeParseInt(data.AnalystRatingBuy),
  AnalystRatingHold: safeParseInt(data.AnalystRatingHold),
  AnalystRatingSell: safeParseInt(data.AnalystRatingSell),
  AnalystRatingStrongSell: safeParseInt(data.AnalystRatingStrongSell),
  TrailingPE: safeParseFloat(data.TrailingPE),
  ForwardPE: safeParseFloat(data.ForwardPE),
  PriceToSalesRatioTTM: safeParseFloat(data.PriceToSalesRatioTTM),
  PriceToBookRatio: safeParseFloat(data.PriceToBookRatio),
  EVToRevenue: safeParseFloat(data.EVToRevenue),
  EVToEBITDA: safeParseFloat(data.EVToEBITDA),
  Beta: safeParseFloat(data.Beta),
  Week52High: safeParseFloat(data["52WeekHigh"]),
  Week52Low: safeParseFloat(data["52WeekLow"]),
  Day50MovingAverage: safeParseFloat(data["50DayMovingAverage"]),
  Day200MovingAverage: safeParseFloat(data["200DayMovingAverage"]),
  SharesOutstanding: safeParseInt(data.SharesOutstanding),
  DividendDate: data.DividendDate || null,
  ExDividendDate: data.ExDividendDate || null,
});

class FoodAndBeverages {
  static async getFoodAndBeveragesData() {
    try {
      const query = `SELECT * FROM FoodAndBeverages`;
      const [rows] = await db.query(query);
      return rows;
    } catch (error) {
      throw new Error(`Failed to retrieve Food and Beverages data: ${error.message}`);
    }
  }

  static async saveFoodAndBeveragesData(data) {
    try {
      if (!data) throw new Error("Data cannot be null or undefined");

      const columns = Object.keys(data);
      const values = Object.values(data);
      const placeholders = Array(columns.length).fill("?").join(", ");

      const query = `INSERT INTO FoodAndBeverages (${columns}) VALUES (${placeholders})`;
      await db.execute(query, values);
    } catch (error) {
      throw new Error(`Failed to save Food and Beverages data: ${error.message}`);
    }
  }

  static async patchFoodAndBeveragesData(id, data) {
    try {
      if (!data) throw new Error("Data cannot be null or undefined");

      const columns = Object.keys(data);
      const values = Object.values(data);
      values.push(id);

      const placeholders = columns.map((col) => `${col} = ?`).join(", ");

      const query = `UPDATE FoodAndBeverages SET ${placeholders} WHERE id = ?`;
      await db.execute(query, values);
    } catch (error) {
      throw new Error(`Failed to patch Food and Beverages data: ${error.message}`);
    }
  }

  static async fetchAndUpdateData(id, symbol, apikey) {
    try {
      const url = `${baseUrl}?function=OVERVIEW&symbol=${symbol}&apikey=${apikey}`;
      const response = await axios.get(url);
      const rawData = response.data;

      if (!rawData || typeof rawData !== "object") {
        throw new Error("Invalid API response format");
      }

      if (rawData.Note || rawData.Information) {
        throw new Error(rawData.Note || rawData.Information);
      }

      const transformedData = transformApiData(rawData);
      await FoodAndBeverages.patchFoodAndBeveragesData(id, transformedData);
    } catch (error) {
      throw new Error(`Failed to fetch and update data for ${symbol}: ${error.message}`);
    }
  }

  static async updateFoodAndBeveragesData() {
    await this.fetchAndUpdateData(1, "MCD", apikey);
  }

  static async updateFoodAndBeveragesData2() {
    await this.fetchAndUpdateData(2, "ABEV", apikey2);
  }

  static async updateFoodAndBeveragesData3() {
    await this.fetchAndUpdateData(3, "DEO", apikey3);
  }
}

cron.schedule("0 */2 * * *", FoodAndBeverages.updateFoodAndBeveragesData);
cron.schedule("0 */2 * * *", FoodAndBeverages.updateFoodAndBeveragesData2);
cron.schedule("0 */2 * * *", FoodAndBeverages.updateFoodAndBeveragesData3);

export default FoodAndBeverages;