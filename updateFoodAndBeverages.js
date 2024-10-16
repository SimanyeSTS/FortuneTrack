import FoodAndBeverages from './model/FoodAndBeverages';

(async () => {
  console.log('Updating Food And Beverages Data...');
  await FoodAndBeverages.updateFoodAndBeveragesData().catch(err => console.error('Food And Beverages update error:', err));
})();
