const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose.connect(process.env.DB_LOCAL_URL).then((con) => {
    console.log("mongoDB connected");
  });
};

module.exports = connectDatabase;
