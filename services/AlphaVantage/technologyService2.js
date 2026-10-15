// services/AlphaVantage/technologyService2.js
import { fetchYahooOverview } from './yahooOverview.js';
export const getTechnologyData2 = async () => fetchYahooOverview('ASML');
export default getTechnologyData2;