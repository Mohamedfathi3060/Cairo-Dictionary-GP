const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const wordRouter = require("./routers/wordRouter");
const userRouter = require("./routers/userRouter");

app.use(express.json());

app.use("/api/v1/Word", wordRouter);
app.use("/api/v1/Auth", userRouter);

// login => return getAssignedWords
// getWordData ID => {}
// postWordData => save

app.listen(3333, () => {
  console.log("server is waiting for requests");
});
