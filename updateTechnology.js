import Technology from './model/Technology.js';

(async () => {
  console.log('Updating Technology Data...');
  await Technology.updateTechnologyData().catch(err => console.error('Technology update error:', err));
})();
