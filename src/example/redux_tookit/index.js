import React, { useState } from "react";
import { createStore } from "redux";
import { Provider, useDispatch, useSelector, shallowEqual } from "react-redux";
import { createSlice } from "@reduxjs/toolkit";

const initialState = { num: 0 };

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment(state) {
      state.num++;
    },
    decrement(state) {
      state.num--;
    },
    setNum(state, action) {
      state.num = action.payload;
    },
  },
});

const { increment, decrement, setNum } = counterSlice.actions;
const reducer = counterSlice.reducer;

const store = createStore(reducer);

export const ReduxTKEx = () => {
  return (
    <Provider store={store}>
      <CompA />
    </Provider>
  );
};

const CompA = () => {
  const num = useSelector((store) => store.num);

  return (
    <div className="Comp A">
      <div style={{ fontSize: 30 }}>{num}</div>

      <CompB />
    </div>
  );
};

const CompB = () => {
  const num = useSelector((store) => store.num);

  return (
    <div className="Comp B">
      <div style={{ fontSize: 30 }}>{num}</div>
      <CompC />
    </div>
  );
};

const CompC = () => {
  const dispatch = useDispatch();

  const [val, setVal] = useState("");

  return (
    <div className="Comp C">
      <button onClick={() => dispatch(increment())}>increase</button>
      <div style={{ height: 10 }} />
      <button onClick={() => dispatch(decrement())}>decrease</button>
      <div style={{ height: 10 }} />
      <input onChange={(e) => setVal(e.target.value)} />
      <div style={{ height: 10 }} />
      <button onClick={() => dispatch(setNum(val))}>set num</button>
    </div>
  );
};
