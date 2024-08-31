import axios from 'axios';

const API_KEY = '7aa255c98aabc6fa55c8fa11551cb563c8658ed4597f36fa76a02c52f88f164c'; // Replace with your actual API key
const BASE_URL = 'https://serpapi.com/search'; // SerpAPI endpoint for Google Trends

// Define keywords for various categories
const categoryKeywords = {
    'Retail': ['Headboard', 'H&M'],
    'Furniture': ['Headboard'],
    'Fashion': ['H&M'],
    'Technology': ['iPhone', 'AWS'],
    'Cloud Services': ['AWS'],
    'Gadgets': ['iPhone'],
    'Food & Beverages': ['Coca-Cola', 'McDonalds'],
    'Soft Drinks': ['Coca-Cola'],
    'Fast Food': ['McDonalds'],
    'Healthcare': ['Pfizer', 'Clicks'],
    'Pharmaceuticals': ['Pfizer'],
    'Health Stores': ['Clicks']
}

export async function fetchGoogleTrendsData(category) {
    const keywords = categoryKeywords[category];

    if (!keywords) {
        throw new Error(`No keywords defined for category: ${category}`);
    }

    try {
        // Fetch interest over time for each keyword
        const results = await Promise.all(keywords.map(keyword => 
            axios.get(BASE_URL, {
                params: {
                    api_key: API_KEY,
                    engine: 'google_trends',
                    q: keyword, // Keyword for SerpAPI
                    // Add any other parameters as needed
                }
            })
        ));

        // Process data to calculate lowest, average, and highest values
        const allValues = results.flatMap(result => {
            const data = result.data.timelineData;
            return data.map(item => parseFloat(item.value[0]));
        });

        if (allValues.length === 0) {
            throw new Error('No data available to calculate trends');
        }

        const lowestRecord = Math.min(...allValues);
        const highestRecord = Math.max(...allValues);
        const averageRecord = allValues.reduce((acc, value) => acc + value, 0) / allValues.length;

        // Define status based on averageRecord, you can adjust the threshold as needed
        const status = averageRecord > 50 ? 'Bullish' : 'Bearish';

        return {
            lowestRecord,
            highestRecord,
            averageRecord,
            status
        };
    } catch (error) {
        console.error(`Error fetching Google Trends data for ${category}:`, error);
        throw error;
    }
}
