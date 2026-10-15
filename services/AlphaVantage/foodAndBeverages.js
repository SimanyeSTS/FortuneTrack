// services/AlphaVantage/foodAndBeverages.js
import { fetchYahooOverview } from './yahooOverview.js';
export const getFoodAndBeveragesData = async () => fetchYahooOverview('MCD');
export default getFoodAndBeveragesData;