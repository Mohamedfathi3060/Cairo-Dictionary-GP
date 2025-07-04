const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

// const instructionPrompt = `
// انت خبير في اللغة العربية. سأعطيك جملة باللغة العربية،
// وأريد منك تصحيحها لغويًا وإضافة التشكيل الصحيح لها.
// أرجو أن تعيد الجملة فقط بعد التصحيح والتشكيل، بدون أي شرح.
// `;
const instructionPrompt = `أنت خبير في اللغة العربية. سأعطيك جملة باللغة العربية، وأريد منك تصحيحها لغويًا وإضافة التشكيل الصحيح لها.

أعد لي الجواب بصيغة JSON يحتوي على 3 أشياء فقط:
1. "corrected": الجملة بعد التصحيح والتشكيل الكامل.
2. "deleted": الكلمة أو الكلمات التي حُذِفت (إن وُجدت).
3. "changes":   الكلمات المتعدلة قبل و بعد التعديل (بدون اعتبار التشكيل في المقارنة).
مثال
{
    "corrected": "الجملة بعد التعديل",
    "deleted":["محذوف1"  , "محذوف2"],
    "changes": [
        {
            "before": "قبل",
            "after": "بعد"
        },
        {
            "before": "قبل",
            "after": "بعد"
        }
    ]
}
`;

router.post('/', async (req, res) => {
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({
      status: 'error',
      message: `Missing 'text' in request body.`,
    });
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `${instructionPrompt}\n\nالجملة: ${text}`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const correctedText = response.text().trim();

    const raw = correctedText;

    const cleaned = raw.replace(/^```json\s*/, '').replace(/```$/, '');
    res.set('Content-Type', 'application/json');
    res.send(cleaned);
  } catch (error) {
    console.error('Error correcting Arabic text:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to process the request.',
    });
  }
});

module.exports = router;
