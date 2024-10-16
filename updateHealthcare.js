import Healthcare from './model/Healthcare.js';

(async () => {
  console.log('Updating Healthcare Data...');
  await Healthcare.updateHealthcareData().catch(err => console.error('Healthcare update error:', err));
})();
