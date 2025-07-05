const express = require('express');
const app = express();

const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

// connect to DB
require('./Models/DB_connection');

const cors = require('cors');
const cookieParser = require('cookie-parser');

const wordRouter = require('./routers/wordRouter');
const verbRouter = require('./routers/verbRouter');
const userRouter = require('./routers/userRouter');
const suggestedTermRouter = require('./routers/suggestTermRouter');
const elasticRouter = require('./routers/elasticRouter');
const dropDownRouter = require('./routers/dropDownRouter');
const verbDropDownRouter = require('./routers/verbDropDownRouter');
const uploadRouter = require('./routers/uploadRouter');
const geminiRouter = require('./routers/geminiRouter');
const questionRouter = require('./routers/questionRouter');
const functionalWordRouter = require('./routers/functionalWordRouter');

const allowedOrigins = [
  'https://cairodictionaryv2-git-main-moazs-projects-de2486f1.vercel.app',
  'http://localhost:3000',
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);
app.use(cookieParser());

app.use(express.static('public'));
app.use(express.json());

app.use('/api/v1/Auth', userRouter);

app.use('/api/v1/Word', wordRouter);
app.use('/api/v1/Verb', verbRouter);
app.use('/api/v1/FunctionalWord', functionalWordRouter);

app.use('/api/v1/dropdown', dropDownRouter);
app.use('/api/v1/verbDropDown', verbDropDownRouter);

app.use('/api/v1/upload', uploadRouter);

app.use('/api/v1/search', elasticRouter);
app.use('/api/v1/term-generation', suggestedTermRouter);
app.use('/api/v1/text-correction', geminiRouter);

app.use('/api/v1/question', questionRouter);

app.listen(process.env.PORT, () => {
  console.log('server is waiting for requests');
});
