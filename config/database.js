const mongoose = require('mongoose');
const { database } = require('./config');

module.exports = async () => {
  try {
    const connect = await mongoose.connect(database, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    console.log(`connected to database.`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
