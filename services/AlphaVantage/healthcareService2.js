// services/AlphaVantage/healthcareService2.js
import { fetchYahooOverview } from './yahooOverview.js';
export const getHealthcareData2 = async () => fetchYahooOverview('NVS');
export default getHealthcareData2;