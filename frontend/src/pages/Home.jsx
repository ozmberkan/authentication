import React from "react";
import { useSelector } from "react-redux";

const Home = () => {
  const { user } = useSelector((store) => store.user);
  return <div>Username : {user?.user?.username}</div>;
};

export default Home;
