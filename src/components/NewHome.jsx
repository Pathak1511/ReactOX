import React, { useState, useEffect } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import "./index.css";
import axios from "axios";

function NewHome({ width, height, data }) {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [states, setstate] = useState(data);
  const [boolReceive, setBoolReceive] = useState(false);
  const [myEmail, setMyEmail] = useState("");

  console.log(state);

  let arr = new Array();
  let maparr = new Array();
  let emailArr = new Array();

  useEffect(() => {
    setMyEmail(state.data);

    async function getdetails() {
      const data = await axios.get("/PlayedByX");

      setstate(data.data.data);
    }
    getdetails();

    for (let i = 0; i < states.length; i++) {
      if (states[i].email !== state.data) {
        arr.push(states[i].email);
      }
    }

    arr.filter((x) => emailArr.push({ email: x }));
    setBoolReceive(true);
  }, []);

  function navigateThrough(email) {
    navigate("/game", {
      state: [{ email: myEmail }, { otherEmail: email }],
    });
  }

  return (
    <div className="flex-1 home" style={{ height: height }}>
      {/* upper heading */}
      <div>
        <h2 className="font-bold text-3xl mb-2 p-6">Your Game</h2>
      </div>
      {boolReceive ? (
        <div>
          {[emailArr].map(({ email }, index) => (
            <h2 key={index}>{email}</h2>
          ))}

          <div className="mx-6 bg-yellow-300 py-4 rounded-lg" key={1}>
            <h2 className="pl-6 font-semiold text-lg">kaustubh</h2>
            <div className="px-6 flex justify-between items-center">
              <h2 className=" font-semiold text-lg">Resume Play</h2>
              <button
                className="px-6 bg-orange-600 text-white rounded-lg py-2"
                onClick={() => navigateThrough("kaustubh@gmail.com")}
              >
                Play
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1">
          <h2 className="font-semibold italic text-4xl mb-2 ml-32 pt-44 pb-4">
            No Game
          </h2>
          <h2 className="font-semibold italic text-4xl mb-2 ml-40 pb-10">
            found
          </h2>
        </div>
      )}

      <div className="px-6">
        <div className="my-4">
          <Link to="/connect" state={{ email: state.data }}>
            <button className="w-full px-3 py-4 font-medium text-lg tracking-wide text-white capitalize transition-colors duration-300 transform bg-orange-400 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">
              Start a new Game
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NewHome;
