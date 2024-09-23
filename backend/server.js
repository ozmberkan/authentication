const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const Auth = require("./routes/auth.js");

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

connectDB();

app.use("/auth", Auth);

app.get("/", (req, res) => {
  res.send({ message: "Merhaba, Sunucu Çalışıyor!" });
});

app.listen(PORT, () => {
  console.log(`✅ - Sunucu ${PORT} Portu Üzerinde Koşuyor!`);
});
