import { Users } from "./Users.js";
import { Prediction } from "./Predictions.js";
import { ForecastAffector } from "./ForecastAffectors.js";
import { ForecastContributor } from "./ForecastContributors.js";


const users = new Users()
const prediction = new Prediction()
const forecastAffector = new ForecastAffector()
const forecastContributor = new ForecastContributor()


export {
    users,
    prediction,
    forecastAffector,
    forecastContributor
}