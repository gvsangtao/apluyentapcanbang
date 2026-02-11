
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: any) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-teal-700 text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="bg-white p-1 rounded-lg">
              <svg className="w-8 h-8 text-teal-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.618.309a6 6 0 01-3.86.517l-2.387-.477a2 2 0 00-1.022.547l-1.168 1.168a2 2 0 01-1.788.547l-1.091-.218a2 2 0 00-2.122 2.122l.218 1.091a2 2 0 01-.547 1.788l-1.168 1.168a2 2 0 00.547 3.428l1.091.218a2 2 0 011.788.547l1.168 1.168a2 2 0 003.428-.547l.218-1.091a2 2 0 01.547-1.788l1.168-1.168a2 2 0 00-.547-3.428l-1.091-.218z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold tracking-tight">RedoxMaster</h1>
          </div>
          <nav className="hidden md:flex space-x-6 font-medium">
            <button 
              onClick={() => setActiveTab('LEARN')}
              className={`hover:text-teal-200 transition ${activeTab === 'LEARN' ? 'border-b-2 border-white' : ''}`}
            >
              Học Tập
            </button>
            <button 
              onClick={() => setActiveTab('PRACTICE')}
              className={`hover:text-teal-200 transition ${activeTab === 'PRACTICE' ? 'border-b-2 border-white' : ''}`}
            >
              Thực Hành
            </button>
            <button 
              onClick={() => setActiveTab('CHAT')}
              className={`hover:text-teal-200 transition ${activeTab === 'CHAT' ? 'border-b-2 border-white' : ''}`}
            >
              AI Tutor
            </button>
          </nav>
        </div>
      </header>

      <main className="flex-grow max-w-6xl mx-auto w-full px-4 py-8">
        {children}
      </main>

      <footer className="bg-slate-800 text-slate-400 py-6 text-center text-sm">
        <div className="max-w-6xl mx-auto px-4">
          <p>© 2024 RedoxMaster - Công cụ học tập Hóa học 10</p>
          <div className="flex justify-center space-x-4 mt-2">
            <button onClick={() => setActiveTab('LEARN')}>Bài giảng</button>
            <button onClick={() => setActiveTab('CHAT')}>Hỏi đáp AI</button>
          </div>
        </div>
      </footer>

      {/* Mobile Nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-teal-100 flex justify-around py-3 px-2 z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
        <button onClick={() => setActiveTab('LEARN')} className={`flex flex-col items-center space-y-1 ${activeTab === 'LEARN' ? 'text-teal-600 font-bold' : 'text-slate-400'}`}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
          <span className="text-[10px]">Học Tập</span>
        </button>
        <button onClick={() => setActiveTab('PRACTICE')} className={`flex flex-col items-center space-y-1 ${activeTab === 'PRACTICE' ? 'text-teal-600 font-bold' : 'text-slate-400'}`}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
          <span className="text-[10px]">Thực Hành</span>
        </button>
        <button onClick={() => setActiveTab('CHAT')} className={`flex flex-col items-center space-y-1 ${activeTab === 'CHAT' ? 'text-teal-600 font-bold' : 'text-slate-400'}`}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
          <span className="text-[10px]">AI Tutor</span>
        </button>
      </div>
    </div>
  );
};

export default Layout;
