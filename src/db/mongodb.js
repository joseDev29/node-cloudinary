const mongoose = require("mongoose");
const { db } = require("../config");

const uri = `mongodb://${db.mongoHost}/${db.mongoDBName}`;

mongoose
  .connect(uri, {
    useNewUrlParser: true,
  })
  .then((db) => console.log("DB is connected"))
  .catch((err) => console.error("---New Error: ", err));
