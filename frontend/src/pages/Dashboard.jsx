import React, { useState, useEffect } from "react";

const dummyFriends = [
  { name: "test1", userId: 1 },
  { name: "test2", userId: 2 },
  { name: "test3", userId: 3 },
  { name: "test4", userId: 4 },
  { name: "test5", userId: 5 },
  { name: "test5", userId: 5 },
  { name: "test5", userId: 5 },
  { name: "test5", userId: 5 },
  { name: "test5", userId: 5 },
  { name: "test5", userId: 5 },
  { name: "test5", userId: 5 },
  { name: "test5", userId: 5 },
  { name: "test5", userId: 5 },
];
const FriendListEle = ({ friend }) => {
  return (
    <li
      key={friend.userId}
      className="flex p-2 flex-row hover:bg-slate-300 w-full  rounded-md"
      onClick={(e) => {
        // console.log(e.target.getBoundingClientRect().height);
        console.log(friend.userId);
      }}
    >
      {/* <p>
        Name: {friend.name} | UserID: {friend.userId}
      </p> */}
      {/* <div> */}
      <div className="items-center flex space-x-2 ">
        <div>{friend?.userId}</div>
        <div>{friend?.name}</div>
      </div>
      {/* <div className="flex ml-9">
          <button className="bg-teal-500 p-1 justify-center rounded">
            Pay
          </button>
        </div> */}
      {/* </div> */}
    </li>
  );
};

const Dashboard = () => {
  const [balance, setBalance] = useState(0);
  const [friends, setFriends] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    // Fetch balance and friends data
    fetchBalance();
    fetchFriends();
  }, []);

  const fetchBalance = async () => {
    try {
      // Fetch balance data (replace with actual API call)
      // const response = await fetch("https://api.example.com/balance");
      // const result = await response.json();

      // setBalance(result.balance);
      setBalance(1000);
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  };

  const fetchFriends = async () => {
    try {
      // Fetch friends data (replace with actual API call)
      // const response = await fetch("https://api.example.com/friends");
      // const result = await response.json();

      // setFriends(result.friends);
      setFriends(dummyFriends);
    } catch (error) {
      console.error("Error fetching friends:", error);
    }
  };

  const handleSearch = () => {
    // Filter friends based on the search term
    const filteredFriends = friends.filter((friend) =>
      friend.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    console.log(filteredFriends);
    setSearchResults(filteredFriends);
  };

  return (
    <div className="flex justify-center items-center p-8 h-screen bg-gray-100">
      <div className="container h-4/5 flex flex-col p-8 justify-center bg-slate-200  rounded-lg">
        <h1 className="text-2xl font-bold mb-4 text-center text-slate-900">
          Paytm App
        </h1>

        <div className="mb-8">
          <p className="text-lg">
            Your Balance:{" "}
            <span className="font-bold text-slate-900">${balance}</span>
          </p>
        </div>
        <div className="mb-8">
          <h2 className="text-xl  font-bold mb-4">Search for Friends</h2>

          <div className="flex items-center ">
            <input
              type="text"
              placeholder="Enter friend name or ID"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border-solid rounded-md  p-2 mr-2"
            />
            <button
              onClick={handleSearch}
              className="bg-blue-500 text-white p-2 rounded-md"
            >
              Search
            </button>
          </div>
        </div>

        <div className="rounded-md">
          <ul className="max-h-[160px] flex flex-col overflow-y-auto">
            {searchResults.length > 0
              ? searchResults.map((friend) => {
                  return <FriendListEle friend={friend} />;
                })
              : friends.map((friend) => {
                  return <FriendListEle friend={friend} />;
                })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
