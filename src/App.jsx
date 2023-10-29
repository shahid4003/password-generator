import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [toggle, settoggle] = useState(false);
  // const [value, setValue] = useState("");
  const [length, setlength] = useState(8);
  const [numallow, setnumAllow] = useState(false);
  const [charallow, setcharAllow] = useState(false);
  const [passwordchar, setpasswordchar] = useState("");

  const passwordgenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numallow) str += "0123456789";
    if (charallow) str += "@#$%^&()_-+{}[]~`?/";

    for (let i = 1; i <= length; i++) {
      let password = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(password);
    }
    setpasswordchar(pass);
  }, [length, numallow, charallow, setpasswordchar]);
  useEffect(() => {
    passwordgenerator();
  }, [length, numallow, charallow, passwordgenerator]);
  const passwordrefrence = useRef(null);
  const passwordCopyToClipboard = useCallback(() => {
    passwordrefrence.current?.select();
    window.navigator.clipboard.writeText(passwordchar);
  }, [passwordchar]);
  return (
    <div className="bg-gradient-to-r from-rose-100 to-teal-100 w-screen h-screen flex justify-center items-center">
      <div className="bg-gray-600 rounded-2xl px-8 py-8 w-1/2 h-fit ">
        <h1 className="text-white text-2xl text-center">Password Generator</h1>
        <div className="flex justify-center items-center mt-4 ">
          <input
            type="text"
            className="px-4 py-2 rounded-l-md w-11/12"
            value={passwordchar}
            readOnly
            ref={passwordrefrence}
          />
          <button
            className="bg-cyan-300 px-4 py-2 rounded-r-md"
            onClick={passwordCopyToClipboard}
          >
            Copy
          </button>
        </div>
        <div className="flex  justify-start  mt-4 flex-col text-cyan-300">
          <div className="flex  items-center ">
            <input
              type="range"
              onChange={(e) => setlength(e.target.value)}
              value={length}
              min={6}
              max={60}
            />
            <p className="text-sm font-semibold ml-4">length:{length}</p>
          </div>
          <div className="flex  items-center mt-2">
            <input
              type="checkbox"
              className="ml-4"
              onChange={() => setnumAllow((prev) => !prev)}
              defaultChecked={numallow}
            />
            <p className="text-sm font-semibold ml-4">Numbers</p>
          </div>
          <div className="flex  items-center mt-2">
            <input
              type="checkbox"
              onChange={() => setcharAllow((prev) => !prev)}
              defaultChecked={charallow}
              className="ml-4"
            />
            <p className="text-sm font-semibold ml-4">Characters</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
