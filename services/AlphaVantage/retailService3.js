// services/AlphaVantage/retailService3.js
import { fetchYahooOverview } from './yahooOverview.js';
export const getRetailData3 = async () => fetchYahooOverview('UL');
export default getRetailData3;