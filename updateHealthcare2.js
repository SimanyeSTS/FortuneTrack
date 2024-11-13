import Healthcare from './model/Healthcare.js';
import dotenv from 'dotenv'

dotenv.config();

(async () => {
  console.log('Starting Healthcare Data-2 Update Process...')

  const startTime = Date.now()
  
  try {
    await Healthcare.updateHealthcareData2()

    const timeTaken = ((Date.now() - startTime) / 1000).toFixed(2)
    console.log(`✅ Healthcare Data-2 updated successfully in ${timeTaken} seconds.`)

    process.exit(0)

  } catch (err) {
    console.error('❌ An error occured during the Healthcare Data-2 Update Process.')

    if (err.response) {
        console.error(`API Error: ${err.response.status} - ${err.response.statusText}`)
        console.error(`Details: ${JSON.stringify(err.response.data)}`)
    } else if (err.request) {
        console.error(`Network Error: No response received from API`)
        console.error(err.request)
    } else {
        console.error(`Unknown error occured: ${err.message}`)
        console.error(err.stack)
    }

    process.exit(1)

  } finally {
    console.log(`Healthcare Data-2 update process finished.`)
  }
})()