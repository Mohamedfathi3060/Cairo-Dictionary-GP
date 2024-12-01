const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

// connect to DB
require("./Models/DB_connection");

const cors = require("cors");
const wordRouter = require("./routers/wordRouter");
const verbRouter = require("./routers/verbRouter");
const userRouter = require("./routers/userRouter");
const dropDownRouter = require("./routers/dropDownRouter");
const verbDropDownRouter = require("./routers/verbDropDownRouter");
const uploadRouter = require("./routers/uploadRouter");
const VerbModel = require("./Models/verbModel");

const functionalWordRouter = require("./routers/functionalWordRouter");

app.use(cors());

app.use(express.static("public"));
app.use(express.json());

app.use("/api/v1/Auth", userRouter);

app.use("/api/v1/Word", wordRouter);
app.use("/api/v1/Verb", verbRouter);
app.use("/api/v1/FunctionalWord", functionalWordRouter);

app.use("/api/v1/dropdown", dropDownRouter);
app.use("/api/v1/verbDropDown", verbDropDownRouter);

app.use("/api/v1/upload", uploadRouter);

app.listen(process.env.PORT, () => {
  console.log("server is waiting for requests");
});
