import React from "react";
import { Link } from "react-router-dom";
import "./index.css";

function Home({ width, height }) {
  return (
    <div className="flex-1 home" style={{ height: height }}>
      <div className="flex-1 justify-cente home-1">
        <h2 className="text-xl fonts mb-8 italic">async</h2>
        <h2 className="text-4xl fonts mb-8 italic">tic tac </h2>
        <h2 className="text-4xl fonts italic">toe</h2>
      </div>

      {/* buttons */}
      <div className="flex-1 py-6 px-4 ">
        <div className="my-4">
          <Link to="/login">
            <button className="w-full px-2 py-4 font-medium text-lg tracking-wide text-white capitalize transition-colors duration-300 transform bg-orange-400 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">
              Login
            </button>
          </Link>
        </div>
        <div>
          <Link to="/signup">
            <button className="w-full px-2 py-4 font-medium text-lg tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">
              Register
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
