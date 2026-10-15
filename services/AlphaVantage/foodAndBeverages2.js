// services/AlphaVantage/foodAndBeverages2.js
import { fetchYahooOverview } from './yahooOverview.js';
export const getFoodAndBeveragesData2 = async () => fetchYahooOverview('ABEV');
export default getFoodAndBeveragesData2;