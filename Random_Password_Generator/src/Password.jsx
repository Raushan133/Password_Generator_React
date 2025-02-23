import { useCallback, useRef, useState } from "react";
import Checkbox from "./Component/Checkbox";
function Password() {
  const [password, setPassword] = useState("");
  const [uppercase, setUppercase] = useState(false);
  const [lowercase, setLowercase] = useState(false);
  const [number, setNumber] = useState(false);
  const [symbol, setSymbol] = useState(false);
  const [length, setLength] = useState(6);

  const UseRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "";

    if (uppercase) str += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (lowercase) str += "abcdefghijklmnopqrstuvwxyz";
    if (number) str += "0123456789";
    if (symbol) str += "`~!@#$%^&*()_-?><,./';:/*{}[]|";

    for (let i = 1; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [uppercase, lowercase, number, symbol, length, setPassword]);

  const copyPasswordToClipboard = useCallback(() => {
    UseRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [uppercase, lowercase, number, symbol, length, passwordGenerator]);

  return (
    <>
      <div className="w-full max-w-lg mx-auto shadow-md rounded-lg px-6 py-4 my-8 bg-gray-800 text-orange-500">
        <div className="text-center text-white text-4xl">
          Password Generator
        </div>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            className="outline-none w-full py-2 px-3 bg-amber-50 text-black my-5 rounded-lg"
            value={password}
            placeholder="Password"
            readOnly
            ref={UseRef}
          />
          <button
            onChange={() => {
              copyPasswordToClipboard;
            }}
            className="bg-blue-500 text-white outline-none py-0.5 px-3 my-5 rounded-lg shrink-3 cursor-pointer"
          >
            Copy
          </button>
        </div>

        <div>
          <div className="flex justify-between text-xl mb-2">
            <h4>Password length</h4>
            <h4>{length}</h4>
          </div>
          <input
            type="range"
            className="w-full cursor-pointer"
            min={1}
            max={20}
            value={length}
            onChange={(e) => {
              setLength(e.target.value);
            }}
          />
        </div>

        <Checkbox
          label="Include Uppercase Letters"
          checked={uppercase}
          onChange={() => setUppercase((prev) => !prev)}
        />

        <Checkbox
          label="Include Lowercase Letters"
          checked={lowercase}
          onChange={() => setLowercase((prev) => !prev)}
        />

        <Checkbox
          label="Include Numbers"
          checked={number}
          onChange={() => setNumber((prev) => !prev)}
        />
        <Checkbox
          label="Include Symbols"
          checked={symbol}
          onChange={() => setSymbol((prev) => !prev)}
        />
      </div>
    </>
  );
}

export default Password;
