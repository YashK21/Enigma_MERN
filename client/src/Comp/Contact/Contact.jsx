const Contact = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#0a0a0a] to-gray-900 text-green-300 font-mono flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl bg-white/5 backdrop-blur-sm border border-green-800 rounded-xl p-8 shadow-[0_0_20px_rgba(0,255,128,0.2)]">
        <h1 className="text-4xl mb-6 text-center tracking-widest text-green-400 animate-pulse">
          ☠️ Contact the Keepers
        </h1>
        {/* <form className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm tracking-wider uppercase text-green-500"
            >
              Your Codename
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Agent X"
              className="mt-2 w-full p-3 rounded-md bg-black/30 border border-green-700 text-green-200 placeholder-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm tracking-wider uppercase text-green-500"
            >
              Cipher Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="shadow@matrix.mail"
              className="mt-2 w-full p-3 rounded-md bg-black/30 border border-green-700 text-green-200 placeholder-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="block text-sm tracking-wider uppercase text-green-500"
            >
              Encrypted Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="5"
              placeholder="Speak in code..."
              className="mt-2 w-full p-3 rounded-md bg-black/30 border border-green-700 text-green-200 placeholder-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-black font-bold py-3 px-6 rounded-md tracking-widest transition-all duration-200 shadow-[0_0_10px_rgba(0,255,128,0.5)] hover:shadow-[0_0_20px_rgba(0,255,128,0.9)]"
          >
            TRANSMIT
          </button>
        </form> */}
        <div className="mt-8 text-center text-green-400 text-xl">
          <p className="text-gray-500">
            🌑 Only those who dare to conquer the labyrinth of trials shall earn
            the right to stand before my shadow. 🔮 Unlock each cryptic level,
            for I linger in the depths, shrouded in anticipation. The hunt is
            yours, seeker of the unseen. 🕯️✨
            <span className="text-xl">🔐</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
