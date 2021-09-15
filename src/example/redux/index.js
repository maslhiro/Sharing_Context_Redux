import React, { useState } from "react";
import { createStore } from "redux";
import { Provider, useDispatch, useSelector, shallowEqual } from "react-redux";

const ACTION_TYPE = {
  INCREMENT: "increment",
  DECREMENT: "decrement",
  SET_NUM: "set_num",
};

const Actions = {
  increment: () => ({ type: ACTION_TYPE.INCREMENT }),
  decrement: () => ({ type: ACTION_TYPE.DECREMENT }),
  setNum: (val) => ({ type: ACTION_TYPE.SET_NUM, payload: val }),
};

const initalState = { num: 0, num1: 0 };

const reducer = (state, action) => {
  switch (action?.type) {
    case ACTION_TYPE.INCREMENT:
      return { num: +state.num + 1 };

    case ACTION_TYPE.DECREMENT:
      return { num: +state.num - 1 };

    case ACTION_TYPE.SET_NUM:
      return { num: action.payload };

    default:
      return state;
  }
};

const store = createStore(reducer, initalState);

export const ReduxEx = () => {
  return (
    <Provider store={store}>
      <CompA />
    </Provider>
  );
};

const CompA = () => {
  const num = useSelector((store) => store.num);

  console.log("COMPA");

  return (
    <div className="Comp A">
      <div style={{ fontSize: 30 }}>{num}</div>

      <CompB />
    </div>
  );
};

const CompB = React.memo(() => {
  const store = useSelector((store) => store);

  console.log("COMPB");

  return (
    <div className="Comp B">
      <div style={{ fontSize: 30 }}>{store?.num}</div>
      <CompC />
    </div>
  );
});

const CompC = () => {
  const dispatch = useDispatch();

  const [val, setVal] = useState("");

  return (
    <div className="Comp C">
      <button onClick={() => dispatch(Actions.increment())}>increase</button>
      <div style={{ height: 10 }} />
      <button onClick={() => dispatch(Actions.decrement())}>decrease</button>
      <div style={{ height: 10 }} />
      <input onChange={(e) => setVal(e.target.value)} />
      <div style={{ height: 10 }} />
      <button onClick={() => dispatch(Actions.setNum(val))}>set num</button>
    </div>
  );
};
