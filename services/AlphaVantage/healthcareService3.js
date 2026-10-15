// services/AlphaVantage/healthcareService3.js
import { fetchYahooOverview } from './yahooOverview.js';
export const getHealthcareData3 = async () => fetchYahooOverview('AZN');
export default getHealthcareData3;