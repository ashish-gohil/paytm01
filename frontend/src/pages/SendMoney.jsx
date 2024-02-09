import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function SendMoney() {
  const { id } = useParams();
  console.log(id);
  useEffect(() => {}, [id]);
  const [error, setError] = useState("");
  return (
    <div className="flex bg-gray-100 p-10 h-screen justify-center items-center">
      <div className="container bg-slate-200 rounded-lg">
        <h1 className="text-2xl font-bold m-4 text-center text-slate-900">
          Send Money
        </h1>
        <div className="flex items-center justify-start mb-3">
          <img
            src="../../public/profile_pic.png"
            width={"40px"}
            className="rounded-full"
          ></img>
          <p className="pl-2 font-bold ">Friend's Name</p>
        </div>
        <div className="mb-4">
          <label
            for="amount"
            className="block text-gray-700 text-sm mb-2 font-bold"
          >
            Amount in Rs.
          </label>
          <input
            type="amount"
            id="email"
            placeholder="Enter Amount"
            onChange={(e) => {
              if (e.target.value && !Number(e.target.value.trim())) {
                setError("Invalid Input");
              } else {
                setError("");
              }
            }}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              error && "border-red-500"
            }`}
          />
          {error && <p className="text-red-500 text-xs italic">{error}</p>}
        </div>
        <div className="flex justify-center m-4">
          <button
            disabled={error ? true : false}
            className={`p-2 rounded-md text-white transition ease-in-out delay-150 bg-blue-500 hover:bg-blue-600 duration-300 ${
              error ? "cursor-not-allowed" : ""
            }`}
          >
            Initiate Transection
          </button>
        </div>
      </div>
    </div>
  );
}
