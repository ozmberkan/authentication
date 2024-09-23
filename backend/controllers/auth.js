const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Auth = require("../models/auth.js");

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const user = await Auth.findOne({ username });

    if (user) {
      return res.status(406).json({
        message: "Bu bilgiler daha önce kayıt edilmiş!",
      });
    }

    if (password.length < 6) {
      return res.status(406).json({
        message: "Parola 6 karakterden az olamaz!",
      });
    }

    if (!email.includes("@")) {
      return res.status(406).json({
        message: "Lütfen geçerli bir e-posta giriniz!",
      });
    }

    if (!username || !email || !password) {
      return res.status(406).json({
        message: "Lütfen bilgileri doldurunuz!",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await Auth.create({
      username,
      email,
      password: hashedPassword,
    });

    const userToken = jwt.sign({ id: newUser._id }, process.env.SECRET_TOKEN, {
      expiresIn: "1h",
    });

    res.status(201).json({
      isSuccess: true,
      user: newUser,
      userToken,
    });
  } catch (error) {
    return res.status(500).json({
      message:
        "Bir hata ile karşılaştık lütfen geliştirici ile iletişim kurunuz!",
    });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await Auth.findOne({ username });

    if (!user) {
      return res.status(406).json({
        message: "Sistemde belirtilen kullanıcı bulunamadı!",
      });
    }

    const comparePassword = await bcrypt.compare(password, user.password);

    if (!comparePassword) {
      return res.status(406).json({
        message: "Girilen parola sistemle uyuşmuyor!",
      });
    }

    const userToken = jwt.sign({ id: user._id }, process.env.SECRET_TOKEN, {
      expiresIn: "1h",
    });

    res.status(200).json({
      isSuccess: true,
      user,
      userToken,
    });
  } catch (error) {
    return res.status(500).json({
      message:
        "Bir hata ile karşılaştık lütfen geliştirici ile iletişim kurunuz!",
    });
  }
};

module.exports = { register, login };
