// services/AlphaVantage/foodAndBeverages3.js
import { fetchYahooOverview } from './yahooOverview.js';
export const getFoodAndBeveragesData3 = async () => fetchYahooOverview('DEO');
export default getFoodAndBeveragesData3;