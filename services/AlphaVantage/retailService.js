// services/AlphaVantage/retailService.js
import { fetchYahooOverview } from './yahooOverview.js';
export const getRetailData = async () => fetchYahooOverview('COST');
export default getRetailData;