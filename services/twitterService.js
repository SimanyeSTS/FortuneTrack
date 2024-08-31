const { TwitterApi } = require('twitter-api-v2');

const twitterClient = new TwitterApi({
    appKey: process.env.TWITTER_APP_KEY,
    appSecret: process.env.TWITTER_APP_SECRET,
    accessToken: process.env.TWITTER_ACCESS_TOKEN,
    accessSecret: process.env.TWITTER_ACCESS_SECRET,
})

const categoryQueries = {
    Retail: ['Headboard H&M'],
    Technology: ['iPhone AWS'],
    'Food & Beverages': ['Coca-Cola McDonalds'],
    Healthcare: ['Pfizer Clicks']
}

export const fetchTwitterData = async (category) => {
    const query = categoryQueries[category]
    
    if (!query) {
        throw new Error(`No query defined for category: ${category}`)
    }

    try {
        const tweets = await twitterClient.v2.search(query, {
            max_results: 100
        })
        return tweets.data
    } catch (err) {
        console.error("Error fetching Twitter data:", err)
        throw err
    }
}
