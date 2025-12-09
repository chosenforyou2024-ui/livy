import React, { useState } from 'react';
import { ShoppingBag, Star, Timer, X, Plus, Minus, ArrowRight, Heart, Sparkles, HelpCircle, Ruler, FileText, PenTool } from 'lucide-react';
import { Product, CartItem } from '../types';

// 擴充商品資料庫
const products: Product[] = [
  {
    id: 1,
    title: "顯化豐盛組",
    subtitle: "Abundance & Flow",
    coupletText: {
      upper: "宇宙豐盛流向我",
      lower: "財富喜悅皆具足",
      horizontal: "心想事成萬物生"
    },
    meaning: "針對希望提升財運與事業運的人群，強調無阻礙的能量流動。",
    description: "這不僅是一幅春聯，這是一張向宇宙發出的訂單。採用頂級「紅萊妮」美術紙，紙張具有獨特的十字壓紋質感，觸感溫潤厚實。字體使用傳統隸書並以高磅數燙金工藝呈現，象徵財富能量的固化與閃耀。適合貼於玄關或辦公室，每日出門前默念一次，強化潛意識中的富足感。",
    price: 580,
    remaining: 12,
    imageColor: "bg-leny-red",
    tags: ["事業", "財富", "能量"]
  },
  {
    id: 2,
    title: "內在平靜組",
    subtitle: "Inner Peace",
    coupletText: {
      upper: "呼吸之間皆自在",
      lower: "步履所至是安詳",
      horizontal: "歲月靜好心安住"
    },
    meaning: "針對焦慮現代人設計，強調回歸當下的力量。",
    description: "在這個喧囂的世界，平靜是最奢侈的財富。紅萊妮紙沈穩的紅色調，搭配燙金隸書的古樸氣質，自帶一種靜謐的氣場。適合貼於書房或臥室，提醒自己：外境越是紛亂，內心越要如止水般清澈。",
    price: 480,
    remaining: 8,
    imageColor: "bg-leny-red",
    tags: ["療癒", "健康", "睡眠"]
  },
  {
    id: 3,
    title: "無限愛戀組",
    subtitle: "Love & Connection",
    coupletText: {
      upper: "愛與被愛皆美好",
      lower: "靈魂伴侶常相隨",
      horizontal: "幸福頻率共振時"
    },
    meaning: "吸引良緣與和諧關係，提升自我價值感。",
    description: "愛不是尋找，而是吸引。這幅春聯設計旨在調整你的頻率至「愛」的層次。萊妮紙細緻的紋理如同情感的交織，燙金字體則如同真愛般歷久彌新。無論是期待新戀情，還是希望現有關係昇華，它都是最好的頻率錨點。",
    price: 520,
    remaining: 5,
    imageColor: "bg-leny-red",
    tags: ["感情", "人緣", "家庭"]
  },
  {
    id: 4,
    title: "勇氣突破組",
    subtitle: "Courage & Breakthrough",
    coupletText: {
      upper: "無懼挑戰開新局",
      lower: "堅定信念創未來",
      horizontal: "乘風破浪我獨行"
    },
    meaning: "適合創業者或面臨人生轉折的人，注入行動力。",
    description: "給正在舒適圈邊緣猶豫的你。隸書字體蒼勁有力，在紅萊妮紙上更顯莊重。燙金的光澤象徵著榮耀與勝利。每一次看見它，都是一次對自我能力的肯定，為你的 2025 年注入突破的勇氣。",
    price: 520,
    remaining: 20,
    imageColor: "bg-leny-red",
    tags: ["創業", "突破", "勇氣"]
  }
];

const CoupletText = ({ text, horizontal = false }: { text: string, horizontal?: boolean }) => {
  return (
    <div className={`flex ${horizontal ? 'flex-row space-x-4' : 'flex-col space-y-4'} justify-center items-center`}>
      {text.split('').map((char, i) => (
        <span key={i} className="inline-block">{char}</span>
      ))}
    </div>
  );
};

const StorePrototype: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [email, setEmail] = useState("");

  // 購物車邏輯
  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : item;
      }
      return item;
    }));
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-paper-bg relative">
      
      {/* 品牌故事 Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-stone-200">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 leading-tight">
              這不是迷信，<br/>這是心理學與美學的儀式。
            </h2>
            <p className="text-stone-600 text-lg leading-relaxed font-light">
              傳統春聯祈求神明賜福，<strong className="text-couplet-red font-medium">心想製所</strong>則是用來校準你的內在頻率。
              根據吸引力法則，我們關注什麼，就顯化什麼。
            </p>
            <p className="text-stone-600 text-lg leading-relaxed font-light">
              我们将充滿能量的肯定語句（Affirmations），透過<strong className="text-stone-800">傳統隸書燙金</strong>工藝，
              烙印在<strong className="text-stone-800">頂級紅萊妮紙</strong>上。
              這紅紙金字，將成為你居家空間最強大的能量錨點（Anchor）。
            </p>
            <div className="flex gap-4 pt-4">
              <div className="text-center px-4 py-3 bg-stone-100 rounded-lg">
                <div className="text-couplet-red font-bold text-xl font-serif">100%</div>
                <div className="text-xs text-stone-500 mt-1">紅萊妮紙</div>
              </div>
              <div className="text-center px-4 py-3 bg-stone-100 rounded-lg">
                <div className="text-couplet-red font-bold text-xl font-serif">燙金</div>
                <div className="text-xs text-stone-500 mt-1">高磅數工藝</div>
              </div>
              <div className="text-center px-4 py-3 bg-stone-100 rounded-lg">
                <div className="text-couplet-red font-bold text-xl font-serif">獨家</div>
                <div className="text-xs text-stone-500 mt-1">能量文案</div>
              </div>
            </div>
          </div>
          <div className="relative h-96 bg-stone-200 rounded-2xl overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-700 group">
             {/* 模擬生活情境圖 */}
             <div className="absolute inset-0 bg-stone-800/10 z-10 transition-opacity group-hover:opacity-0"></div>
             <div className="absolute inset-0 flex items-center justify-center bg-[#FDFBF7]">
                <div className="w-3/4 h-3/4 border-4 border-couplet-red/20 flex flex-col items-center justify-center p-8 text-center space-y-4 transition-all duration-700 group-hover:scale-105 group-hover:border-couplet-red/40">
                    <div className="writing-vertical-rl text-4xl font-clerical text-stone-800 tracking-widest border-l border-stone-300 pl-4 py-4">
                      <CoupletText text="心想事成萬物生" />
                    </div>
                    <p className="text-stone-400 text-sm mt-4 font-serif uppercase tracking-widest">Manifest Studio</p>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* 商品列表 Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20" id="shop">
        <div className="text-center mb-16">
          <span className="text-couplet-red font-bold tracking-widest uppercase text-sm bg-red-50 px-3 py-1 rounded-full">Pre-order Now</span>
          <h3 className="text-3xl font-serif font-bold text-stone-800 mt-4">2025 能量顯化系列</h3>
          <p className="text-stone-500 mt-2">紅萊妮紙 x 隸書燙金 x 能量文案</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map(product => (
            <div 
              key={product.id} 
              className="group bg-white rounded-xl shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer border border-stone-100 flex flex-col hover:-translate-y-2"
              onClick={() => setSelectedProduct(product)}
            >
              {/* Image Area - 模擬牆面背景，展示完整春聯 */}
              <div className="h-96 bg-[#F2F0E9] relative p-6 flex flex-col items-center justify-center overflow-hidden">
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold text-stone-600 shadow-sm z-10">
                   剩餘 {product.remaining} 組
                </div>
                
                {/* 裝飾性光影 */}
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/40 to-transparent pointer-events-none"></div>

                {/* Visual Representation of Couplet - 完整 ㄇ 字型展示 */}
                <div className="relative flex flex-col items-center gap-6 transition-transform duration-500 group-hover:scale-105">
                   
                   {/* 橫批 (Horizontal) */}
                   <div className="bg-leny-red px-6 py-2 shadow-lg flex items-center justify-center border border-white/5 ring-1 ring-black/5 transform group-hover:-translate-y-1 transition-transform duration-700">
                      <div className="text-gold-foil font-clerical text-lg">
                        <CoupletText text={product.coupletText.horizontal} horizontal={true} />
                      </div>
                   </div>

                   {/* 上下聯 (Verticals) */}
                   <div className="flex gap-12">
                      {/* 上聯 */}
                      <div className="w-10 bg-leny-red flex items-center justify-center font-clerical text-lg shadow-xl py-6 border border-white/5 ring-1 ring-black/5">
                          <div className="text-gold-foil">
                            <CoupletText text={product.coupletText.upper} />
                          </div>
                      </div>
                      {/* 下聯 */}
                      <div className="w-10 bg-leny-red flex items-center justify-center font-clerical text-lg shadow-xl py-6 border border-white/5 ring-1 ring-black/5">
                          <div className="text-gold-foil">
                            <CoupletText text={product.coupletText.lower} />
                          </div>
                      </div>
                   </div>
                </div>
              </div>

              {/* Content Area */}
              <div className="p-6 flex-1 flex flex-col bg-white">
                <div className="flex gap-2 mb-3 justify-center">
                  {product.tags.map(tag => (
                    <span key={tag} className="text-[10px] uppercase tracking-wider text-stone-500 bg-stone-100 px-2 py-0.5 rounded-full border border-stone-200">
                      #{tag}
                    </span>
                  ))}
                </div>
                <h4 className="text-xl font-bold font-serif text-stone-800 text-center mb-1">{product.title}</h4>
                <p className="text-xs text-stone-500 mb-4 text-center tracking-wide">{product.subtitle}</p>
                <p className="text-sm text-stone-600 line-clamp-2 mb-6 text-center leading-relaxed px-2">{product.meaning}</p>
                
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-stone-100">
                  <span className="text-xl font-bold text-stone-900 font-serif">NT$ {product.price}</span>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(product);
                    }}
                    className="p-2.5 bg-stone-900 text-white rounded-full hover:bg-couplet-red transition-colors shadow-md group-hover:scale-110 duration-300"
                  >
                    <ShoppingBag className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 評價/信任區塊 */}
      <div className="bg-sage/10 border-y border-sage/20 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <h3 className="text-2xl font-serif font-bold text-stone-800 text-center mb-12">使用者的顯化故事</h3>
           <div className="grid md:grid-cols-3 gap-8">
              {[
                { name: "Joanne, 32歲", role: "自由工作者", text: "收到實品真的很驚艷！紅萊妮紙的質感非常好，燙金在燈光下非常有層次，完全不像一般的塑膠春聯。", stars: 5 },
                { name: "Mark, 28歲", role: "軟體工程師", text: "隸書字體很有味道，不落俗套。貼在門上感覺整個家的氣場都變穩了，很喜歡這種結合傳統與現代的設計。", stars: 5 },
                { name: "Emily, 35歲", role: "花藝師", text: "紙張厚度很夠，貼起來很平整。文字內容很正向，每天進出門看到心情都很好，感覺 2025 會是很棒的一年。", stars: 5 }
              ].map((review, i) => (
                <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-stone-100">
                   <div className="flex text-amber-400 mb-3">
                     {[...Array(review.stars)].map((_, j) => <Star key={j} className="w-4 h-4 fill-current" />)}
                   </div>
                   <p className="text-stone-600 text-sm mb-4 leading-relaxed">"{review.text}"</p>
                   <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-stone-200 flex items-center justify-center text-stone-500 text-xs font-bold">
                        {review.name[0]}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-stone-800">{review.name}</div>
                        <div className="text-[10px] text-stone-500">{review.role}</div>
                      </div>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-4 py-16">
         <h3 className="text-2xl font-serif font-bold text-stone-800 text-center mb-8">常見問題</h3>
         <div className="space-y-4">
            <details className="group bg-white rounded-lg border border-stone-200 open:border-couplet-red/30 transition-all">
              <summary className="flex items-center justify-between p-4 cursor-pointer font-medium text-stone-800 list-none">
                <span>出貨時間是什麼時候？</span>
                <span className="transition-transform group-open:rotate-180"><ArrowRight className="w-4 h-4" /></span>
              </summary>
              <div className="px-4 pb-4 text-sm text-stone-600 leading-relaxed">
                這是預購商品。我們將於 2025年1月10日 統一依照訂單順序出貨，確保您在過年前（1月29日）能收到並完成佈置。
              </div>
            </details>
            <details className="group bg-white rounded-lg border border-stone-200 open:border-couplet-red/30 transition-all">
              <summary className="flex items-center justify-between p-4 cursor-pointer font-medium text-stone-800 list-none">
                <span>請問材質是否適合戶外張貼？</span>
                <span className="transition-transform group-open:rotate-180"><ArrowRight className="w-4 h-4" /></span>
              </summary>
              <div className="px-4 pb-4 text-sm text-stone-600 leading-relaxed">
                我們使用紅萊妮美術紙，並經過特殊燙金處理。建議張貼於有遮蔽的門廊或室內空間（如玄關、客廳主牆），避免雨水直接淋濕，以保持紙張的最佳質感。
              </div>
            </details>
         </div>
      </div>

      {/* Newsletter / CTA */}
      <div className="bg-stone-900 text-white py-16 px-4 text-center">
         <Sparkles className="w-8 h-8 text-couplet-gold mx-auto mb-4" />
         <h2 className="text-3xl font-serif font-bold mb-4">準備好迎接豐盛的一年了嗎？</h2>
         <p className="text-stone-400 mb-8 max-w-lg mx-auto">
           現在預購，隨單附贈「2025 顯化手帳」電子版下載連結。<br/>
           輸入 Email 獲取 95 折早鳥優惠碼。
         </p>
         <div className="max-w-md mx-auto flex gap-2">
            <input 
              type="email" 
              placeholder="您的 Email" 
              className="flex-1 px-4 py-3 rounded-lg bg-stone-800 border border-stone-700 text-white placeholder-stone-500 focus:outline-none focus:ring-1 focus:ring-couplet-gold"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button className="px-6 py-3 bg-couplet-gold text-stone-900 font-bold rounded-lg hover:bg-yellow-600 transition-colors">
              領取優惠
            </button>
         </div>
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm" onClick={() => setSelectedProduct(null)}></div>
          <div className="relative bg-white rounded-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col md:flex-row animate-in fade-in zoom-in-95 duration-200">
            <button 
              className="absolute top-4 right-4 p-2 bg-white/50 rounded-full hover:bg-stone-100 z-10 transition-colors"
              onClick={() => setSelectedProduct(null)}
            >
              <X className="w-5 h-5" />
            </button>
            
            {/* Modal Image - 全版展示 */}
            <div className={`md:w-1/2 bg-[#F2F0E9] p-8 md:p-12 flex items-center justify-center min-h-[400px] border-r border-stone-100`}>
               {/* 模擬門框或牆面背景 */}
               <div className="relative w-full h-full flex flex-col items-center justify-center gap-8">
                  {/* 光影效果 */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent pointer-events-none"></div>

                  {/* 橫批 */}
                  <div className="bg-leny-red px-8 py-3 rounded-sm font-clerical text-2xl md:text-3xl shadow-xl border border-white/5 ring-1 ring-black/5 z-10">
                    <div className="text-gold-foil">
                        <CoupletText text={selectedProduct.coupletText.horizontal} horizontal={true} />
                    </div>
                  </div>

                  {/* 上下聯 */}
                  <div className="flex gap-16 md:gap-24 scale-100 z-10">
                     <div className="w-16 md:w-20 bg-leny-red flex items-center justify-center font-clerical text-2xl md:text-3xl font-bold shadow-2xl py-8 border border-white/5 ring-1 ring-black/5">
                        <div className="text-gold-foil">
                            <CoupletText text={selectedProduct.coupletText.upper} />
                        </div>
                     </div>
                     <div className="w-16 md:w-20 bg-leny-red flex items-center justify-center font-clerical text-2xl md:text-3xl font-bold shadow-2xl py-8 border border-white/5 ring-1 ring-black/5">
                        <div className="text-gold-foil">
                            <CoupletText text={selectedProduct.coupletText.lower} />
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            {/* Modal Content */}
            <div className="md:w-1/2 p-8 md:p-12 bg-white flex flex-col text-center md:text-center">
              <div className="mb-3 text-couplet-red font-bold text-sm tracking-wider uppercase inline-block mx-auto border-b border-red-100 pb-1">2025 Limited Edition</div>
              <h2 className="text-3xl font-serif font-bold text-stone-900 mb-2">{selectedProduct.title}</h2>
              <p className="text-lg text-stone-500 mb-8 font-serif italic">{selectedProduct.subtitle}</p>
              
              <div className="space-y-8 mb-8 flex-1 text-left">
                 {/* 規格表 */}
                <div className="bg-stone-50 rounded-xl p-6 border border-stone-100 grid grid-cols-2 gap-y-6 gap-x-4">
                    <div className="flex flex-col items-center text-center">
                        <div className="p-2 bg-white rounded-full shadow-sm mb-2"><Ruler className="w-5 h-5 text-stone-400" /></div>
                        <div>
                            <div className="text-[10px] text-stone-400 uppercase font-bold tracking-wider">尺寸</div>
                            <div className="text-sm font-medium text-stone-800">196mm x 1090mm</div>
                        </div>
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <div className="p-2 bg-white rounded-full shadow-sm mb-2"><FileText className="w-5 h-5 text-stone-400" /></div>
                         <div>
                            <div className="text-[10px] text-stone-400 uppercase font-bold tracking-wider">材質</div>
                            <div className="text-sm font-medium text-stone-800">120磅 紅萊妮紙</div>
                        </div>
                    </div>
                     <div className="col-span-2 flex flex-col items-center text-center border-t border-stone-200 pt-4 mt-2">
                        <div className="flex items-center gap-2 mb-1">
                          <PenTool className="w-4 h-4 text-stone-400" />
                          <div className="text-[10px] text-stone-400 uppercase font-bold tracking-wider">工藝細節</div>
                        </div>
                        <div className="text-sm font-medium text-stone-800">傳統隸書 / 霧面高磅數燙金</div>
                    </div>
                </div>

                <div className="px-4 overflow-x-auto pb-2">
                  <h4 className="font-bold text-stone-900 mb-3 flex items-center justify-center gap-2 text-lg">
                    <Sparkles className="w-4 h-4 text-couplet-gold" /> 
                    <span>設計寓意</span>
                    <Sparkles className="w-4 h-4 text-couplet-gold" />
                  </h4>
                  <p className="text-stone-600 text-base leading-relaxed text-justify">{selectedProduct.description}</p>
                </div>
              </div>

              <div className="flex flex-col items-center border-t border-stone-100 pt-8 gap-6 mt-auto">
                <div className="text-center">
                   <span className="text-4xl font-bold text-couplet-red font-serif">NT$ {selectedProduct.price}</span>
                   <p className="text-sm text-stone-400 mt-1">預購優惠價 (原價 $880)</p>
                </div>
                <div className="flex gap-4 w-full max-w-md">
                    <button 
                      onClick={() => {
                        addToCart(selectedProduct);
                        setSelectedProduct(null);
                      }}
                      className="flex-1 bg-white border border-stone-200 text-stone-700 px-6 py-4 rounded-xl font-medium hover:bg-stone-50 hover:border-stone-300 transition-all flex items-center justify-center gap-2"
                    >
                      <ShoppingBag className="w-4 h-4" /> 加入清單
                    </button>
                    <button 
                      onClick={() => {
                        console.log("Initiating direct checkout for product:", selectedProduct.title);
                        addToCart(selectedProduct);
                        setIsCartOpen(true);
                        setSelectedProduct(null);
                      }}
                      className="flex-1 bg-stone-900 text-white px-8 py-4 rounded-xl font-medium hover:bg-couplet-red transition-all shadow-xl shadow-stone-200 flex items-center justify-center gap-2"
                    >
                       立即購買
                    </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cart Drawer */}
      <div className={`fixed inset-0 z-50 pointer-events-none ${isCartOpen ? 'pointer-events-auto' : ''}`}>
        <div className={`absolute inset-0 bg-stone-900/30 backdrop-blur-sm transition-opacity duration-300 ${isCartOpen ? 'opacity-100' : 'opacity-0'}`} onClick={() => setIsCartOpen(false)}></div>
        <div className={`absolute top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl transform transition-transform duration-300 ease-out flex flex-col ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="p-6 border-b border-stone-100 flex items-center justify-between bg-stone-50">
            <h2 className="text-xl font-serif font-bold text-stone-800 flex items-center gap-2">
              <ShoppingBag className="w-5 h-5" /> 您的預購清單
            </h2>
            <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-stone-200 rounded-full text-stone-500">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-stone-400 space-y-4">
                <ShoppingBag className="w-12 h-12 opacity-20" />
                <p>您的清單是空的</p>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="text-couplet-red font-medium text-sm hover:underline"
                >
                  去逛逛顯化春聯
                </button>
              </div>
            ) : (
              cart.map(item => (
                <div key={item.id} className="flex gap-4 animate-in slide-in-from-right-5">
                  <div className={`w-20 h-24 bg-leny-red rounded-sm flex items-center justify-center flex-shrink-0 border border-stone-100 relative shadow-sm`}>
                     <div className="text-gold-foil text-[10px] h-16 w-full flex justify-center items-center">
                        <CoupletText text={item.coupletText.upper} />
                     </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-stone-800 font-serif">{item.title}</h4>
                    <p className="text-xs text-stone-500 mb-1">材質：紅萊妮紙 (燙金)</p>
                    <p className="text-xs text-stone-500 mb-2">單價：NT$ {item.price}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 border border-stone-200 rounded-md p-1">
                        <button onClick={() => updateQuantity(item.id, -1)} className="p-1 hover:bg-stone-100 rounded text-stone-500"><Minus className="w-3 h-3" /></button>
                        <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)} className="p-1 hover:bg-stone-100 rounded text-stone-500"><Plus className="w-3 h-3" /></button>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} className="text-xs text-red-500 hover:text-red-700 underline">移除</button>
                    </div>
                  </div>
                  <div className="text-right font-medium text-stone-800">
                    NT$ {item.price * item.quantity}
                  </div>
                </div>
              ))
            )}
          </div>

          {cart.length > 0 && (
            <div className="p-6 border-t border-stone-100 bg-stone-50">
               <div className="flex justify-between mb-4 text-stone-500 text-sm">
                 <span>小計</span>
                 <span>NT$ {cartTotal}</span>
               </div>
               <div className="flex justify-between mb-6 text-lg font-bold text-stone-900 font-serif">
                 <span>總計 (含運)</span>
                 <span>NT$ {cartTotal}</span>
               </div>
               <button className="w-full bg-couplet-red text-white py-4 rounded-lg font-bold hover:bg-red-800 transition-colors shadow-lg flex items-center justify-center gap-2">
                 前往結帳 <ArrowRight className="w-4 h-4" />
               </button>
               <p className="text-center text-xs text-stone-400 mt-4">
                 預計 2025/01/10 開始出貨
               </p>
            </div>
          )}
        </div>
      </div>

      {/* Floating Cart Button (Mobile) */}
      {!isCartOpen && cart.length > 0 && (
        <button 
          onClick={() => setIsCartOpen(true)}
          className="fixed bottom-6 right-6 z-40 bg-stone-900 text-white p-4 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform animate-bounce"
        >
          <ShoppingBag className="w-6 h-6" />
          <span className="absolute -top-2 -right-2 bg-couplet-red text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center border-2 border-white">
            {cart.reduce((a, b) => a + b.quantity, 0)}
          </span>
        </button>
      )}

    </div>
  );
};

export default StorePrototype;