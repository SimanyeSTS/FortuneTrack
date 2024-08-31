// import axios from 'axios';
// import dotenv from 'dotenv';

// // Load environment variables from .env file
// dotenv.config();

// const categoryQueries = {
//     'Retail': ['Headboard', 'H&M'],
//     'Fashion': ['H&M'],
//     'Gadgets': ['iPhone'],
//     'Cloud Services': ['AWS'],
//     'Soft Drinks': ['Coca-Cola'],
//     'Fast Food': ['McDonalds'],
//     'Pharmaceuticals': ['Pfizer'],
//     'Health Stores': ['Clicks']
// };

// export const fetchTwitterData = async (category) => {
//     const queries = categoryQueries[category];

//     if (!queries) {
//         throw new Error(`No queries defined for category: ${category}`);
//     }

//     const bearerToken = process.env.TWITTER_BEARER_TOKEN;

//     if (!bearerToken) {
//         throw new Error('Bearer token is not defined in environment variables');
//     }

//     try {
//         const results = await Promise.all(queries.map(query => 
//             axios.get(`https://api.twitter.com/2/tweets/counts/recent`, {
//                 params: { query: encodeURIComponent(query) },
//                 headers: { 'Authorization': `Bearer ${bearerToken}` }
//             })
//         ));

//         const tweetCount = results.reduce((acc, result) => {
//             // Ensure result.data.meta and result.data.meta.total_count are present
//             return acc + (result.data.meta?.total_count || 0);
//         }, 0);

//         return { averagePercentage: tweetCount / queries.length };
//     } catch (e) {
//         console.error(`Error fetching Twitter data for ${category}:`, e);
//         throw e;
//     }
// };
