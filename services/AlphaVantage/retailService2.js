// services/AlphaVantage/retailService2.js
import { fetchYahooOverview } from './yahooOverview.js';
export const getRetailData2 = async () => fetchYahooOverview('BABA');
export default getRetailData2;