const mongoose = require("mongoose");

const connectDB = () => {
  mongoose
    .connect(process.env.DB)
    .then(() => console.log(`✅ - Sunucu MONGO DB'ye Bağlandı!`))
    .catch(() =>
      console.log(`❎ - Sunucu MONGO DB'ye Bağlanırken Hata İle Karşılaştı!`)
    );
};

module.exports = connectDB;
