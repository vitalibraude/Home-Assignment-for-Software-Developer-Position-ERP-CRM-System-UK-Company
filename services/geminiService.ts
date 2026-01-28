
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getBusinessInsights = async (context: any) => {
  const prompt = `אתה עוזר עסקי חכם במערכת ERP. 
  הנה נתונים מהמערכת: ${JSON.stringify(context)}.
  נתח את הנתונים ותן 3 תובנות עסקיות קצרות וחשובות בעברית (למשל: מוצרים במלאי נמוך, לקוחות עם חוב גבוה, או מגמות מכירה).
  החזר את התשובה כטקסט פשוט עם בולטים.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("AI Insights Error:", error);
    return "לא ניתן היה להפיק תובנות כרגע.";
  }
};

export const chatWithERP = async (history: any[], query: string, context: any) => {
  const prompt = `אתה עוזר חכם למערכת ה-ERP "Priority-Next". 
  הנתונים הנוכחיים של המערכת: ${JSON.stringify(context)}.
  המשתמש שואל: "${query}". 
  ענה בצורה מקצועית, עסקית וממצה בעברית.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("AI Chat Error:", error);
    return "מצטער, חלה שגיאה בחיבור לעוזר הווירטואלי.";
  }
};
