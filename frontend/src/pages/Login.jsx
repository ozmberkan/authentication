import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const loginHandle = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/auth/login",
        data
      );
      console.log("Kullanıcı Başarıyla Giriş Yaptı");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full flex justify-center items-center flex-grow bg-blue-100">
      <form
        className="w-1/6 flex flex-col justify-start items-center gap-y-5"
        onSubmit={handleSubmit(loginHandle)}
      >
        <input
          type="text"
          {...register("username")}
          placeholder="username"
          className="px-4 py-2 rounded-md border w-full"
        />
        <input
          type="password"
          {...register("password")}
          placeholder="password"
          className="px-4 py-2 rounded-md border w-full"
        />
        <button className="bg-green-500 text-white w-full">Giriş Yap</button>
      </form>
    </div>
  );
};

export default Login;
