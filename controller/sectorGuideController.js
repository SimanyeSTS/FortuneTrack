import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Ensure this is set in your environment variables
});

class SectorGuideController {
  async getInsights(req, res) {
    try {
      const { message, sectors } = req.body;

      // Prepare sector summary data
      const sectorSummaries = {
        retail: this.summarizeSector(sectors.retail),
        technology: this.summarizeSector(sectors.technology),
        foodAndBeverages: this.summarizeSector(sectors.foodAndBeverages),
        healthcare: this.summarizeSector(sectors.healthcare),
      };

      const response = await this.generateResponse(message, sectorSummaries);
      res.json({ response });
    } catch (error) {
      console.error('Sector Guide Error:', error);
      res.status(500).json({ error: 'Failed to generate sector insights.' });
    }
  }

  summarizeSector(companies) {
    if (!companies || companies.length === 0) return null;

    const avgGrowth =
      companies.reduce(
        (sum, company) => sum + (parseFloat(company.QuarterlyEarningsGrowthYOY) || 0),
        0
      ) / companies.length;

    const topPerformer = companies.reduce(
      (top, company) =>
        (parseFloat(company.QuarterlyEarningsGrowthYOY) || 0) >
        (parseFloat(top.QuarterlyEarningsGrowthYOY) || 0)
          ? company
          : top,
      companies[0]
    );

    return {
      companyCount: companies.length,
      averageGrowth: avgGrowth.toFixed(2),
      topPerformer: topPerformer.Symbol,
      topPerformerGrowth: topPerformer.QuarterlyEarningsGrowthYOY,
    };
  }

  async generateResponse(message, sectorSummaries) {
    const messages = [
      {
        role: 'system',
        content:
          'You are a helpful assistant that provides friendly, conversational insights about market sectors. Do not make specific predictions or give financial advice. Keep the tone light, engaging, and concise.',
      },
      {
        role: 'user',
        content: `Generate a friendly, conversational response about market sectors. Here is the user question and the available sector information:\n
        Question: ${message}\n\n
        Available sector information:\n${JSON.stringify(sectorSummaries, null, 2)}\n\n
        Remember:
        - Compare sectors when relevant.
        - Encourage using the Predict button for detailed analysis.
        - Keep responses concise and easy to understand.`,
      },
    ];
  
    try {
      const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo', // Use gpt-3.5-turbo for broader compatibility
        messages,
        max_tokens: 500,
        temperature: 0.7,
      });
  
      return completion.choices[0]?.message?.content?.trim();
    } catch (error) {
      console.error('OpenAI API Error:', error.message);
      if (error.response?.data?.error?.code === 'model_not_found') {
        throw new Error('The requested model is not available for your API key. Please check your OpenAI subscription.');
      }
      throw new Error('Failed to generate response from OpenAI.');
    }
  }
}

export default new SectorGuideController();
