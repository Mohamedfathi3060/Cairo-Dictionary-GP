const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const mongoose = require('mongoose');
const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');
const cloudinary = require('cloudinary').v2;
const Question = require('../Models/questionModel');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const MONGO_URI = process.env.DATABASE;

const IMAGES_DIR =
  'M:\\CONTENT OF FCAI\\FCAI_CONTENT\\YEAR 4\\GP\\Gamification';

async function uploadImage(imageName, category) {
  const filePath = path.join(IMAGES_DIR, `${category}\\${imageName}.jpg`);
  try {
    const res = await cloudinary.uploader.upload(filePath, {
      folder: 'questions',
      public_id: imageName,
      use_filename: false,
      overwrite: false,
    });
    return res.secure_url;
  } catch (err) {
    console.error(`Failed to upload ${imageName}:`, err);
    return null;
  }
}

async function seed() {
  await mongoose.connect(MONGO_URI);
  console.log('Connected to MongoDB');

  const rows = [];
  fs.createReadStream(
    'M:\\CONTENT OF FCAI\\FCAI_CONTENT\\YEAR 4\\GP\\Gamification\\questions.csv'
  )
    .pipe(csv())
    .on('data', (row) => rows.push(row))
    .on('end', async () => {
      try {
        await Question.deleteMany({});

        const docs = [];
        for (const row of rows) {
          const {
            القسم: category,
            السؤال: question,
            'الخيار 1': o1,
            'الخيار 2': o2,
            'الخيار 3': o3,
            'الإجابة الصحيحة': ans,
          } = row;
          const image = await uploadImage(question, category);
          if (!image) continue;

          docs.push({
            category,
            question,
            image,
            options: [o1, o2, o3, ans],
            correctAnswer: ans,
          });
        }

        await Question.insertMany(docs);
        console.log(`Seeded ${docs.length} questions!`);
      } catch (err) {
        console.error(err);
      } finally {
        mongoose.disconnect();
      }
    });
}

seed();
