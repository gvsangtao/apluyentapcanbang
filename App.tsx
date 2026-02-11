
import React, { useState } from 'react';
import Layout from './components/Layout';
import RedoxChat from './components/RedoxChat';
import InteractiveBalancing from './components/InteractiveBalancing';
import { LESSONS, PRACTICE_EXAMPLES } from './constants';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'LEARN' | 'PRACTICE' | 'CHAT'>('LEARN');
  const [selectedReaction, setSelectedReaction] = useState<any | null>(null);

  const renderContent = () => {
    switch (activeTab) {
      case 'LEARN':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-teal-100">
                <h2 className="text-3xl font-extrabold text-teal-900 mb-6">Kiến Thức Trọng Tâm</h2>
                <div className="space-y-12">
                  {LESSONS.map((lesson) => (
                    <div key={lesson.id} className="group">
                      <h3 className="text-xl font-bold text-teal-700 mb-4 flex items-center">
                        <span className="w-8 h-8 bg-teal-100 text-teal-700 rounded-lg flex items-center justify-center mr-3 text-sm group-hover:bg-teal-600 group-hover:text-white transition-colors">
                          {LESSONS.indexOf(lesson) + 1}
                        </span>
                        {lesson.title}
                      </h3>
                      <div className="ml-11 text-slate-700 leading-relaxed">
                        {lesson.content}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="bg-teal-900 text-white p-6 rounded-3xl shadow-lg relative overflow-hidden">
                <div className="relative z-10">
                  <h3 className="text-xl font-bold mb-2">Học Nhanh 💡</h3>
                  <p className="text-teal-200 text-sm mb-4">"Khử cho - O nhận"</p>
                  <p className="text-xs text-teal-300 leading-relaxed">
                    Nhớ quy tắc này để không bao giờ nhầm lẫn giữa chất khử và chất oxi hóa nhé!
                  </p>
                </div>
                <div className="absolute top-[-20%] right-[-10%] w-32 h-32 bg-teal-800 rounded-full opacity-50"></div>
              </div>

              <div className="bg-white p-6 rounded-3xl shadow-sm border border-teal-100">
                <h3 className="font-bold text-slate-900 mb-4 flex items-center">
                  <svg className="w-5 h-5 text-teal-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  Hỗ Trợ AI
                </h3>
                <p className="text-sm text-slate-600 mb-4">Gặp khó khăn khi xác định số oxi hóa? Đừng ngại hỏi AI Tutor.</p>
                <button 
                  onClick={() => setActiveTab('CHAT')}
                  className="w-full bg-teal-600 text-white py-3 rounded-xl font-bold hover:bg-teal-700 transition shadow-md"
                >
                  Trò chuyện ngay
                </button>
              </div>
            </div>
          </div>
        );
      case 'PRACTICE':
        return (
          <div className="max-w-4xl mx-auto">
            {selectedReaction ? (
              <InteractiveBalancing 
                reaction={selectedReaction} 
                onClose={() => setSelectedReaction(null)} 
              />
            ) : (
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-teal-100">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-3xl font-extrabold text-teal-900">Thực Hành Cân Bằng</h2>
                  <div className="p-2 bg-teal-50 rounded-lg text-teal-700 text-xs font-bold uppercase tracking-widest">4 Bước thăng bằng e</div>
                </div>
                <p className="text-slate-600 mb-8">Chọn một phương trình để rèn luyện kỹ năng cân bằng tương tác cùng AI.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {PRACTICE_EXAMPLES.map((ex, idx) => (
                    <div key={idx} className="p-8 bg-white border border-slate-100 rounded-[2rem] shadow-sm hover:shadow-xl hover:border-teal-400 transition-all duration-300 group cursor-pointer" 
                      onClick={() => setSelectedReaction(ex)}
                    >
                      <div className="flex justify-between items-start mb-6">
                        <span className={`px-3 py-1 text-[9px] font-black rounded-full uppercase tracking-widest ${
                          ex.difficulty === 'Khó' ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'
                        }`}>
                          {ex.difficulty}
                        </span>
                      </div>
                      <p className="math-font text-xl font-bold text-slate-800 mb-6 group-hover:text-teal-700 transition">
                        {ex.equation}
                      </p>
                      <div className="flex items-center text-teal-600 text-sm font-bold uppercase tracking-wider space-x-2">
                        <span>Bắt đầu</span>
                        <svg className="w-5 h-5 transform group-hover:translate-x-1 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      case 'CHAT':
        return (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-teal-50 p-6 rounded-2xl border border-teal-100 mb-4">
              <h2 className="text-xl font-bold text-teal-800 flex items-center">
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
                AI Tutor - Giải Đáp Mọi Câu Hỏi Hóa Học
              </h2>
              <p className="text-sm text-teal-700 mt-1">Dán phương trình bạn cần cân bằng hoặc hỏi bất kỳ quy tắc nào bạn còn chưa rõ.</p>
            </div>
            <RedoxChat />
          </div>
        );
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      {renderContent()}
    </Layout>
  );
};

export default App;
