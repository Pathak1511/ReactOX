import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./index.css";
import axios from "axios";

function ConnectPage({ width, height }) {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [email, setEmail] = useState("email");

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };
  let navi = () => {
    navigate("/game", {
      state: [{ email: state.email }, { otherEmail: email }],
    });
  };

  // let ConnectFrnd = async () => {
  //   if (email === state[0]?.email) {
  //     alert("Same Email");
  //     setEmail("");
  //   } else {
  //     let passedData = {
  //       emailMine: state[0]?.email,
  //       emailOther: email,
  //       turn: true,
  //     };

  //     //console.log(passedData);

  //     const options = {
  //       method: "POST",
  //       url: "/SendConnect",
  //       data: passedData,
  //     };

  //     const response = await axios
  //       .request(options)
  //       .then(function (response) {
  //         //console.log(response.data);
  //         setTimeout(() => {
  //           navi(passedData);
  //         }, 3000);
  //       })
  //       .catch(function (error) {
  //         console.error(error);
  //       });
  //   }
  // };

  return (
    <div className="flex-1 home" style={{ height: height }}>
      {/* left Icon */}
      <div className="w-10 h-10 mt-3">
        <Link to="/newHome" state={{ data: state.email }}>
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
        <h2 className="font-semibold text-xl mb-2">Start a new game</h2>
        <p className="font-bold text-3xl">Whom do you want </p>
        <p className="font-bold text-3xl">to play with?</p>
      </div>

      {/* Email */}
      <div className="px-6 mb-6">
        <h1 className="mb-2 font-semibold text-lg">Email</h1>
        <input
          id="email"
          type="text"
          className="w-full py-4 rounded-lg text-gray-700 placeholder-black bg-gray-300 outline-none focus:placeholder-transparent px-4"
          name="email"
          placeholder="Type their email here"
          onChange={handleChangeEmail}
          value={email}
        />
      </div>

      <div className="px-6 mt-80">
        <div className="my-4">
          <Link
            to="/game"
            state={[{ email: state.email }, { otherEmail: email }]}
          >
            <button
              className="w-full px-3 py-4 font-medium text-lg tracking-wide text-white capitalize transition-colors duration-300 transform bg-orange-400 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
              onClick={navi}
            >
              Start Game
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ConnectPage;
