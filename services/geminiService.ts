import { GoogleGenAI, Type } from "@google/genai";
import { BusinessPlanInput, AnalysisResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeBusinessPlan = async (input: BusinessPlanInput): Promise<AnalysisResult> => {
  const prompt = `
    Assuming the role of a senior e-commerce and brand consultant in Taiwan.
    Analyze the feasibility of a business selling "Healing/Law of Attraction themed Spring Festival Couplets" (療癒/吸引力法則春聯) on a pre-order basis.

    User Input Details:
    - Target Audience: ${input.targetAudience}
    - Price Range: ${input.priceRange}
    - Core Concept: ${input.uniqueSellingPoint}
    - Marketing: ${input.marketingChannels}

    Please provide a structured JSON analysis.
    The output must include:
    1. A viability score (0-100).
    2. A brief viability verdict.
    3. Strengths (SWOT).
    4. Weaknesses (SWOT).
    5. Opportunities (SWOT).
    6. Specific marketing tips for this niche.
    7. 3 Creative couplet text ideas that fit the "Law of Attraction" theme (Modern, healing, not traditional distinct phrases).
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: { type: Type.NUMBER },
            viability: { type: Type.STRING },
            strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
            weaknesses: { type: Type.ARRAY, items: { type: Type.STRING } },
            opportunities: { type: Type.ARRAY, items: { type: Type.STRING } },
            marketingTips: { type: Type.ARRAY, items: { type: Type.STRING } },
            creativeIdeas: { type: Type.ARRAY, items: { type: Type.STRING } },
          },
          required: ["score", "viability", "strengths", "weaknesses", "marketingTips", "creativeIdeas"],
        },
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response from AI");
    }
    return JSON.parse(text) as AnalysisResult;
  } catch (error) {
    console.error("Analysis failed:", error);
    throw error;
  }
};