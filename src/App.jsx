import { useCallback, useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [passWord, setPaasword] = useState("");

  const passWordRef = useRef(null);

  const PassWordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";//string from which random characters would be chosen
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*-_+=[]{}~`";

    for (let i = 1; i <= length; i++) {
      let idx = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(idx);
    }
    setPaasword(pass);

  }, [length, numberAllowed, charAllowed, setPaasword]);

  //copy clipboard functionality
  const copyToClipboard=useCallback(()=>{
    passWordRef.current?.select();//this syntax is for selecting optionally
    passwordRef.current?.setSelectionRange(0,length);
    window.navigator.clipboard.writeText(passWord);
  },[passWord]);

  useEffect(() => {
    PassWordGenerator();
  }, [length, numberAllowed, charAllowed, PassWordGenerator])

  return (

    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
      <h1 className='text-white text-center my-3'>Password generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
          type='text'
          value={passWord}
          className='outline-none w-full py-1 px-3'
          placeholder='Password'
          readOnly
          ref={passWordRef}
        />
        <button
          className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
          onClick={copyToClipboard}
        >copy</button>

      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input
            type="range"
            min={6}
            max={100}
            value={length}
            className='cursor-pointer'
            onChange={(e) => { setLength(e.target.value) }}
          />
          <label>Length: {length}</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={numberAllowed}
            id="numberInput"
            onChange={() => {
              setNumberAllowed((prev) => !prev);
            }}
          />
          <label htmlFor="numberInput">Numbers</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={charAllowed}
            id="characterInput"
            onChange={() => {
              setCharAllowed((prev) => !prev)
            }}
          />
          <label htmlFor="characterInput">Characters</label>

        </div>
      </div>


    </div>
  );
}

export default App
