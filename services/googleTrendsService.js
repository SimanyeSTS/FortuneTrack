import googleTrends from 'google-trends-api';

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

// Fetch Google Trends data for a given category
export const fetchGoogleTrendsData = async (category) => {
    const keywords = categoryKeywords[category];

    if (!keywords) {
        throw new Error(`No keywords defined for category: ${category}`);
    }

    try {
        // Fetch interest over time for each keyword
        const results = await Promise.all(keywords.map(keyword => 
            googleTrends.interestOverTime({ keyword, startTime: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }) // Last 7 days
        ));
        
        // Process data to calculate lowest, average, and highest values
        const allValues = results.flatMap(result => {
            const data = JSON.parse(result).default.timelineData;
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
    } catch (e) {
        console.error(`Error fetching Google Trends data for ${category}:`, e);
        throw e;
    }
};
