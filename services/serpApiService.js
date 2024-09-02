import axios from 'axios';
import moment from 'moment';

const API_KEY = '7aa255c98aabc6fa55c8fa11551cb563c8658ed4597f36fa76a02c52f88f164c'
const BASE_URL = 'https://serpapi.com/search'

const categoryKeywords = {
  'Retail': ['Headboard', 'Adidas'],
  'Technology': ['iPhone', 'AWS'],
  'Food & Beverages': ['Coca-Cola', 'McDonalds'],
  'Healthcare': ['Pfizer', 'Clicks']
}

const subcategories = {
  'Headboard': 'Furniture',
  'Adidas': 'Fashion',
  'iPhone': 'Gadgets',
  'AWS': 'Cloud Services',
  'Coca-Cola': 'Soft Drinks',
  'McDonalds': 'Fast Food',
  'Pfizer': 'Pharmaceuticals',
  'Clicks': 'Health Stores'
}

function getDateRangeForPastThreeYears() {
  const today = moment()
  const threeYearsAgo = today.clone().subtract(3, 'years')
  return {
    startDate: threeYearsAgo.format('YYYY-MM-DD'),
    endDate: today.format('YYYY-MM-DD')
  }
}

export async function fetchGoogleTrendsData(category) {
  const keywords = categoryKeywords[category]

  if (!keywords) {
    throw new Error(`No keywords defined for category: ${category}`)
  }

  const results = await Promise.all(keywords.map(async keyword => {
    const { startDate, endDate } = getDateRangeForPastThreeYears()
    const query = keyword
    try {
      const response = await axios.get(BASE_URL, {
        params: {
          api_key: API_KEY,
          engine: 'google_trends',
          q: query,
          geo: 'ZA',
          hl: 'en',
          data_type: 'TIMESERIES',
          date: `${startDate} ${endDate}`,
          tz: 120,
          cat: 0
        }
      })

      const { interest_over_time: { timeline_data: timelineData } = {} } = response.data

      if (!Array.isArray(timelineData)) {
        throw new Error('Timeline data is not available or not an array')
      }

      const allValues = timelineData.flatMap(item => {
        if (item.value) {
          return item.value.map(v => parseFloat(v)).filter(v => !isNaN(v))
        } else {
          return []
        }
      })

      const lowestRecord = Math.min(...allValues)
      const highestRecord = Math.max(...allValues)
      const averageRecord = allValues.reduce((acc, value) => acc + value, 0) / allValues.length

      const status = averageRecord > 50 ? 'Bullish' : 'Bearish'

      return {
        keyword,
        subcategory: subcategories[keyword],
        lowestRecord,
        averageRecord,
        highestRecord,
        status
      }

    } catch (error) {
      console.error(`Error fetching Google Trends data for ${keyword}: ${error.message}`);
      throw error;
    }
  }))

  const combinedResults = results.reduce((acc, result) => {
    acc.lowestRecord = Math.min(acc.lowestRecord, result.lowestRecord)
    acc.highestRecord = Math.max(acc.highestRecord, result.highestRecord)
    acc.averageRecord += result.averageRecord
    return acc
  }, {
    lowestRecord: Infinity,
    highestRecord: -Infinity,
    averageRecord: 0
  })

  combinedResults.averageRecord /= results.length

  return {
    category,
    results,
    combinedResults
  }
}