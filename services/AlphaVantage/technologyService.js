// services/AlphaVantage/technologyService.js
import { fetchYahooOverview } from './yahooOverview.js';
export const getTechnologyData = async () => fetchYahooOverview('INTC');
export default getTechnologyData;