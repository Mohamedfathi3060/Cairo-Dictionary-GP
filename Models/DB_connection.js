const mongoose = require("mongoose");

// coneect to DB
mongoose
  .connect(process.env.DATABASE, {
    serverApi: { version: "1", strict: true, deprecationErrors: true },
  })
  .then((con) => {
    console.log(`DB Connected Succssfully`);
  });
