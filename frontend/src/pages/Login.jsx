import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import LoginIll from "/Login.svg";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaGithub, FaEyeSlash } from "react-icons/fa";
import { loginService, reset } from "../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { loginForm, registerForm } from "../data/data";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const { isSuccess, isLoading, isError } = useSelector((state) => state.user);

  const loginHandle = async (data) => {
    dispatch(loginService(data));

    dispatch(reset());
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/");
    }
  }, [isSuccess, dispatch]);

  return (
    <div className="w-full flex justify-center items-center flex-grow bg-zinc-50">
      <div className="sm:w-2/3 sm:h-[70%] h-full rounded-md sm:bg-white shadow-xl flex sm:flex-row flex-col-reverse sm:justify-end justify-start items-center p-4 relative">
        <div className=" w-full sm:w-1/2 sm:h-full flex justify-center items-center ">
          <img src={LoginIll} className="sm:w-[400px] w-72 drop-shadow-3xl" />
        </div>
        <div className=" h-full  sm:w-1/2 rounded-md sm:p-6 flex flex-col gap-y-8 sm:justify-center">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-4xl font-semibold text-neutral-700">
              Giriş Yap
            </h1>
            <p className="text-neutral-700 text-sm">
              Hesabınıza giriş yaparak uygulamamızı kullanmaya devam
              edebilirsiniz. Hadi hemen başlayalım! 🚀
            </p>
          </div>
          <form onSubmit={handleSubmit(loginHandle)}>
            {loginForm.map((input) => (
              <div
                key={input.id}
                className="px-4 py-2 rounded-md border w-full mt-4 relative"
              >
                <label className="absolute pointer-events-none -top-2 text-neutral-700 text-xs sm:bg-white bg-zinc-50 px-2">
                  {input.label}
                </label>
                <input
                  type={
                    input.type === "password"
                      ? show
                        ? "text"
                        : "password"
                      : input.type
                  }
                  {...register(input.name)}
                  className="w-full outline-none h-full text-sm bg-transparent"
                />
                {input.type === "password" && (
                  <button
                    type="button"
                    onClick={() => setShow(!show)}
                    className="absolute right-3 top-3 text-neutral-700"
                  >
                    {show ? <FaEyeSlash /> : <FaEye />}
                  </button>
                )}
              </div>
            ))}
            <div className="w-full flex justify-end items-center py-2">
              <Link
                to="/register"
                className="text-sm text-neutral-700 underline"
              >
                Hesabın yok mu ?
              </Link>
            </div>
            <button className="w-full py-2 rounded-md bg-gradient-to-b from-[#FE4A65] to-[#EA1859] text-white  hover:ring-2 ring-[#FE4A65] ring-offset-2 transition-all duration-500">
              {isLoading ? "Giriş Yapılıyor..." : "Giriş Yap"}
            </button>
          </form>
          <div className="flex items-center justify-center w-full">
            <hr className="w-full h-px bg-gray-200 border-0 dark:bg-neutral-700" />
            <span className="absolute sm:bg-white bg-zinc-50 px-5 text-neutral-700 text-sm">
              YA DA
            </span>
          </div>
          <div className="grid grid-cols-2 w-full place-items-start gap-5">
            <button className="w-full flex justify-center items-center gap-x-2 py-2 rounded-md bg-white border text-neutral-700 font-semibold hover:ring-2 ring-neutral-300 ring-offset-2 transition-all duration-500">
              <FcGoogle size={20} /> Google
            </button>
            <button className="w-full flex justify-center items-center gap-x-2 py-2 rounded-md bg-white border text-neutral-700 font-semibold hover:ring-2 ring-neutral-300 ring-offset-2 transition-all duration-500">
              <FaGithub size={20} /> Github
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
