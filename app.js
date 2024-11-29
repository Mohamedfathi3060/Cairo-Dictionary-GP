const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config({ path: "./config.env" });
const wordRouter = require("./routers/wordRouter");
const verbRouter = require("./routers/verbRouter");
const userRouter = require("./routers/userRouter");
const dropDownRouter = require("./routers/dropDownRouter");
const uploadRouter = require("./routers/uploadRouter");
const VerbModel = require("./Models/verbModel");


app.use(cors());

app.use(express.static("public"));
app.use(express.json());

app.use("/api/v1/Word", wordRouter);
app.use("/api/v1/Verb", verbRouter);
app.use("/api/v1/Auth", userRouter);
app.use("/api/v1/dropdown", dropDownRouter);
app.use("/api/v1/upload", uploadRouter);

app.listen(process.env.PORT, () => {
  console.log("server is waiting for requests");
});
