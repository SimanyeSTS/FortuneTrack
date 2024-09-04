import { Users } from "./Users.js";
import { Prediction } from "./Predictions.js";
import { ForecastAffector } from "./ForecastAffectors.js";
import { ForecastContributor } from "./ForecastContributors.js";
import express from 'express';
import retailController from '../controller/retailController.js';
import technologyController from '../controller/technologyController.js';
import foodAndBeveragesController from '../controller/foodAndBeverages.js';
import healthcareController from '../controller/healthcareController.js';

const router = express.Router();
router.get('/retail', retailController.getRetailData);
router.get('/technology', technologyController.getTechnologyData);
router.get('/food-and-beverages', foodAndBeveragesController.getFoodAndBeveragesData);
router.get('/healthcare', healthcareController.getHealthcareData);


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

