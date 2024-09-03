const cron = require('node-cron');
const equityService = require('./services/AlphaVantage/equityService');
const forexService = require('./services/AlphaVantage/forexService');
const cryptoService = require('./services/AlphaVantage/cryptoService');
const commodityService = require('./services/AlphaVantage/commodityService');

cron.schedule('0 0 1 * *', async () => {
  await equityService.fetchEquityData('AAPL');
  await forexService.fetchForexData('EUR/USD');
  await cryptoService.fetchCryptoData('BTC');
  await commodityService.fetchCommodityData('ALL_COMMODITIES');
})

module.exports = {
  apps: [
    {
      name: 'fortune-track',
      script: 'index.js',
      instances: 1,
      autorestart: true,
      watch: true,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'development'
      },
      env_production: {
        NODE_ENV: 'production'
      }
    }
  ]
}