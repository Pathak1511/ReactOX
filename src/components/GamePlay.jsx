import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./index.css";
import axios from "axios";

const Oicon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="80"
      height="80"
      fill="none"
      viewBox="0 0 48 48"
    >
      <path
        fill="#023047"
        fillRule="evenodd"
        d="M10 24C10 16.268 16.268 10 24 10C31.732 10 38 16.268 38 24C38 31.732 31.732 38 24 38C16.268 38 10 31.732 10 24ZM24 14C18.4772 14 14 18.4772 14 24C14 29.5228 18.4772 34 24 34C29.5228 34 34 29.5228 34 24C34 18.4772 29.5228 14 24 14Z"
        clipRule="evenodd"
      />
    </svg>
  );
};

const Xicons = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="4.4"
      stroke="#0077b6"
      className="w-16 h-16 mt-4 ml-2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
};

let string = [3, 4, 5, 6, 7, 8, 9, 10, 11];

function GamePlay({ width, height }) {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [turn, setTurn] = useState(true);
  const [myEmail, setMyEmail] = useState("");
  const [otherEmail, setOtherEmail] = useState("");
  const [senderEmail, setsenderEmail] = useState("");
  const [player1won, setplayer1won] = useState(false);
  const [player2won, setplayer2won] = useState(false);
  const [player1, setPlayer1] = useState(true);
  const [player2, setPlayer2] = useState(false);
  //console.log(state);
  let minedata = new Array();

  useEffect(() => {
    setMyEmail(state[0].email);
    setOtherEmail(state[1].otherEmail);

    let data = async () => {
      const Response = await axios.get("/PlayedByX");

      for (let i = 0; i < Response.data.data.length; i++) {
        if (
          Response.data.data[i].email === myEmail ||
          Response.data.data[i].email === otherEmail
        ) {
          if (Response.data.data[i].email === myEmail) {
            minedata[0] = Response.data.data[i];
          } else {
            minedata[1] = Response.data.data[i];
          }
        }
      }
      let sender = minedata[0].PlayedByme.filter(
        (x) => x[0].email === otherEmail
      );
      let receiver = minedata[1].PlayedByme.filter(
        (x) => x[0].email === myEmail
      );

      if (sender.length !== 0) {
        if (sender[0][0].data[9] === 1) {
          setTurn(true);
          setsenderEmail(otherEmail);
        }
      } else if (receiver.length !== 0) {
        if (receiver[0][0].data[9] === 0) {
          setTurn(false);
          setsenderEmail(myEmail);
        }
      }
    };
    data();
  });

  function checkwin() {
    //console.log(string[0] === string[1] && string[1] === string[2]);
    if (string[0] === string[1] && string[1] === string[2]) return 1;
    else if (string[3] === string[4] && string[4] === string[5]) return 1;
    else if (string[6] === string[7] && string[7] === string[8]) return 1;
    else if (string[0] === string[3] && string[3] === string[6]) return 1;
    else if (string[1] === string[4] && string[4] === string[7]) return 1;
    else if (string[2] === string[5] && string[5] === string[8]) return 1;
    else if (string[0] === string[4] && string[4] === string[8]) return 1;
    else if (string[2] === string[4] && string[4] === string[6]) return 1;
    else if (
      string[0] !== 3 &&
      string[1] !== 4 &&
      string[2] !== 5 &&
      string[3] !== 6 &&
      string[4] !== 7 &&
      string[5] !== 8 &&
      string[6] !== 9 &&
      string[7] !== 10 &&
      string[8] !== 11
    )
      return 0;
    else return -1;
  }

  function setString(i, bool) {
    bool ? (string[i * 1] = 1) : (string[i * 1] = -1);
  }

  const Handlerbtn = (index) => {
    if (string[index * 1] === index * 1 + 3) {
      if (player1) {
        setString(index * 1, true);
        setPlayer1(false);
        if (checkwin() === 1) {
          console.log("x won");
          setplayer1won(true);
        }
      } else {
        setString(index * 1, false);
        setPlayer1(true);
        if (checkwin() === 1) {
          console.log("y won");
          setplayer2won(true);
        }
      }
    }
  };

  return (
    <div className="flex-1 home" style={{ height: height }}>
      {/* left Icon */}
      <div className="w-10 h-10 mt-3">
        <Link to="/connect" state={{ email: myEmail }}>
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
      <div className="px-6 py-4">
        <h2 className="font-bold text-3xl mb-2">Game with {otherEmail}</h2>
        <h2 className="font-semibold text-lg ">Your piece</h2>
        {/* SVG */}
        <div className="flex flex-row justify-between items-center">
          {turn ? (
            <div>
              <Xicons />
            </div>
          ) : (
            <div>
              <Oicon />
            </div>
          )}
          <div className="flex justify-center items-center pr-16">
            {player1won ? (
              <h2 className="text-2xl font-semibold">
                You Won <span className="text-4xl">🎉</span>
              </h2>
            ) : (
              <div></div>
            )}
            {player2won ? (
              <h2 className="text-2xl font-semibold">
                You Lost <span className="text-4xl">😣</span>
              </h2>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>

      {/* Container for OX */}
      <div className="px-6 pb-4">
        <div
          className="bg-orange-400 flex items-center justify-center
        p-4"
        >
          <h2 className="text-xl font-semibold">Your Move</h2>
        </div>

        {/* Box */}
        <div className="bg-orange-400">
          <div className="flex justify-between mb-1 mx-2">
            <button
              className="bg-gray-100 px-14 py-14 relative "
              onClick={() => Handlerbtn(0)}
            >
              <div className="absolute top-3 left-3">
                {string[0] !== 3 ? (
                  string[0] === -1 ? (
                    <Oicon />
                  ) : (
                    <Xicons />
                  )
                ) : (
                  <div></div>
                )}
              </div>
            </button>
            <button
              className="bg-gray-100 px-14 py-14 relative"
              onClick={() => Handlerbtn(1)}
            >
              <div className="absolute top-3 left-3">
                {string[1] !== 4 ? (
                  string[1] === -1 ? (
                    <Oicon />
                  ) : (
                    <Xicons />
                  )
                ) : (
                  <div></div>
                )}
              </div>
            </button>
            <button
              className="bg-gray-100 px-14 py-14 relative"
              onClick={() => Handlerbtn(2)}
            >
              <div className="absolute top-3 left-3">
                {string[2] !== 5 ? (
                  string[2] === -1 ? (
                    <Oicon />
                  ) : (
                    <Xicons />
                  )
                ) : (
                  <div></div>
                )}
              </div>
            </button>
          </div>
          <div className="flex justify-between mb-1 mx-2">
            <button
              className="bg-gray-100 px-14 py-14 relative"
              onClick={() => Handlerbtn(3)}
            >
              <div className="absolute top-3 left-3">
                {string[3] !== 6 ? (
                  string[3] === -1 ? (
                    <Oicon />
                  ) : (
                    <Xicons />
                  )
                ) : (
                  <div></div>
                )}
              </div>
            </button>
            <button
              className="bg-gray-100 px-14 py-14 relative"
              onClick={() => Handlerbtn(4)}
            >
              <div className="absolute top-3 left-3">
                {string[4] !== 7 ? (
                  string[4] === -1 ? (
                    <Oicon />
                  ) : (
                    <Xicons />
                  )
                ) : (
                  <div></div>
                )}
              </div>
            </button>
            <button
              className="bg-gray-100 px-14 py-14 relative"
              onClick={() => Handlerbtn(5)}
            >
              <div className="absolute top-3 left-3">
                {string[5] !== 8 ? (
                  string[5] === -1 ? (
                    <Oicon />
                  ) : (
                    <Xicons />
                  )
                ) : (
                  <div></div>
                )}
              </div>
            </button>
          </div>

          <div className="flex justify-between mb-1 mx-2">
            <button
              className="bg-gray-100 px-14 py-14 relative"
              onClick={() => Handlerbtn(6)}
            >
              <div className="absolute top-3 left-3">
                {string[6] !== 9 ? (
                  string[6] === -1 ? (
                    <Oicon />
                  ) : (
                    <Xicons />
                  )
                ) : (
                  <div></div>
                )}
              </div>
            </button>
            <button
              className="bg-gray-100 px-14 py-14 relative"
              onClick={() => Handlerbtn(7)}
            >
              <div className="absolute top-3 left-3">
                {string[7] !== 10 ? (
                  string[7] === -1 ? (
                    <Oicon />
                  ) : (
                    <Xicons />
                  )
                ) : (
                  <div></div>
                )}
              </div>
            </button>
            <button
              className="bg-gray-100 px-14 py-14 relative"
              onClick={() => Handlerbtn(8)}
            >
              <div className="absolute top-3 left-3">
                {string[8] !== 11 ? (
                  string[8] === -1 ? (
                    <Oicon />
                  ) : (
                    <Xicons />
                  )
                ) : (
                  <div></div>
                )}
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* button */}
      <div className="px-6">
        <div className="my-4">
          <Link>
            <button className="w-full px-3 py-4 font-medium text-lg tracking-wide text-white capitalize transition-colors duration-300 transform bg-orange-400 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">
              Submit
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default GamePlay;
