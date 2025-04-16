import axios from "axios";
import envConfig from "../../config/env.config";
import { useEffect, useState } from "react";
const Leaderboard = () => {
  const [allUsersScore, setAllUsersScore] = useState([]);
  const getLeaderBoard = async () => {
    try {
      const res = await axios.get(`${envConfig.API_BASE_URL}/leaderboard`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      setAllUsersScore(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getLeaderBoard();
  }, []);
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-green-300 font-mono px-4 py-12 flex flex-col items-center justify-center">
      <h1 className="text-4xl mb-10 font-bold tracking-widest text-center text-green-400 animate-pulse">
        🧩 THE RANKING GRID
      </h1>
      <div className="text-center overflow-x-auto w-full max-w-4xl shadow-[0_0_20px_rgba(0,255,128,0.1)] border border-green-700 rounded-xl backdrop-blur bg-white/5">
        <table className="min-w-full divide-y divide-green-800 ">
          <thead className="bg-green-950/60">
            <tr className="">
              <th
                scope="col"
                className=" px-6 py-4  text-xs font-bold text-green-400 uppercase tracking-wider"
              >
                Rank
              </th>
              <th
                scope="col"
                className="px-6 py-4  text-xs font-bold text-green-400 uppercase tracking-wider"
              >
                Alias
              </th>
              <th
                scope="col"
                className="px-6 py-4  text-xs font-bold text-green-400 uppercase tracking-wider"
              >
                Intel Score
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-green-900">
            {allUsersScore.map((userDetail, idx) => {
              return (
                <>
                  <tr className="hover:bg-green-900/30 transition duration-200">
                    <td className="px-6 py-4 whitespace-nowrap text-green-300">
                      {idx + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-green-100">
                      {userDetail.username}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-green-200">
                      {userDetail.userCurrentScore}
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;
