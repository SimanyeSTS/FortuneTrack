import cron from 'node-cron';
import equityService from './service/alphaVantage/equityService';
import forexService from './service/alphaVantage/forexService';
import cryptoService from './service/alphaVantage/cryptoService';
import commodityService from './service/alphaVantage/commodityService';

cron.schedule('0 0 1 * *', async () => {
  try {
    await equityService.fetchEquityData('AAPL')
    await forexService.fetchForexData('EUR/USD')
    await cryptoService.fetchCryptoData('BTC')
    await commodityService.fetchCommodityData('ALL_COMMODITIES')
    console.log('Cron job executed successfully')
  } catch (error) {
    console.error('Error executing cron job:', error.message)
  }
})

export {
    cron
}