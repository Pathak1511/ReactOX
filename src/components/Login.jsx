import React, { useState } from "react";
import "./index.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login({ width, height }) {
  const navigate = useNavigate();
  const [userName, setuserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [Response, setResponse] = useState([]);
  const [showAlert, setAlert] = useState(false);
  const [errorColor, setColor] = useState("");
  const [responseMessage, setMessage] = useState("");

  const handleChangeUsername = (event) => {
    setuserName(event.target.value);
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  let navi = (data) => {
    //<GamePlay />;
    navigate("/newHome", {
      state: { data },
    });
  };

  const Login = async () => {
    let passedData = {
      userName: userName,
      password: password,
    };

    const options = {
      method: "POST",
      url: "/login",
      data: passedData,
    };

    await axios
      .request(options)
      .then(function (response) {
        setResponse(response.data);
        setEmail(response.data.data);
        setColor("green");
        setMessage("Congrats you are registered !!");
        navi(response.data.data[0].email);
      })
      .catch(function (error) {
        setColor("red");
        setMessage("Error Occured !!");
        console.error(error);
      });
    setAlert(true);
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
        <h2 className="font-bold text-xl mb-2">Login</h2>
        <p className="font-bold text-3xl">Please enter your </p>
        <p className="font-bold text-3xl">details</p>
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

      {/* Password */}
      <div className="px-6 mb-6">
        <h1 className="mb-2 font-semibold text-lg">Password</h1>
        <input
          id="password"
          type="text"
          className="w-full py-3 rounded-lg text-gray-700 placeholder-gray-800 bg-gray-300 outline-none focus:placeholder-transparent px-4"
          name="password"
          placeholder="Type your password here"
          onChange={handleChangePassword}
          value={password}
        />
      </div>

      {/* alert and buttons */}
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

      <div className="px-6 mt-64">
        <div className="my-4">
          <button
            className="w-full px-3 py-4 font-medium text-lg tracking-wide text-white capitalize transition-colors duration-300 transform bg-orange-400 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
            onClick={Login}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
