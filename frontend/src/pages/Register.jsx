import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";

const Register = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const registerHandle = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/auth/register",
        data
      );
      console.log("Kullanıcı Kaydı Başarıyla Oluşturuldu");
      dispatch(setUser(response.data));
    } catch (error) {
      if (error.status === 406) {
        console.log("Kabul edilemeyen durum!");
      }
    }
  };

  return (
    <div className="w-full flex justify-center items-center flex-grow bg-blue-100">
      <form
        className="w-1/6 flex flex-col justify-start items-center gap-y-5"
        onSubmit={handleSubmit(registerHandle)}
      >
        <input
          type="text"
          {...register("username")}
          placeholder="username"
          className="px-4 py-2 rounded-md border w-full"
        />
        <input
          type="text"
          {...register("email")}
          placeholder="email"
          className="px-4 py-2 rounded-md border w-full"
        />
        <input
          type="password"
          {...register("password")}
          placeholder="password"
          className="px-4 py-2 rounded-md border w-full"
        />
        <button className="bg-green-500 text-white w-full">Kayıt Ol</button>
      </form>
    </div>
  );
};

export default Register;
