import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import envConfig from "../../config/env.config";

const AdminLoginForm = () => {
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${envConfig.API_BASE_URL}/admin/login`,
        { username, password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(res?.data);
      setMsg(res?.data?.data);
      if(res?.data?.statusCode == 200) {
        navigate("/admin")
      }
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div className="font-pressStart max-w-md mx-auto mt-12 p-6 bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] rounded-xl shadow-2xl border border-gray-700 backdrop-blur-md">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-100 tracking-widest uppercase">
        Gatekeeper Access
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <label
            htmlFor="username"
            className="block text-sm font-semibold text-purple-300 mb-1"
          >
            Codename
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 p-2 w-full bg-[#1e1e2f] text-gray-100 border border-purple-500 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
            placeholder="e.g. shadowSeeker"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-sm font-semibold text-purple-300 mb-1"
          >
            Cipher Key
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 p-2 w-full bg-[#1e1e2f] text-gray-100 border border-purple-500 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
            placeholder="••••••••"
            required
          />
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="px-6 py-2 bg-purple-600 text-white font-semibold rounded-md hover:bg-purple-700 transition-all duration-300 shadow-lg"
          >
            Unlock
          </button>
        </div>
      </form>
      <p className="text-center mt-4 text-green-400 italic">{msg}</p>
    </div>
  );
};

export default AdminLoginForm;
