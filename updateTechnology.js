import Technology from './model/Technology.js';
import dotenv from 'dotenv';

dotenv.config();

(async () => {
  console.log('Starting Technology Data Update Process...');

  const startTime = Date.now();

  try {
    await Technology.updateTechnologyData();

    const timeTaken = ((Date.now() - startTime) / 1000).toFixed(2);
    console.log(`✅ Technology Data updated successfully in ${timeTaken} seconds.`);

  } catch (err) {
    console.error('❌ An error occurred during the Technology Data Update Process.');

    if (err.response) {
      console.error(`API Error: ${err.response.status} - ${err.response.statusText}`);
      console.error(`Details: ${JSON.stringify(err.response.data)}`);
    } else if (err.request) {
      console.error('Network Error: No response received from API');
      console.error(err.request);
    } else {
      console.error(`Unknown error occurred: ${err.message}`);
      console.error(err.stack);
    }

    process.exit(1);

  } finally {
    console.log('Technology Data update process finished.');
  }
})();