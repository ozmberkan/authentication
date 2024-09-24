import React from "react";
import { useSelector } from "react-redux";

const Home = () => {
  const { user } = useSelector((store) => store.user);
  return (
    <div className="w-full h-screen flex justify-center items-center text-[100px]">
      <div className="flex flex-col gap-y-2 text-center">
        <span className="font-bold bg-clip-text bg-gradient-to-r from-[#FE4A65] to-[#EA1859] text-transparent drop-shadow-3xl">
          {user?.user?.username}
        </span>
        <span>Yeniden Hoş Geldin</span>
      </div>
    </div>
  );
};

export default Home;
