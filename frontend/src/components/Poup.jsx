import React from "react";

const PopupBox = ({ isOpen, isSuccess, message, onClose }) => {
  return (
    <>
      {isOpen && (
        <div
          className={`fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 ${
            isOpen ? "block" : "hidden"
          }`}
        >
          <div className="bg-white p-8 rounded shadow-md w-96">
            <h2
              className={`text-2xl font-semibold mb-4 ${
                isSuccess ? "text-green-700" : "text-red-700"
              }`}
            >
              {isSuccess ? "Success" : "Failure"}
            </h2>
            <div
              className={`max-h-16 overflow-auto ${
                isSuccess ? "text-green-700" : "text-red-700"
              }`}
              style={{ scrollbarWidth: "thin" }}
            >
              <style>{`
                .max-h-16::-webkit-scrollbar {
                  width: 6px;
                }

                .max-h-16::-webkit-scrollbar-thumb {
                  background-color: #00ff00; /* Green color */
                }
              `}</style>
              <p className="line-clamp-3">{message}</p>
            </div>
            <button
              className={`mt-2 justify-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800`}
              onClick={onClose}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default PopupBox;
