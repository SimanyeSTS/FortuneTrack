import { Users } from "./Users.js";
import { Prediction } from "./Predictions.js";
import { ForecastAffector } from "./ForecastAffectors.js";
import { ForecastContributor } from "./ForecastContributors.js";
import express from 'express';
import retailController from '../controller/retailController.js';
import technologyController from '../controller/technologyController.js';
import foodAndBeveragesController from '../controller/foodAndBeveragesController.js';
import healthcareController from '../controller/healthcareController.js';
import { allSectorsRouter } from "../controller/allSectorsController.js";

const router = express.Router()

// Retail routes
router.get('/retail', retailController.getRetailData) // fetching from API only
router.get('/retail/:id', retailController.getRetailDataById)
router.get('/retail-data', retailController.getAllRetailData)
router.patch('/retail/:id', retailController.patchRetailData)
router.delete('/retail/:id', retailController.deleteRetailData)
router.post('/retail-data', retailController.addRetailData)
router.get('/retail/:Symbol', retailController.getRetailDataBySymbol)

// Technology routes
router.get('/technology', technologyController.getTechnologyData) // fetching from API only
router.get('/technology/:id', technologyController.getTechnologyDataById)
router.get('/technology-data', technologyController.getAllTechnologyData)
router.patch('/technology/:id', technologyController.patchTechnologyData)
router.delete('/technology/:id', technologyController.deleteTechnologyData)
router.post('/technology-data', technologyController.addTechnologyData)

// Food and Beverages routes
router.get('/food-and-beverages', foodAndBeveragesController.getFoodAndBeveragesData) // fetching from API only
router.get('/food-and-beverages/:id', foodAndBeveragesController.getFoodAndBeveragesDataById)
router.get('/food-and-beverages-data', foodAndBeveragesController.getAllFoodAndBeveragesData)
router.patch('/food-and-beverages/:id', foodAndBeveragesController.patchFoodAndBeveragesData)
router.delete('/food-and-beverages/:id', foodAndBeveragesController.deleteFoodAndBeveragesData)
router.post('/food-and-beverages-data', foodAndBeveragesController.addFoodAndBeveragesData)

// Healthcare routes
router.get('/healthcare', healthcareController.getHealthcareData) // fetching from API only
router.get('/healthcare/:id', healthcareController.getHealthcareDataById)
router.get('/healthcare-data', healthcareController.getAllHealthcareData)
router.patch('/healthcare/:id', healthcareController.patchHealthcareData)
router.delete('/healthcare/:id', healthcareController.deleteHealthcareData)
router.post('/healthcare-data', healthcareController.addHealthcareData)

const users = new Users()
const prediction = new Prediction()
const forecastAffector = new ForecastAffector()
const forecastContributor = new ForecastContributor()

export { 
  users, 
  prediction, 
  forecastAffector, 
  forecastContributor, 
  router,
  allSectorsRouter
}
