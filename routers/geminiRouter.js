const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

const instructionPrompt = `
انت خبير في اللغة العربية. سأعطيك جملة باللغة العربية، 
وأريد منك تصحيحها لغويًا وإضافة التشكيل الصحيح لها. 
أرجو أن تعيد الجملة فقط بعد التصحيح والتشكيل، بدون أي شرح.
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

    res.json({
      status: 'success',
      data: {
        corrected: correctedText,
      },
    });
  } catch (error) {
    console.error('Error correcting Arabic text:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to process the request.',
    });
  }
});

module.exports = router;
