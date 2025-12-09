import React, { useState } from 'react';
import { Sparkles, ArrowRight, Loader2, CheckCircle2, AlertTriangle } from 'lucide-react';
import { analyzeBusinessPlan } from '../services/geminiService';
import { BusinessPlanInput, AnalysisResult } from '../types';

const AnalysisSection: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [formData, setFormData] = useState<BusinessPlanInput>({
    targetAudience: '25-40歲，注重生活品質與身心靈成長的女性',
    priceRange: '一套 380 - 580 TWD',
    uniqueSellingPoint: '結合現代極簡設計與肯定語句，紙質使用高級宣紙',
    marketingChannels: 'Instagram Reels, 身心靈KOL合作, Pinkoi',
  });

  const handleAnalyze = async () => {
    setLoading(true);
    try {
      const data = await analyzeBusinessPlan(formData);
      setResult(data);
    } catch (e) {
      alert("分析失敗，請稍後再試");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-stone-100">
      <div className="p-8 md:p-12">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-serif text-stone-800 mb-3 flex items-center justify-center gap-3">
            <Sparkles className="w-6 h-6 text-couplet-gold" />
            AI 創業可行性分析
          </h2>
          <p className="text-stone-500">輸入您的構想，讓 Gemini 為您的「靈魂春聯」計畫把脈。</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">目標受眾 (Target Audience)</label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-stone-200 rounded-lg focus:ring-2 focus:ring-couplet-red focus:border-transparent outline-none bg-stone-50"
                value={formData.targetAudience}
                onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">預計售價 (Pricing)</label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-stone-200 rounded-lg focus:ring-2 focus:ring-couplet-red focus:border-transparent outline-none bg-stone-50"
                value={formData.priceRange}
                onChange={(e) => setFormData({ ...formData, priceRange: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">獨特賣點 (USP)</label>
              <textarea
                className="w-full px-4 py-2 border border-stone-200 rounded-lg focus:ring-2 focus:ring-couplet-red focus:border-transparent outline-none bg-stone-50 h-24 resize-none"
                value={formData.uniqueSellingPoint}
                onChange={(e) => setFormData({ ...formData, uniqueSellingPoint: e.target.value })}
              />
            </div>
             <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">行銷通路 (Channels)</label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-stone-200 rounded-lg focus:ring-2 focus:ring-couplet-red focus:border-transparent outline-none bg-stone-50"
                value={formData.marketingChannels}
                onChange={(e) => setFormData({ ...formData, marketingChannels: e.target.value })}
              />
            </div>

            <button
              onClick={handleAnalyze}
              disabled={loading}
              className="w-full mt-4 bg-couplet-red hover:bg-red-800 text-white font-medium py-3 px-6 rounded-lg transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg disabled:opacity-70"
            >
              {loading ? <Loader2 className="animate-spin w-5 h-5" /> : <Sparkles className="w-5 h-5" />}
              {loading ? '正在分析數據...' : '開始 AI 分析'}
            </button>
          </div>

          <div className="bg-stone-50 rounded-xl p-6 border border-stone-100 min-h-[400px] flex flex-col">
            {!result ? (
              <div className="flex-1 flex flex-col items-center justify-center text-stone-400 space-y-4">
                <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center">
                  <ArrowRight className="w-6 h-6" />
                </div>
                <p>分析結果將顯示於此</p>
              </div>
            ) : (
              <div className="space-y-6 animate-fadeIn">
                <div className="flex items-center justify-between border-b border-stone-200 pb-4">
                  <div>
                    <span className="text-sm text-stone-500 uppercase tracking-wider">可行性評分</span>
                    <div className="text-4xl font-serif font-bold text-couplet-red">{result.score}<span className="text-lg text-stone-400">/100</span></div>
                  </div>
                  <div className="px-4 py-2 bg-white rounded-lg shadow-sm text-sm font-medium text-stone-700">
                    {result.viability}
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-stone-800 mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" /> 優勢與機會
                  </h4>
                  <ul className="text-sm text-stone-600 space-y-1 pl-6 list-disc">
                    {result.strengths.slice(0, 2).map((s, i) => <li key={`s-${i}`}>{s}</li>)}
                    {result.opportunities.slice(0, 2).map((o, i) => <li key={`o-${i}`}>{o}</li>)}
                  </ul>
                </div>

                 <div>
                  <h4 className="font-bold text-stone-800 mb-2 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-500" /> 風險提示
                  </h4>
                  <ul className="text-sm text-stone-600 space-y-1 pl-6 list-disc">
                    {result.weaknesses.slice(0, 2).map((w, i) => <li key={`w-${i}`}>{w}</li>)}
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-stone-800 mb-2">💡 AI 創意文案提案</h4>
                  <div className="space-y-2">
                    {result.creativeIdeas.map((idea, i) => (
                      <div key={i} className="bg-white p-3 rounded border border-stone-200 text-sm font-serif text-couplet-red">
                        {idea}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisSection;