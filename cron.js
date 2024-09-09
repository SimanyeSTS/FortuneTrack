import cron from 'node-cron';
import Retail from './model/Retail.js';
import Technology from './model/Technology.js';
import FoodAndBeverages from './model/FoodAndBeverages.js';
import Healthcare from './model/Healthcare.js';

cron.schedule('0 */2 * * *', Retail.updateRetailData)
cron.schedule('0 */2 * * *', Technology.updateTechnologyData)
cron.schedule('0 */2 * * *', FoodAndBeverages.updateFoodAndBeveragesData)
cron.schedule('0 */2 * * *', Healthcare.updateHealthcareData)