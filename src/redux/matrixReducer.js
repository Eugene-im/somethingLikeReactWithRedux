// import _ from "lodash";
const ROW_ADD = "ROW-ADD";
const ROW_REM = "ROW-REM";
const CEIL_CLICK = "CEIL-CLICK";
const CEIL_HOVER = "CEIL-HOVER";
const CEIL_UNHOVER = "CEIL-UNHOVER";
const SUM_HOVER = "SUM-HOVER";
const SUM_UNHOVER = "SUM-UNHOVER";
const MNX_UPD = "MNX-UPD";
const MATRIX_GENERATE = "MATRIX-GENERATE";

export const rowAddActionCreator = (data) => ({
  type: ROW_ADD,
  data: data,
});
export const rowRemActionCreator = (data) => ({
  type: ROW_REM,
  data: data,
});
export const ceilClickActionCreator = (data, data2) => ({
  type: CEIL_CLICK,
  data: data,
  data2: data2,
});
export const ceilHoverActionCreator = (data) => ({
  type: CEIL_HOVER,
  data: data,
});
export const ceilUnHoverActionCreator = (data) => ({
  type: CEIL_UNHOVER,
  data: data,
});
export const sumHoverActionCreator = (data) => ({
  type: SUM_HOVER,
  data: data,
});
export const sumUnHoverActionCreator = (data) => ({
  type: SUM_UNHOVER,
  data: data,
});
export const mnxUpdActionCreator = (data) => ({
  type: MNX_UPD,
  data: data.data,
});
export const matrixGenActionCreator = (data) => ({
  type: MATRIX_GENERATE,
  data: data,
});

let initialState = {
  sumHoverData: "",
  data: [
    [
      {
        id: "abc",
        amount: 101,
        pr: 30,
        t: 0,
      },
      {
        id: "def",
        amount: 101,
        pr: 30,
        t: 0,
      },
      {
        id: "ghi",
        amount: 101,
        pr: 30,
        t: 0,
      },
    ],
    [
      {
        id: "jkl",
        amount: 101,
        pr: 30,
        t: 0,
      },
      {
        id: "mno",
        amount: 101,
        pr: 30,
        t: 0,
      },
      {
        id: "prs",
        amount: 101,
        pr: 30,
        t: 0,
      },
    ],
    [
      {
        id: "tuv",
        amount: 101,
        pr: 30,
        t: 0,
      },
      {
        id: "wxy",
        amount: 101,
        pr: 30,
        t: 0,
      },
      {
        id: "zzz",
        amount: 101,
        pr: 30,
        t: 0,
      },
    ],
  ],
  dataOneDim: [
    {
      id: "abc",
      amount: 101,
      pr: 30,
      t: 0,
    },
    {
      id: "def",
      amount: 101,
      pr: 30,
      t: 0,
    },
    {
      id: "ghi",
      amount: 101,
      pr: 30,
      t: 0,
    },
    {
      id: "jkl",
      amount: 101,
      pr: 30,
      t: 0,
    },
    {
      id: "mno",
      amount: 101,
      pr: 30,
      t: 0,
    },
    {
      id: "prs",
      amount: 101,
      pr: 30,
      t: 0,
    },
    {
      id: "tuv",
      amount: 101,
      pr: 30,
      t: 0,
    },
    {
      id: "wxy",
      amount: 101,
      pr: 30,
      t: 0,
    },
    {
      id: "zzz",
      amount: 101,
      pr: 30,
      t: 0,
    },
  ],
  _min: 2,
  _max: 10,
  numOfRow: 3,
  numOfCol: 3,
  numOfHiglight: 3,
  _matrixMinCeil: 100,
  _matrixMaxCeil: 999,
  sum: [303, 303, 303],
  aver: [101, 101, 101],
  sameX: [0, 0, 0],
};

const createRow = (col) => {
  return new Array(col).fill(0).map(() => ({
    id: Math.random().toString(16).substring(2, 8),
    amount: 100 + ((Math.random() * 900) >> 0),
    pr: 0,
    t: 0,
  }));
};
const countAll = (st) => {
  let index = 0;
  let rowid = 0;
  let col = st.numOfCol;
  st.aver = new Array(col).fill(0);
  do {
    for (let i = 0; i < col; i++) {
      st.aver[i] += st.dataOneDim[index].amount;
      i === 0
        ? (st.sum[rowid] = st.dataOneDim[index].amount)
        : (st.sum[rowid] += st.dataOneDim[index].amount);
      index++;
    }
    for (let j = 0; j < col; j++)
      st.data[rowid][j].pr = Math.round(
        (100 * st.data[rowid][j].amount) / st.sum[rowid]
      );
    rowid++;
  } while (index < st.dataOneDim.length);
  // let buferData = st.data.map(el=>el);
  // st.data = [];
  // st.data = buferData.map(el=>el);
  // // let buferData = st.data.map(el=>el)
  st.aver = st.aver.map((el) => Math.floor(el / st.numOfRow));
  return st;
};
const setMNX = (data, st) => {
  let setter = (a, b) => {
    if (b !== undefined && b >= 2) {
      st[a] = b;
    } else {
      let min = st._min;
      let max = st.numOfCol * st.numOfRow - 1;
      st[a] = Math.floor(Math.random() * (max - min + 1)) + min;
    }
  };
  if (data.what === "m") {
    setter("numOfCol", data.data);
  } else if (data.what === "n") {
    setter("numOfRow", data.data);
  } else if (data.what === "x") {
    let x = data.data > st.numOfCol * st.numOfRow - 1 ? 3 : data.data;
    setter("numOfHiglight", x);
  } else {
    throw new Error("nothing to set, check action.what");
  }
  return st;
};

const findeSameX = (st, actioData) => {
  st.sameX = st.dataOneDim
    .slice()
    .map((el) => ({ ...el, t: Math.abs(el.amount - actioData) }))
    .sort((a, b) => a.t - b.t)
    .slice(0, st.numOfHiglight + 1);
  return st;
};

const matrixReducer = (state = initialState, action) => {
  let stateCopy;
  switch (action.type) {
    case ROW_ADD:
      // stateCopy = {...state};
      stateCopy = JSON.parse(JSON.stringify(state));
      let newRow = createRow(stateCopy.numOfCol);
      stateCopy.data.splice(action.data, 0, newRow);
      stateCopy.numOfRow += 1;
      stateCopy.dataOneDim = stateCopy.data.flat();
      countAll(stateCopy);
      return stateCopy;

    case ROW_REM:
      // stateCopy = {...state};
      stateCopy = JSON.parse(JSON.stringify(state));
      stateCopy.data.splice(action.data, 1);
      stateCopy.numOfRow -= 1;
      stateCopy.dataOneDim = stateCopy.data.flat();
      countAll(stateCopy);
      return stateCopy;

    case MNX_UPD:
      // stateCopy = {...state};
      stateCopy = JSON.parse(JSON.stringify(state));
      setMNX(action.data, stateCopy);
      return stateCopy;

    case CEIL_CLICK:
      // stateCopy = {...state};
      stateCopy = JSON.parse(JSON.stringify(state));
      stateCopy.dataOneDim.find((el) =>
        el.id === action.data ? (el.amount += 1) : ""
      );
      countAll(stateCopy);
      findeSameX(stateCopy, action.data2);
      return stateCopy;

    case CEIL_HOVER:
      // stateCopy = {...state};
      stateCopy = JSON.parse(JSON.stringify(state));
      findeSameX(stateCopy, action.data);
      return stateCopy;

    case CEIL_UNHOVER:
      // stateCopy = {...state};
      stateCopy = JSON.parse(JSON.stringify(state));
      stateCopy.sameX = new Array(stateCopy.numOfCol).fill(0);
      return stateCopy;

    case SUM_HOVER:
      // stateCopy = {...state};
      stateCopy = JSON.parse(JSON.stringify(state));
      stateCopy.sumHoverData = action.data;
      return stateCopy;

    case SUM_UNHOVER:
      // stateCopy = {...state};
      stateCopy = JSON.parse(JSON.stringify(state));
      stateCopy.sumHoverData = "";
      return stateCopy;

    case MATRIX_GENERATE:
      // stateCopy = {...state};
      stateCopy = JSON.parse(JSON.stringify(state));
      stateCopy.data = new Array(action.data.n)
        .fill(0)
        .map(() => createRow(action.data.m));
      stateCopy.dataOneDim = stateCopy.data.flat();
      countAll(stateCopy);
      return stateCopy;

    default:
      return state;
  }
};

export default matrixReducer;
