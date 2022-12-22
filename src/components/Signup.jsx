import React, { useState } from "react";
import "./index.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Signup({ width, height }) {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [userName, setuserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passedData, setPassedData] = useState("");
  const [Response, setResponse] = useState([]);
  const [showAlert, setAlert] = useState(false);
  const [errorColor, setColor] = useState("");
  const [responseMessage, setMessage] = useState("");

  const handleChangeName = (event) => {
    setName(event.target.value);
  };
  const handleChangeUsername = (event) => {
    setuserName(event.target.value);
  };
  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };
  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  let AftergetData = async () => {
    const options = {
      method: "POST",
      url: "https://long-plum-cobra-kit.cyclic.app/createAccount",
      data: passedData,
    };

    await axios
      .request(options)
      .then(function (response) {
        setResponse(response.data);
        setColor("green");
        setMessage("Congrats you are registered !!");
        setAlert(true);
        setTimeout(() => {
          navigate("/login", { state: response.data[0] });
        }, 3000);
      })
      .catch(function (error) {
        setColor("red");
        setMessage("Error Occured !!");
        setAlert(true);
        console.error(error);
      });
  };

  const dataSet = () => {
    const sendData = {
      email: email.trim(),
      password: password,
      userName: userName,
      name: name,
    };
    setPassedData(sendData);
    AftergetData();
  };

  return (
    <div className="flex-1 home" style={{ height: height }}>
      {/* left Icon */}
      <div className="w-10 h-10 mt-3">
        <Link to="/">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="ionicon"
            viewBox="0 0 512 512"
          >
            <title>Chevron Back</title>
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="48"
              d="M328 112L184 256l144 144"
            />
          </svg>
        </Link>
      </div>

      {/* upper heading */}
      <div className="px-6 py-6 pt-4">
        <h2 className="font-bold text-xl mb-2">Create Account</h2>
        <p className="font-bold text-3xl">Let's get to know </p>
        <p className="font-bold text-3xl">you better !</p>
      </div>

      {/* Input Container */}
      <div>
        {/* name */}
        <div className="px-6 mb-6">
          <h1 className="mb-2 font-semibold text-lg">Your name</h1>
          <input
            id="name"
            type="text"
            className="w-full py-4 rounded-lg text-gray-700 placeholder-gray-800 bg-gray-300 outline-none focus:placeholder-transparent px-4 "
            name="name"
            placeholder="Type your name here"
            onChange={handleChangeName}
            value={name}
          />
        </div>
        {/* Username */}
        <div className="px-6 mb-6">
          <h1 className="mb-2 font-semibold text-lg">Username</h1>
          <input
            id="username"
            type="text"
            className="w-full py-4 rounded-lg text-gray-700 placeholder-gray-800 bg-gray-300 outline-none focus:placeholder-transparent px-4"
            name="username"
            placeholder="Type your username here"
            onChange={handleChangeUsername}
            value={userName}
          />
        </div>
        {/* Email */}
        <div className="px-6 mb-6">
          <h1 className="mb-2 font-semibold text-lg">Email</h1>
          <input
            id="email"
            type="text"
            className="w-full py-4 rounded-lg text-gray-700 placeholder-gray-800 bg-gray-300 outline-none focus:placeholder-transparent px-4"
            name="email"
            placeholder="Type your email here"
            onChange={handleChangeEmail}
            value={email}
          />
        </div>
        {/* Password */}
        <div className="px-6 mb-6">
          <h1 className="mb-2 font-semibold text-lg">Password</h1>
          <input
            id="password"
            type="text"
            className="w-full py-4 rounded-lg text-gray-700 placeholder-gray-800 bg-gray-300 outline-none focus:placeholder-transparent px-4"
            name="password"
            placeholder="Type your password here"
            onChange={handleChangePassword}
            value={password}
          />
        </div>

        <div
          className="px-6"
          style={showAlert ? { paddingLeft: 24 } : { padding: 0 }}
        >
          <h2
            className={`px-6 py-2 rounded-lg bg-${errorColor}-400 text-black`}
            style={showAlert ? { padding: 6 } : { padding: 0 }}
          >
            {showAlert ? responseMessage : ""}
          </h2>
        </div>
        <div className="px-6">
          <div className="my-4">
            <button
              className="w-full px-3 py-4 font-medium text-lg tracking-wide text-white capitalize transition-colors duration-300 transform bg-orange-400 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
              onClick={dataSet}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
