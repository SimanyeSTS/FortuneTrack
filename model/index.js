import { Users } from "./Users.js";
import { Prediction } from "./Predictions.js";
import { ForecastAffector } from "./ForecastAffectors.js";
import { ForecastContributor } from "./ForecastContributors.js";
import express from 'express';
import retailController from '../controller/retailController.js';
import technologyController from '../controller/technologyController.js';
import foodAndBeveragesController from '../controller/foodAndBeveragesController.js';
import healthcareController from '../controller/healthcareController.js';

const router = express.Router();
router.get('/retail', retailController.getRetailData)
router.get('/retail/:id', retailController.getRetailDataById)
router.patch('/retail/:id', retailController.patchRetailData)
router.delete('/retail/:id', retailController.deleteRetailData)

router.get('/technology', technologyController.getTechnologyData)
router.get('/technology/:id', retailController.getRetailDataById)
router.patch('/technology/:id', technologyController.patchTechnologyData)
router.delete('/technology/:id', technologyController.deleteTechnologyData)

router.get('/food-and-beverages', foodAndBeveragesController.getFoodAndBeveragesData)
router.get('/food-and-beverages/:id', retailController.getRetailDataById)
router.patch('/food-and-beverages/:id', foodAndBeveragesController.patchFoodAndBeveragesData)
router.delete('/food-and-beverages/:id', foodAndBeveragesController.deleteFoodAndBeveragesData)

router.get('/healthcare', healthcareController.getHealthcareData)
router.get('/healthcare/:id', retailController.getRetailDataById)
router.patch('/healthcare/:id', healthcareController.patchHealthcareData)
router.delete('/healthcare/:id', healthcareController.deleteHealthcareData)

const users = new Users()
const prediction = new Prediction()
const forecastAffector = new ForecastAffector()
const forecastContributor = new ForecastContributor()


export { 
  users, 
  prediction, 
  forecastAffector, 
  forecastContributor, 
  router 
}