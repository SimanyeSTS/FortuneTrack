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
    const prompt = `Generate a friendly, conversational response about market sectors. Don't make specific predictions or give financial advice.
    Question: ${message}
    
    Available sector information:
    ${JSON.stringify(sectorSummaries, null, 2)}
    
    Remember:
    - Keep the tone light and engaging.
    - Compare sectors when relevant.
    - Encourage using the Predict button for detailed analysis.
    - Don't make specific predictions or give financial advice.
    - Keep responses concise and easy to understand.
    `;

    try {
      const completion = await openai.completions.create({
        model: 'text-davinci-003',
        prompt: prompt,
        max_tokens: 500,
        temperature: 0.7,
      });

      return completion.choices[0]?.text?.trim();
    } catch (error) {
      console.error('OpenAI API Error:', error);
      throw new Error('Failed to generate response from OpenAI.');
    }
  }
}

export default new SectorGuideController();
