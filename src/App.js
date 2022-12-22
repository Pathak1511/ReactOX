import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import { useState, useEffect } from "react";
import React from "react";
import NewHome from "./components/NewHome";
import ConnectPage from "./components/ConnectPage";
import GamePlay from "./components/GamePlay";
import axios from "axios";
function App() {
  const [states, setstate] = useState([]);
  const [windowSize, setWindowSize] = useState(getWindowSize());

  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }
    async function getdetails() {
      await axios
        .get("https://long-plum-cobra-kit.cyclic.app/PlayedByX")
        .then(function (response) {
          setstate(response.data.data);
        })
        .catch(function (error) {
          console.error(error);
        });
    }
    getdetails();

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  console.log(windowSize.innerWidth);
  return (
    <div style={{ height: windowSize.innerHeight }}>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <Home
              width={window.innerWidth}
              height={window.innerHeight}
              data={states}
            />
          }
        ></Route>
        <Route
          exact
          path="/login"
          element={
            <Login
              width={window.innerWidth}
              height={window.innerHeight}
              data={states}
            />
          }
        ></Route>
        <Route
          path="/signup"
          element={
            <Signup
              width={window.innerWidth}
              height={window.innerHeight}
              data={states}
            />
          }
        ></Route>

        <Route
          exact
          path="/newHome"
          element={
            <NewHome
              width={window.innerWidth}
              height={window.innerHeight}
              data={states}
            />
          }
        ></Route>
        <Route
          exact
          path="/game"
          element={
            <GamePlay
              width={window.innerWidth}
              height={window.innerHeight}
              data={states}
            />
          }
        ></Route>
        <Route
          exact
          path="/connect"
          element={
            <ConnectPage
              width={window.innerWidth}
              height={window.innerHeight}
              data={states}
            />
          }
        ></Route>
      </Routes>
    </div>
  );

  function getWindowSize() {
    const { innerWidth, innerHeight } = window;
    return { innerWidth, innerHeight };
  }
}

export default App;
