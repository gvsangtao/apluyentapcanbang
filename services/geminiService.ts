
import { GoogleGenAI, Type } from "@google/genai";
import { Message, ValidationResult } from "../types";

const SYSTEM_INSTRUCTION = `
Bạn là một giáo viên Hóa học chuyên gia về Phản ứng Oxi hóa - Khử. 
Nhiệm vụ của bạn là kiểm tra xem học sinh thực hiện các bước cân bằng có đúng hay không.
Các bước bao gồm:
1. Xác định số oxi hóa và chất khử/oxi hóa.
2. Viết quá trình nhường/nhận e.
3. Tìm hệ số thăng bằng.
4. Hoàn thành phương trình.

Phản hồi phải ở định dạng JSON với cấu trúc:
{
  "isCorrect": boolean,
  "feedback": "lời giải thích ngắn gọn",
  "hint": "gợi ý nếu sai"
}
Luôn trả lời bằng tiếng Việt.
`;

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  async validateStep(equation: string, stepId: number, userInput: string): Promise<ValidationResult> {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Phương trình: ${equation}. 
        Bước ${stepId}: Người dùng nhập "${userInput}". 
        Hãy kiểm tra xem bước này đã chính xác chưa. 
        Nếu là bước 4, kiểm tra các hệ số đã tối giản và thăng bằng chưa.`,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              isCorrect: { type: Type.BOOLEAN },
              feedback: { type: Type.STRING },
              hint: { type: Type.STRING }
            },
            required: ["isCorrect", "feedback"]
          }
        }
      });

      const result = JSON.parse(response.text || '{}');
      return {
        isCorrect: result.isCorrect || false,
        feedback: result.feedback || "Có lỗi khi kiểm tra.",
        hint: result.hint
      };
    } catch (error) {
      console.error("Gemini Validation Error:", error);
      return { isCorrect: false, feedback: "Không thể kết nối với AI để kiểm tra." };
    }
  }

  async sendMessage(history: Message[], userInput: string): Promise<string> {
    try {
      const aiInstance = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const response = await aiInstance.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [
          ...history.map(m => ({ role: m.role, parts: [{ text: m.text }] })),
          { role: 'user', parts: [{ text: userInput }] }
        ],
        config: {
          systemInstruction: "Bạn là giáo viên Hóa học chuyên về Redox. Hãy giải đáp thân thiện, sử dụng Markdown.",
          temperature: 0.7,
        }
      });
      return response.text || "Xin lỗi, mình gặp chút trục trặc.";
    } catch (error) {
      return "Có lỗi xảy ra.";
    }
  }
}

export const geminiService = new GeminiService();
