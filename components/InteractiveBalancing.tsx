
import React, { useState, useEffect } from 'react';
import { geminiService } from '../services/geminiService';
import { BalancingStepId, ValidationResult } from '../types';

interface Props {
  reaction: any;
  onClose: () => void;
}

const InteractiveBalancing: React.FC<Props> = ({ reaction, onClose }) => {
  const [step, setStep] = useState<BalancingStepId>(1);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ValidationResult | null>(null);

  // Form states
  const [step1States, setStep1States] = useState<Record<string, { before: string, after: string }>>({});
  const [step2States, setStep2States] = useState({ oxE: '', redE: '' });
  const [step3States, setStep3States] = useState({ multOx: '', multRed: '' });
  const [step4Equation, setStep4Equation] = useState('');

  // Auto-fill placeholders for Step 1 based on reaction atoms
  useEffect(() => {
    const initial: Record<string, { before: string, after: string }> = {};
    reaction.atoms.forEach((atom: string) => {
      initial[atom] = { before: '', after: '' };
    });
    setStep1States(initial);
  }, [reaction]);

  const handleCheck = async () => {
    setIsLoading(true);
    setResult(null);

    let payload = "";
    if (step === 1) payload = JSON.stringify(step1States);
    if (step === 2) payload = `Oxi hóa nhường ${step2States.oxE}e, Khử nhận ${step2States.redE}e`;
    if (step === 3) payload = `Nhân quá trình oxi hóa cho ${step3States.multOx}, khử cho ${step3States.multRed}`;
    if (step === 4) payload = step4Equation;

    const validation = await geminiService.validateStep(reaction.equation, step, payload);
    setResult(validation);

    // Simulate API delay for better UX as seen in screenshot
    setTimeout(() => {
      setResult(validation);
      setIsLoading(false);
    }, 800);
  };

  const nextStep = () => {
    if (step < 4) {
      setStep((s) => (s + 1) as BalancingStepId);
      setResult(null);
    } else {
      onClose();
    }
  };

  const resetAll = () => {
    setStep(1);
    setResult(null);
    setStep2States({ oxE: '', redE: '' });
    setStep3States({ multOx: '', multRed: '' });
    setStep4Equation('');
  };

  return (
    <div className="bg-white rounded-3xl shadow-2xl border border-teal-100 overflow-hidden max-w-4xl mx-auto">
      {/* Header with Progress Bar */}
      <div className="p-6 border-b border-slate-50">
        <div className="flex items-center justify-between mb-2">
          <div className="flex flex-grow justify-around relative items-center px-10">
            <div className="absolute h-[2px] bg-slate-100 left-20 right-20 top-5 -z-0"></div>
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="flex flex-col items-center z-10">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                  step === s ? 'bg-teal-600 text-white shadow-lg scale-110' : 
                  step > s ? 'bg-teal-100 text-teal-600 border border-teal-200' : 'bg-white text-slate-300 border border-slate-200'
                }`}>
                  {step > s ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                  ) : s}
                </div>
                <span className={`text-[11px] mt-2 font-semibold ${step === s ? 'text-teal-700' : 'text-slate-400'}`}>
                  Bước {s}
                </span>
              </div>
            ))}
          </div>
          <button onClick={resetAll} className="p-2 text-slate-400 hover:text-teal-600 transition" title="Làm lại">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-8 min-h-[450px] bg-white">
        {/* Sticky Equation Bar for all steps */}
        <div className="mb-6 bg-slate-50 p-4 rounded-2xl border border-slate-100 flex flex-col items-center">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Phương trình đang cân bằng:</span>
          <div className="math-font text-lg font-bold text-teal-900 tracking-wide text-center">
            {reaction.equation}
          </div>
        </div>

        {step === 1 && (
          <div className="animate-fadeIn">
            <h2 className="text-2xl font-bold text-teal-900 mb-2">Bước 1: Xác định số oxi hoá</h2>
            <p className="text-slate-500 mb-6">Xác định số oxi hoá của các nguyên tử có sự thay đổi trong phản ứng.</p>
            
            <div className="space-y-4">
              {reaction.atoms.map((atom: string) => (
                <div key={atom} className="bg-teal-50/50 p-6 rounded-2xl flex items-center space-x-8 border border-teal-50/50">
                  <div className="text-2xl font-bold text-teal-800 w-12">{atom}</div>
                  <div className="flex-grow grid grid-cols-2 gap-8 items-center">
                    <div className="relative">
                      <span className="absolute -top-6 left-0 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Trước PỨ</span>
                      <input 
                        type="text" 
                        value={step1States[atom]?.before || ''}
                        onChange={(e) => setStep1States({...step1States, [atom]: {...step1States[atom], before: e.target.value}})}
                        className="w-full bg-white border border-teal-100 rounded-xl px-4 py-3 text-center font-bold text-teal-700 focus:ring-2 focus:ring-teal-500 outline-none" 
                        placeholder="0"
                      />
                    </div>
                    <div className="relative flex items-center">
                      <svg className="absolute -left-6 w-4 h-4 text-teal-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                      <span className="absolute -top-6 left-0 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Sau PỨ</span>
                      <input 
                        type="text" 
                        value={step1States[atom]?.after || ''}
                        onChange={(e) => setStep1States({...step1States, [atom]: {...step1States[atom], after: e.target.value}})}
                        className="w-full bg-white border border-teal-100 rounded-xl px-4 py-3 text-center font-bold text-teal-700 focus:ring-2 focus:ring-teal-500 outline-none" 
                        placeholder="+2"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="animate-fadeIn">
            <h2 className="text-2xl font-bold text-teal-900 mb-2">Bước 2: Viết quá trình Oxi hoá & Khử</h2>
            <p className="text-slate-500 mb-6">Viết các nửa phản ứng và xác định số electron nhường/nhận.</p>

            <div className="space-y-6">
              <div className="bg-orange-50/30 p-8 rounded-3xl border border-orange-100 relative">
                <span className="text-orange-800 font-bold text-sm block mb-4">Quá trình Oxi hoá (Chất khử nhường e)</span>
                <div className="flex items-center space-x-3 text-lg font-medium text-slate-700">
                  <span className="math-font bg-white px-4 py-2 rounded-xl border border-orange-100">{reaction.step2Data.ox}</span>
                  <span>→</span>
                  <span className="text-slate-400 italic">Sản phẩm +</span>
                  <input 
                    type="text" 
                    value={step2States.oxE}
                    onChange={(e) => setStep2States({...step2States, oxE: e.target.value})}
                    className="w-20 bg-white border border-orange-200 rounded-xl px-3 py-2 text-center font-bold text-orange-700 outline-none focus:ring-2 focus:ring-orange-400" 
                    placeholder="?"
                  />
                  <span className="font-bold text-orange-800">e</span>
                </div>
              </div>

              <div className="bg-blue-50/30 p-8 rounded-3xl border border-blue-100">
                <span className="text-blue-800 font-bold text-sm block mb-4">Quá trình Khử (Chất oxi hoá nhận e)</span>
                <div className="flex items-center space-x-3 text-lg font-medium text-slate-700">
                  <span className="math-font bg-white px-4 py-2 rounded-xl border border-blue-100">{reaction.step2Data.red}</span>
                  <span>+</span>
                  <input 
                    type="text" 
                    value={step2States.redE}
                    onChange={(e) => setStep2States({...step2States, redE: e.target.value})}
                    className="w-20 bg-white border border-blue-200 rounded-xl px-3 py-2 text-center font-bold text-blue-700 outline-none focus:ring-2 focus:ring-blue-400" 
                    placeholder="?"
                  />
                  <span className="font-bold text-blue-800">e</span>
                  <span>→</span>
                  <span className="text-slate-400 italic">Sản phẩm khử</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="animate-fadeIn">
            <h2 className="text-2xl font-bold text-teal-900 mb-2">Bước 3: Xác định hệ số nhân</h2>
            <p className="text-slate-500 mb-6">Tìm bội chung nhỏ nhất để tổng số e nhường bằng tổng số e nhận.</p>

            <div className="bg-teal-50/30 p-10 rounded-3xl border border-teal-100 relative">
               <div className="flex justify-between items-center mb-8 px-4">
                  <div className="text-slate-500 text-sm">Số e nhường: <span className="font-bold text-teal-700">{step2States.oxE || '?'}</span></div>
                  <div className="text-slate-500 text-sm">Số e nhận: <span className="font-bold text-teal-700">{step2States.redE || '?'}</span></div>
               </div>
               <div className="h-1 bg-teal-200 w-full mb-12 relative">
                  <div className="absolute left-1/2 -translate-x-1/2 -top-4 bg-white border-2 border-teal-200 w-10 h-10 rounded-full flex items-center justify-center font-bold text-teal-600">x</div>
               </div>
               
               <div className="grid grid-cols-2 gap-12">
                  <div className="flex flex-col items-center">
                    <span className="text-[10px] font-bold text-slate-400 mb-2 uppercase">Nhân cho PỨ oxi hoá</span>
                    <input 
                      type="text"
                      value={step3States.multOx}
                      onChange={(e) => setStep3States({...step3States, multOx: e.target.value})}
                      className="w-full bg-white border border-teal-200 rounded-2xl py-6 text-center text-3xl font-bold text-teal-800 focus:ring-4 focus:ring-teal-500 outline-none shadow-sm"
                      placeholder="?"
                    />
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-[10px] font-bold text-slate-400 mb-2 uppercase">Nhân cho PỨ khử</span>
                    <input 
                      type="text"
                      value={step3States.multRed}
                      onChange={(e) => setStep3States({...step3States, multRed: e.target.value})}
                      className="w-full bg-white border border-teal-200 rounded-2xl py-6 text-center text-3xl font-bold text-teal-800 focus:ring-4 focus:ring-teal-500 outline-none shadow-sm"
                      placeholder="?"
                    />
                  </div>
               </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="animate-fadeIn">
            <h2 className="text-2xl font-bold text-teal-900 mb-2">Bước 4: Cân bằng phương trình</h2>
            <p className="text-slate-500 mb-6">Đặt hệ số vào sơ đồ và cân bằng các nguyên tử còn lại.</p>

            <div className="relative">
              <span className="text-[10px] font-bold text-slate-400 mb-2 block uppercase">Nhập phương trình sau khi đã cân bằng:</span>
              <textarea 
                value={step4Equation}
                onChange={(e) => setStep4Equation(e.target.value)}
                className="w-full p-6 bg-white border border-teal-100 rounded-3xl text-xl font-bold text-teal-900 math-font h-32 focus:ring-2 focus:ring-teal-500 outline-none shadow-sm resize-none"
                placeholder="Ví dụ: 2H2S + 3O2 -> 2SO2 + 2H2O"
              />
            </div>
          </div>
        )}

        {/* Results Feedback Area */}
        {result && (
          <div className={`mt-8 p-5 rounded-2xl flex items-start space-x-4 animate-slideIn ${result.isCorrect ? 'bg-emerald-50 text-emerald-800' : 'bg-rose-50 text-rose-800'}`}>
            <div className={`mt-1 p-1 rounded-full ${result.isCorrect ? 'bg-emerald-500' : 'bg-rose-500'} text-white`}>
              {result.isCorrect ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" /></svg>
              )}
            </div>
            <div>
              <p className="font-bold text-sm">{result.isCorrect ? 'Tuyệt vời! Bạn đã làm đúng.' : 'Vẫn chưa chính xác...'}</p>
              <p className="text-xs opacity-90 mt-1 leading-relaxed">{result.feedback}</p>
              {result.hint && !result.isCorrect && <p className="text-xs mt-2 italic font-medium">💡 Gợi ý: {result.hint}</p>}
            </div>
          </div>
        )}
      </div>

      {/* Footer Controls */}
      <div className="p-6 bg-white border-t border-slate-50 flex justify-end space-x-4">
        {!result?.isCorrect ? (
          <button
            onClick={handleCheck}
            disabled={isLoading}
            className="bg-teal-600 text-white px-8 py-3 rounded-2xl font-bold hover:bg-teal-700 active:scale-95 transition-all shadow-lg shadow-teal-600/20 disabled:opacity-50 flex items-center space-x-2"
          >
            {isLoading ? (
              <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            ) : null}
            <span>Kiểm tra đáp án</span>
          </button>
        ) : (
          <button
            onClick={nextStep}
            className="bg-teal-600 text-white px-8 py-3 rounded-2xl font-bold hover:bg-teal-700 active:scale-95 transition-all shadow-lg shadow-teal-600/20 flex items-center space-x-2"
          >
            <span>{step === 4 ? 'Hoàn thành' : 'Bước tiếp theo'}</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
          </button>
        )}
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideIn { from { opacity: 0; transform: translateX(-10px); } to { opacity: 1; transform: translateX(0); } }
        .animate-fadeIn { animation: fadeIn 0.4s ease-out; }
        .animate-slideIn { animation: slideIn 0.3s ease-out; }
      `}</style>
    </div>
  );
};

export default InteractiveBalancing;
