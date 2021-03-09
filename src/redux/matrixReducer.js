const ROW_ADD = "ROW-ADD";
const ROW_REM = "ROW-REM";
const CEIL_CLICK = "CEIL-CLICK";
const CEIL_HOVER = "CEIL-HOVER";
const MNX_UPD = "MNX-UPD";
const MATRIX_GENERATE = "MATRIX-GENERATE";

export const rowAddActionCreator = (data) => ({
  type: ROW_ADD,
  data: data
});
export const rowRemActionCreator = (data) => ({
  type: ROW_REM,
  data: data
});
export const ceilClickActionCreator = (data) => ({
  type: CEIL_CLICK,
  data: data,
});
export const ceilHoverActionCreator = (data) => ({
  type: CEIL_HOVER,
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
  data: [
    [{
        id: "abc",
        amount: 101,
        pr: 30,
        t: 0
      },
      {
        id: "def",
        amount: 101,
        pr: 30,
        t: 0
      },
      {
        id: "ghi",
        amount: 101,
        pr: 30,
        t: 0
      },
    ],
    [{
        id: "jkl",
        amount: 101,
        pr: 30,
        t: 0
      },
      {
        id: "mno",
        amount: 101,
        pr: 30,
        t: 0
      },
      {
        id: "prs",
        amount: 101,
        pr: 30,
        t: 0
      },
    ],
    [{
        id: "tuv",
        amount: 101,
        pr: 30,
        t: 0
      },
      {
        id: "wxy",
        amount: 101,
        pr: 30,
        t: 0
      },
      {
        id: "zzz",
        amount: 101,
        pr: 30,
        t: 0
      },
    ],
  ],
  dataOneDim: [{
      id: "abc",
      amount: 101,
      pr: 30,
      t: 0
    },
    {
      id: "def",
      amount: 101,
      pr: 30,
      t: 0
    },
    {
      id: "ghi",
      amount: 101,
      pr: 30,
      t: 0
    },
    {
      id: "jkl",
      amount: 101,
      pr: 30,
      t: 0
    },
    {
      id: "mno",
      amount: 101,
      pr: 30,
      t: 0
    },
    {
      id: "prs",
      amount: 101,
      pr: 30,
      t: 0
    },
    {
      id: "tuv",
      amount: 101,
      pr: 30,
      t: 0
    },
    {
      id: "wxy",
      amount: 101,
      pr: 30,
      t: 0
    },
    {
      id: "zzz",
      amount: 101,
      pr: 30,
      t: 0
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
  sameX: [101, 101, 101],
};

const setInputData = (m, n, x, st) => {
  if (x >= m * n) {
    throw new Error("!!!!!!! x < m*n !!!!!!!");
  }
  st.numOfCol = m;
  st.numOfRow = n;
  st.numOfHiglight = x;
  return st;
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
  st.sum = [];
  st.aver = [];
  do {
    for (let i = 0; i < col; i++) {
      st.aver[i] === undefined ?
        (st.aver[i] += st.oneDimData[index].amount || 0) :
        (st.aver[i] = st.oneDimData[index].amount || 0);
      st.sum[rowid] === undefined ?
        (st.sum[rowid] += st.oneDimData[index].amount || 0) :
        (st.sum[rowid] = st.oneDimData[index].amount || 0);
      index++;
    }
    for (let j = 0; j < col; j++)
      st.data[rowid][j].pr = Math.round(
        (100 * st.data[rowid][j].amount) / st.sum[rowid]
      );
    rowid++;
  } while (index < st.oneDimData.length);
  Object.entries(st.aver).map(([key, el]) =>
    Math.floor(el / st.numOfCol)
  );
  return st;
};
const setMNX = (data, st) => {
  let setter = (a, b) => {
    let min = st._min;
    let max = st._max;
    if (b !== undefined && b > 2) {
      st[a] = b;
    } else {
      st[a] = Math.floor(Math.random() * (max - min + 1)) + min;
    }
  };
  if (data.what === "m") {
    setter("numOfCol", data.data);
  } else if (data.what === "n") {
    setter("numOfRow", data.data);
  } else if (data.what === "x") {
    if (data.data !== undefined && data.data > 0) {
      st.numOfHiglight = data.data;
    } else {
      let max = st.numOfCol * st.numOfRow - 1;
      st.numOfHiglight = this.getRand(st._min, max);
    }
  } else {
    throw new Error("nothing to set, check action.what");
  }
  return st
};

const matrixReducer = (state = initialState, action) => {
// const matrixReducer = (state = '', action) => {
  let stateCopy;
  switch (action.type) {
    case ROW_ADD:
      stateCopy = {
        ...state
      };
      stateCopy.data.splice(action.data, 0, createRow(stateCopy.numOfCol));
      countAll(stateCopy);
      return stateCopy;

    case ROW_REM:
      stateCopy = {
        ...state
      };
      stateCopy.data.splice(action.data, 1);
      countAll(stateCopy);
      return stateCopy;

    case MNX_UPD:
      stateCopy = {
        ...state
      };
      setMNX(action.data, stateCopy);
      return stateCopy;

    case CEIL_CLICK:
      stateCopy = {
        ...stateCopy
      };
      stateCopy.matrix.oneDimData.find((el) =>
        el.id === action.data ? (el.amount += 1) : ""
      );
      countAll(stateCopy);
      return stateCopy;

    case CEIL_HOVER:
      stateCopy = {
        ...state
      };
      stateCopy.sameX = stateCopy.data
        .slice()
        .filter((el) => el.amount !== action.data)
        .map((el) =>
          Object.assign(el, {
            t: Math.abs(el.amount - action.data)
          })
        )
        .sort((a, b) => a.t - b.t)
        .slice(stateCopy.numOfHiglight);
      return stateCopy;

    case MATRIX_GENERATE:
      stateCopy = {
        ...state
      };
      stateCopy.data = new Array(action.data.n)
        .fill(0)
        .map(() => createRow(action.data.m));
      stateCopy.oneDimData = stateCopy.data.flat();
      countAll(stateCopy);
      return stateCopy;

    default:
      return state;
  }
};

export default matrixReducer;