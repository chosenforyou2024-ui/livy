export interface BusinessPlanInput {
  targetAudience: string;
  priceRange: string;
  uniqueSellingPoint: string;
  marketingChannels: string;
}

export interface AnalysisResult {
  score: number;
  viability: string;
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  marketingTips: string[];
  creativeIdeas: string[];
}

export interface Product {
  id: number;
  title: string;
  subtitle: string;
  coupletText: {
    upper: string;
    lower: string;
    horizontal: string;
  };
  meaning: string;
  description: string;
  price: number;
  remaining: number;
  imageColor: string;
  tags: string[];
}

export interface CartItem extends Product {
  quantity: number;
}