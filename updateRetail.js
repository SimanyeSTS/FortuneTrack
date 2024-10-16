import Retail from './model/Retail.js';

(async () => {
  console.log('Updating Retail Data...');
  await Retail.updateRetailData().catch(err => console.error('Retail update error:', err));
})();
