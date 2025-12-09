import React, { useState } from 'react';
import { Sparkles, Menu, X, Instagram, Facebook, ArrowRight } from 'lucide-react';
import AnalysisSection from './components/AnalysisSection';
import StorePrototype from './components/StorePrototype';
import BrandLogo from './components/BrandLogo';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'analysis' | 'store'>('store');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-paper-bg text-stone-800 font-sans selection:bg-couplet-red selection:text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b border-stone-100 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            {/* Logo Area */}
            <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setActiveTab('store')}>
              <div className="transition-transform group-hover:rotate-12 duration-500">
                <BrandLogo className="w-10 h-10 md:w-12 md:h-12" />
              </div>
              <div className="flex flex-col">
                <h1 className="text-xl md:text-2xl font-serif font-bold text-stone-900 tracking-widest leading-none">
                  心想製所
                </h1>
                <p className="text-[9px] md:text-[10px] text-couplet-gold font-bold tracking-[0.3em] uppercase mt-1">
                  Manifest Studio
                </p>
              </div>
            </div>

            <div className="hidden md:flex space-x-8 items-center">
              <button 
                onClick={() => setActiveTab('store')}
                className={`text-sm font-medium transition-all px-3 py-1 rounded-full ${activeTab === 'store' ? 'text-couplet-red bg-red-50' : 'text-stone-500 hover:text-stone-800'}`}
              >
                線上預購商店
              </button>
               <button 
                onClick={() => setActiveTab('analysis')}
                className={`text-sm font-medium transition-all px-3 py-1 rounded-full ${activeTab === 'analysis' ? 'text-couplet-red bg-red-50' : 'text-stone-500 hover:text-stone-800'}`}
              >
                品牌創業實驗室 (AI)
              </button>
              <a href="#about" className="text-stone-500 hover:text-stone-800 text-sm font-medium">關於我們</a>
            </div>

            <div className="md:hidden">
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-stone-600">
                {mobileMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-stone-100 py-4 px-4 space-y-4 shadow-xl animate-in slide-in-from-top-5">
              <button 
                onClick={() => { setActiveTab('store'); setMobileMenuOpen(false); }}
                className="block w-full text-left text-stone-700 font-medium py-3 border-b border-stone-50"
              >
                線上預購商店
              </button>
             <button 
                onClick={() => { setActiveTab('analysis'); setMobileMenuOpen(false); }}
                className="block w-full text-left text-stone-700 font-medium py-3"
              >
                創業實驗室 (AI Demo)
              </button>
          </div>
        )}
      </nav>

      {/* Conditional Hero Rendering */}
      {activeTab === 'store' && (
        <div className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden bg-[#FDFBF7]">
          {/* Animated Background Elements */}
          <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none overflow-hidden">
             <div className="absolute -top-24 -left-24 w-96 h-96 bg-couplet-red rounded-full blur-[100px] animate-pulse"></div>
             <div className="absolute top-1/2 right-0 w-64 h-64 bg-couplet-gold rounded-full blur-[80px] mix-blend-multiply opacity-50"></div>
          </div>
          
          <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur text-couplet-red text-xs font-bold uppercase tracking-[0.2em] mb-8 border border-red-100 shadow-sm animate-float">
              <Sparkles className="w-3 h-3 fill-current" />
              Manifest Your 2025
            </div>
            
            <h2 className="text-5xl md:text-7xl font-serif font-bold text-stone-900 leading-[1.2] mb-6 tracking-tight">
              以意念為墨，<br />
              <span className="relative inline-block">
                顯化
                <span className="absolute -bottom-2 left-0 w-full h-3 bg-couplet-gold/30 -z-10 skew-x-12"></span>
              </span>
              你未來的模樣。
            </h2>
            
            <p className="text-lg md:text-xl text-stone-600 mb-10 max-w-xl mx-auto leading-relaxed font-light">
              歡迎來到<strong className="text-stone-800 font-medium">心想製所</strong>。
              這裡販售的不只是春聯，而是結合心理學與東方美學的「能量訂單」。
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto">
              <button 
                onClick={() => document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' })}
                className="group px-8 py-4 bg-stone-900 text-white rounded-xl font-medium hover:bg-couplet-red transition-all shadow-xl hover:shadow-couplet-red/20 hover:-translate-y-1 flex items-center justify-center gap-2"
              >
                瀏覽限量系列 <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="pb-24 px-0">
        {activeTab === 'analysis' ? (
          <div className="pt-32 px-4 sm:px-6 lg:px-8">
             <AnalysisSection />
          </div>
        ) : (
          <StorePrototype />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-stone-50 border-t border-stone-200 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8 mb-12">
            <div className="flex flex-col items-center md:items-start gap-4">
              <div className="flex items-center gap-3">
                 <BrandLogo className="w-8 h-8" variant="dark" />
                 <span className="font-serif font-bold text-xl text-stone-900 tracking-wide">心想製所</span>
              </div>
              <p className="text-stone-500 text-sm max-w-xs text-center md:text-left leading-relaxed">
                結合傳統習俗與現代身心靈的儀式感品牌。<br/>
                讓每一張紅紙，都成為通往理想生活的車票。
              </p>
            </div>
            
            <div className="flex gap-6">
              <a href="#" className="flex items-center justify-center w-10 h-10 bg-white rounded-full border border-stone-100 text-stone-400 hover:text-couplet-red hover:border-couplet-red transition-all">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="flex items-center justify-center w-10 h-10 bg-white rounded-full border border-stone-100 text-stone-400 hover:text-blue-600 hover:border-blue-600 transition-all">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div className="border-t border-stone-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-stone-400">
            <p>© 2025 Manifest Studio. All rights reserved.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-stone-600">隱私權政策</a>
              <a href="#" className="hover:text-stone-600">退換貨須知</a>
              <a href="#" className="hover:text-stone-600">聯絡我們</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;