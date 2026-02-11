
import React, { useState, useRef, useEffect } from 'react';
import { geminiService } from '../services/geminiService';
import { Message } from '../types';

const RedoxChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Chào bạn! Mình là AI Tutor. Bạn cần hỗ trợ gì về phản ứng Oxi hóa - Khử không?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const response = await geminiService.sendMessage(messages, input);
    
    setMessages(prev => [...prev, { role: 'model', text: response }]);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-[70vh] bg-white rounded-2xl shadow-xl overflow-hidden border border-teal-100">
      <div className="bg-teal-600 text-white p-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-teal-400 rounded-full flex items-center justify-center animate-pulse">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <p className="font-bold text-sm">Gemini AI Tutor</p>
            <p className="text-[10px] text-teal-100">Chuyên gia Hóa học 10</p>
          </div>
        </div>
      </div>

      <div ref={scrollRef} className="flex-grow overflow-y-auto p-4 space-y-4 bg-slate-50">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
              msg.role === 'user' 
                ? 'bg-teal-600 text-white rounded-tr-none shadow-md' 
                : 'bg-white text-slate-800 rounded-tl-none border border-slate-200 shadow-sm'
            }`}>
              <div className="whitespace-pre-wrap leading-relaxed">{msg.text}</div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-slate-200 flex space-x-1 items-center">
              <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce delay-100"></div>
              <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce delay-200"></div>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-white border-t border-slate-100">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ví dụ: Cân bằng Cu + HNO3 loãng..."
            className="flex-grow px-4 py-2 bg-slate-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
          />
          <button
            onClick={handleSend}
            disabled={isLoading}
            className="bg-teal-600 text-white p-2 rounded-full hover:bg-teal-700 transition shadow-lg disabled:opacity-50"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RedoxChat;
