const googleTrends = require('google-trends-api');

const categoryKeywords = {
    Retail: ['Headboard', 'H&M'],
    Technology: ['iPhone', 'AWS'],
    'Food & Beverages': ['Coca-Cola', 'McDonalds'],
    Healthcare: ['Pfizer', 'Clicks']
}

export const fetchGoogleTrendsData = async (category) => {
    const keywords = categoryKeywords[category]
    
    if (!keywords) {
        throw new Error(`No keywords defined for category: ${category}`)
    }

    try {
        const results = await googleTrends.interestOverTime({
            keyword: keywords,
            startTime: new Date(Date.now() - (7 * 24 * 60 * 60 * 1000)),
            geo: 'ZA'
        })
        return JSON.parse(results);
    } catch (err) {
        console.error("Error fetching Google Trends data:", err)
        throw err
    }
}
