import React from "react";
import { useNavigate } from "react-router-dom";

function Error(): React.ReactElement {
  const navigate = useNavigate();
  return (
    <>
      <div className="text-gray-300 mt-40 mb-10 mx-auto w-[700px]  text-2xl">
        <p>⚠️ Something went wrong!...Sorry for the inconvenient caused😥</p>
        <p>Try again after sometime!</p>
      </div>
      <div className="card-actions justify-center mt-4">
        <button className="btn btn-primary" onClick={() => navigate("/")}>
          Home
        </button>
      </div>
    </>
  );
}

export default Error;
