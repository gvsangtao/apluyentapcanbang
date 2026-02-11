
import React from 'react';
import { LessonStep } from './types';

export const LESSONS = [
  {
    id: LessonStep.OxidationState,
    title: 'I. Số Oxi Hóa',
    content: (
      <div className="space-y-4">
        <section>
          <h3 className="font-bold text-teal-800 underline">1. Khái niệm</h3>
          <p className="p-3 bg-white rounded-lg border-l-4 border-teal-500 shadow-sm italic">
            "Số oxi hoá là điện tích quy ước của nguyên tử nguyên tố đó nếu giả định cặp electron chung thuộc hẳn về nguyên tử của nguyên tố có độ âm điện lớn hơn."
          </p>
          <div className="mt-2 text-sm text-slate-600">
            Cách viết: Dấu trước, số sau (ví dụ: +1, -2). Viết ở phía trên kí hiệu nguyên tố.
          </div>
        </section>

        <section>
          <h3 className="font-bold text-teal-800 underline">2. Các Quy Tắc Xác Định</h3>
          <ul className="list-decimal pl-5 space-y-2">
            <li><strong>Quy tắc 1:</strong> Đơn chất bằng 0. <span className="text-teal-600">(Cl₂, O₂, Na...)</span></li>
            <li><strong>Quy tắc 2:</strong> Trong phân tử, tổng số oxi hóa bằng 0.</li>
            <li><strong>Quy tắc 3:</strong> Trong ion đơn nguyên tử = điện tích ion. Ion đa nguyên tử: Tổng số oxi hóa = điện tích ion.</li>
            <li><strong>Quy tắc 4:</strong>
              <ul className="list-disc pl-5 mt-1 text-sm">
                <li>H luôn là +1 (trừ hydride kim loại).</li>
                <li>O luôn là -2 (trừ OF₂, peroxide...).</li>
                <li>Kim loại IA: +1; IIA: +2; Al: +3.</li>
                <li>F trong hợp chất luôn là -1.</li>
              </ul>
            </li>
          </ul>
        </section>
      </div>
    )
  },
  {
    id: LessonStep.RedoxConcept,
    title: 'II. Phản Ứng Oxi Hóa - Khử',
    content: (
      <div className="space-y-4">
        <p>Phản ứng oxi hoá – khử là phản ứng hoá học, trong đó có sự chuyển dịch electron giữa các chất phản ứng.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-orange-50 rounded-xl border border-orange-200">
            <h4 className="font-bold text-orange-800">Chất Khử</h4>
            <ul className="text-sm mt-2 space-y-1">
              <li>• Nhường electron</li>
              <li>• Số oxi hóa TĂNG</li>
              <li>• Bị oxi hóa</li>
            </ul>
          </div>
          <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
            <h4 className="font-bold text-blue-800">Chất Oxi Hóa</h4>
            <ul className="text-sm mt-2 space-y-1">
              <li>• Nhận electron</li>
              <li>• Số oxi hóa GIẢM</li>
              <li>• Bị khử</li>
            </ul>
          </div>
        </div>
        <p className="text-sm font-medium text-center bg-teal-100 p-2 rounded">CÂU THẦN CHÚ: "Khử cho - O nhận"</p>
      </div>
    )
  },
  {
    id: LessonStep.BalancingSteps,
    title: 'III. Lập Phương Trình (Thăng bằng e)',
    content: (
      <div className="space-y-4">
        <div className="bg-teal-900 text-white p-4 rounded-lg shadow-inner">
          <p className="font-bold text-teal-200">Nguyên tắc: Σe nhường = Σe nhận</p>
        </div>
        <ol className="list-decimal pl-5 space-y-4">
          <li>
            <span className="font-bold">Bước 1:</span> Xác định số oxi hoá các nguyên tử thay đổi. Xác định chất khử, chất oxi hoá.
          </li>
          <li>
            <span className="font-bold">Bước 2:</span> Viết các quá trình oxi hoá và quá trình khử.
          </li>
          <li>
            <span className="font-bold">Bước 3:</span> Tìm hệ số sao cho tổng e nhường = tổng e nhận (BCSCNN).
          </li>
          <li>
            <span className="font-bold">Bước 4:</span> Đặt hệ số vào phương trình. Cân bằng theo thứ tự: 
            <div className="text-sm mt-1 text-teal-700 italic">Kim loại → Gốc acid → Môi trường → Nước (H)</div>
          </li>
        </ol>
      </div>
    )
  }
];

export const PRACTICE_EXAMPLES = [
  { 
    equation: "H₂S + O₂ → SO₂ + H₂O", 
    difficulty: "Cơ bản",
    atoms: ["S", "O"],
    step2Data: { ox: "S(-2) → S(+4)", red: "O2(0) → 2O(-2)" }
  },
  { 
    equation: "Mg + HCl → MgCl₂ + H₂", 
    difficulty: "Cơ bản",
    atoms: ["Mg", "H"],
    step2Data: { ox: "Mg(0) → Mg(+2)", red: "2H(+1) → H2(0)" }
  },
  { 
    equation: "Al + O₂ → Al₂O₃", 
    difficulty: "Cơ bản",
    atoms: ["Al", "O"],
    step2Data: { ox: "Al(0) → Al(+3)", red: "O2(0) → 2O(-2)" }
  },
  { 
    equation: "Fe + Cl₂ → FeCl₃", 
    difficulty: "Cơ bản",
    atoms: ["Fe", "Cl"],
    step2Data: { ox: "Fe(0) → Fe(+3)", red: "Cl2(0) → 2Cl(-1)" }
  },
  { 
    equation: "Zn + CuSO₄ → ZnSO₄ + Cu", 
    difficulty: "Cơ bản",
    atoms: ["Zn", "Cu"],
    step2Data: { ox: "Zn(0) → Zn(+2)", red: "Cu(+2) → Cu(0)" }
  },
  { 
    equation: "Cu + H₂SO₄ (đặc) → CuSO₄ + SO₂ + H₂O", 
    difficulty: "Trung bình",
    atoms: ["Cu", "S"],
    step2Data: { ox: "Cu(0) → Cu(+2)", red: "S(+6) → S(+4)" }
  },
  { 
    equation: "Ag + HNO₃ (đặc) → AgNO₃ + NO₂ + H₂O", 
    difficulty: "Trung bình",
    atoms: ["Ag", "N"],
    step2Data: { ox: "Ag(0) → Ag(+1)", red: "N(+5) → N(+4)" }
  },
  { 
    equation: "MnO₂ + HCl → MnCl₂ + Cl₂ + H₂O", 
    difficulty: "Trung bình",
    atoms: ["Mn", "Cl"],
    step2Data: { ox: "2Cl(-1) → Cl2(0)", red: "Mn(+4) → Mn(+2)" }
  },
  { 
    equation: "Fe + H₂SO₄ (đặc) → Fe₂(SO₄)₃ + SO₂ + H₂O", 
    difficulty: "Trung bình",
    atoms: ["Fe", "S"],
    step2Data: { ox: "Fe(0) → Fe(+3)", red: "S(+6) → S(+4)" }
  },
  { 
    equation: "Cu + HNO₃ → Cu(NO₃)₂ + NO + H₂O", 
    difficulty: "Trung bình",
    atoms: ["Cu", "N"],
    step2Data: { ox: "Cu(0) → Cu(+2)", red: "N(+5) → N(+2)" }
  },
  { 
    equation: "FeO + HNO₃ → Fe(NO₃)₃ + NO + H₂O", 
    difficulty: "Trung bình",
    atoms: ["Fe", "N"],
    step2Data: { ox: "Fe(+2) → Fe(+3)", red: "N(+5) → N(+2)" }
  },
  { 
    equation: "NH₃ + O₂ → NO + H₂O", 
    difficulty: "Trung bình",
    atoms: ["N", "O"],
    step2Data: { ox: "N(-3) → N(+2)", red: "O2(0) → 2O(-2)" }
  },
  { 
    equation: "C + H₂SO₄ (đặc) → CO₂ + SO₂ + H₂O", 
    difficulty: "Trung bình",
    atoms: ["C", "S"],
    step2Data: { ox: "C(0) → C(+4)", red: "S(+6) → S(+4)" }
  },
  { 
    equation: "S + HNO₃ (đặc) → H₂SO₄ + NO₂ + H₂O", 
    difficulty: "Trung bình",
    atoms: ["S", "N"],
    step2Data: { ox: "S(0) → S(+6)", red: "N(+5) → N(+4)" }
  },
  { 
    equation: "P + KClO₃ → P₂O₅ + KCl", 
    difficulty: "Trung bình",
    atoms: ["P", "Cl"],
    step2Data: { ox: "P(0) → P(+5)", red: "Cl(+5) → Cl(-1)" }
  },
  { 
    equation: "Cl₂ + NaOH → NaCl + NaClO + H₂O", 
    difficulty: "Khó (Tự oxi hóa khử)",
    atoms: ["Cl", "Cl"],
    step2Data: { ox: "Cl(0) → Cl(+1)", red: "Cl(0) → Cl(-1)" }
  },
  { 
    equation: "KMnO₄ + HCl → KCl + MnCl₂ + Cl₂ + H₂O", 
    difficulty: "Khó",
    atoms: ["Mn", "Cl"],
    step2Data: { ox: "2Cl(-1) → Cl2(0)", red: "Mn(+7) → Mn(+2)" }
  },
  { 
    equation: "Fe₃O₄ + HNO₃ → Fe(NO₃)₃ + NO + H₂O", 
    difficulty: "Khó",
    atoms: ["Fe", "N"],
    step2Data: { ox: "3Fe(+8/3) → 3Fe(+3)", red: "N(+5) → N(+2)" }
  },
  { 
    equation: "FeS₂ + O2 → Fe₂O₃ + SO₂", 
    difficulty: "Khó",
    atoms: ["FeS2", "O"],
    step2Data: { ox: "FeS2 → Fe(+3) + 2S(+4)", red: "O2(0) → 2O(-2)" }
  },
  { 
    equation: "Al + HNO₃ → Al(NO₃)₃ + N₂O + H₂O", 
    difficulty: "Khó",
    atoms: ["Al", "N"],
    step2Data: { ox: "Al(0) → Al(+3)", red: "2N(+5) → N2(+1)" }
  },
  { 
    equation: "Zn + HNO₃ → Zn(NO₃)₂ + NH₄NO₃ + H₂O", 
    difficulty: "Khó",
    atoms: ["Zn", "N"],
    step2Data: { ox: "Zn(0) → Zn(+2)", red: "N(+5) → N(-3)" }
  },
  { 
    equation: "KClO₃ → KCl + O₂", 
    difficulty: "Trung bình",
    atoms: ["Cl", "O"],
    step2Data: { ox: "2O(-2) → O2(0)", red: "Cl(+5) → Cl(-1)" }
  },
  { 
    equation: "FeS + HNO₃ → Fe(NO₃)₃ + NO + H₂SO₄ + H₂O", 
    difficulty: "Rất khó",
    atoms: ["FeS", "N"],
    step2Data: { ox: "FeS → Fe(+3) + S(+6)", red: "N(+5) → N(+2)" }
  },
  { 
    equation: "As₂S₃ + HNO₃ + H₂O → H₃AsO₄ + H₂SO₄ + NO", 
    difficulty: "Rất khó",
    atoms: ["As2S3", "N"],
    step2Data: { ox: "As2S3 → 2As(+5) + 3S(+6)", red: "N(+5) → N(+2)" }
  }
];
