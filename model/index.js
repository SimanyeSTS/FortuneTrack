import { Users } from "./Users.js";
import { Predictions } from "./Predictions.js";
import { ForecastAffectors } from "./ForecastAffectors.js";
import { ForecastContributors } from "./ForecastContributors.js";


const users = new Users()
const predictions = new Predictions()
const forecastAffectors = new ForecastAffectors()
const forecastContributors = new ForecastContributors()


export {
    users,
    predictions,
    forecastAffectors,
    forecastContributors
}