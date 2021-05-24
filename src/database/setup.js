const mongoose = require("mongoose");
// const connectionString = "mongodb://localhost:27017/eventmanager";
const connectionString =
  "mongodb+srv://a:b@gettingstarted.j15vb.mongodb.net/eventManager?retryWrites=true&w=majority";

module.exports = () => {
  mongoose.connect(
    connectionString,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    },
    (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("database connection successful");
      }
    }
  );
};
