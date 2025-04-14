import axios from "axios";
const Leaderboard = () => {
  const localhost = import.meta.env.VITE_LOCALHOST;
  const prodUrl = import.meta.env.VITE_PROD;
  const getLeaderBoard = async () => {
    await axios
      .get(`${localhost}/leaderboard`)
      .then(() => console.log(res))
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-green-300 font-mono px-4 py-12 flex flex-col items-center justify-center">
      <h1 className="text-4xl mb-10 font-bold tracking-widest text-center text-green-400 animate-pulse">
        🧩 THE RANKING GRID
      </h1>
      <div className="overflow-x-auto w-full max-w-4xl shadow-[0_0_20px_rgba(0,255,128,0.1)] border border-green-700 rounded-xl backdrop-blur bg-white/5">
        <table className="min-w-full divide-y divide-green-800">
          <thead className="bg-green-950/60">
            <tr>
              <th
                scope="col"
                className="px-6 py-4 text-left text-xs font-bold text-green-400 uppercase tracking-wider"
              >
                Rank
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-left text-xs font-bold text-green-400 uppercase tracking-wider"
              >
                Alias
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-left text-xs font-bold text-green-400 uppercase tracking-wider"
              >
                Intel Score
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-green-900">
            <tr className="hover:bg-green-900/30 transition duration-200">
              <td className="px-6 py-4 whitespace-nowrap text-green-300">1</td>
              <td className="px-6 py-4 whitespace-nowrap text-green-100">
                ShadowGhost
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-green-200">
                1000
              </td>
            </tr>
            <tr className="hover:bg-green-900/30 transition duration-200">
              <td className="px-6 py-4 whitespace-nowrap text-green-300">2</td>
              <td className="px-6 py-4 whitespace-nowrap text-green-100">
                EchoWhisper
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-green-200">
                900
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
  
};

export default Leaderboard;
