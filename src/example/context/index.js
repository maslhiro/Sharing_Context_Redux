import React, { useContext, useState } from "react";

const Store = React.createContext();

export const ContextEx = () => {
  const [num, setNum] = useState(0);

  const increment = () => setNum((num) => +num + 1);

  const decrement = () => setNum((num) => +num - 1);

  return (
    <Store.Provider value={{ num, increment, decrement, setNum }}>
      <CompA />
    </Store.Provider>
  );
};

const CompA = () => {
  const { num } = useContext(Store);

  return (
    <div className="Comp A">
      <div style={{ fontSize: 30 }}>{num}</div>

      <CompB />
    </div>
  );
};

const CompB = () => {
  const { num } = useContext(Store);

  return (
    <div className="Comp B">
      <div style={{ fontSize: 30 }}>{num}</div>
      <CompC />
    </div>
  );
};

const CompC = () => {
  const { setNum, decrement, increment } = useContext(Store);

  const [val, setVal] = useState("");

  return (
    <div className="Comp C">
      <button onClick={increment}>increase</button>
      <div style={{ height: 10 }} />
      <button onClick={decrement}>decrease</button>{" "}
      <div style={{ height: 10 }} />
      <input onChange={(e) => setVal(e.target.value)} />
      <div style={{ height: 10 }} />
      <button onClick={() => setNum(val)}>set num</button>
    </div>
  );
};
