import Retail from './model/Retail.js';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables if needed

(async () => {
  console.log('Starting Retail Data Update Process...');

  // Record the start time
  const startTime = Date.now();

  try {
    // Call update function
    await Retail.updateRetailData();
    
    // Log success with time taken
    const timeTaken = ((Date.now() - startTime) / 1000).toFixed(2); // Time in seconds
    console.log(`✅ Retail Data updated successfully in ${timeTaken} seconds.`);

  } catch (err) {
    // More specific error handling
    if (err.response) {
      // API responded with an error (e.g., 404, 500)
      console.error(`API Error: ${err.response.status} - ${err.response.statusText}`);
      console.error(`Details: ${err.response.data}`);
    } else if (err.request) {
      // Request was made but no response received
      console.error('Network Error: No response received from API');
    } else {
      // Something else went wrong during the update
      console.error(`Unknown error occurred: ${err.message}`);
    }

    // Optional: Exit with failure code if needed
    process.exit(1); // Non-zero exit code indicates failure in GitHub Actions

  } finally {
    // Always log when the process is finished
    console.log('Retail Data update process finished.');
  }
})();
