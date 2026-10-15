// services/AlphaVantage/technologyService3.js
import { fetchYahooOverview } from './yahooOverview.js';
export const getTechnologyData3 = async () => fetchYahooOverview('MELI');
export default getTechnologyData3;