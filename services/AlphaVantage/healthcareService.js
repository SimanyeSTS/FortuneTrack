// services/AlphaVantage/healthcareService.js
import { fetchYahooOverview } from './yahooOverview.js';
export const getHealthcareData = async () => fetchYahooOverview('JNJ');
export default getHealthcareData;