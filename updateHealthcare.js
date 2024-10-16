import Healthcare from './model/Healthcare.js';
import dotenv from 'dotenv'

dotenv.config();

(async () => {
  console.log('Starting Healthcare Data Update Process...')

  const startTime = Date.now()
  
  try {
    await Healthcare.updateHealthcareData()

    const timeTaken = ((Date.now() - startTime) / 1000).toFixed(2)
    console.log(`✅ Healthcare Data updated successfully in ${timeTaken} seconds.`)

  } catch (err) {
    if (err.response) {
        console.error(`API Error: ${err.response.status} - ${err.response.statusText}`)
        console.error(`Details: ${err.response.data}`)
    } else if (err.request) {
        console.error(`Network Error: No response received from API`)
    } else {
        console.error(`Unknown error occured: ${err.message}`)
    }

    process.exit(1)

  } finally {
    console.log(`Healthcare Data update process finished.`)
  }
})()