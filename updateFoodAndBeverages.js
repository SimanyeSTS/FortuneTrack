import FoodAndBeverages from './model/FoodAndBeverages.js';
import dotenv from 'dotenv'

dotenv.config();

(async () => {
  console.log('Starting Food And Beverages Data Update Process...')

  const startTime = Date.now()

  try {
    await FoodAndBeverages.updateFoodAndBeveragesData()

    const timeTaken = ((Date.now() - startTime) / 1000).toFixed(2)
    console.log(`✅ Food And Beverages Data updated successfully in ${timeTaken} seconds.`)

    process.exit(0)

  } catch (err) {
    console.error('❌ An error occured during the Food And Beverages Data Update Process.')
    
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
    console.log(`Food And Beverages Data update process finished.`)
  }
})()