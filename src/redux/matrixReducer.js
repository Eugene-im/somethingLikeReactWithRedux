const ROW_ADD = "ROW-ADD";
const ROW_REM = "ROW-REM";
const CEIL_CLICK = "CEIL-CLICK";
const CEIL_HOVER = "CEIL-HOVER";
const MNX_UPD = "MNX-UPD";
const MATRIX_GENERATE = "MATRIX-GENERATE";

export const rowAddActionCreator = (data) => ({ type: ROW_ADD, data: data });
export const rowRemActionCreator = (data) => ({ type: ROW_REM, data: data });
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
  what: data.what,
  data: data.data,
});
export const matrixGenActionCreator = (data) => ({
  type: MATRIX_GENERATE,
  data: data,
});

let initialState = {
  data: [
    [
      { id: "abc", amount: 101, pr: 30, t: 0 },
      { id: "def", amount: 101, pr: 30, t: 0 },
      { id: "ghi", amount: 101, pr: 30, t: 0 },
    ],
    [
      { id: "jkl", amount: 101, pr: 30, t: 0 },
      { id: "mno", amount: 101, pr: 30, t: 0 },
      { id: "prs", amount: 101, pr: 30, t: 0 },
    ],
    [
      { id: "tuv", amount: 101, pr: 30, t: 0 },
      { id: "wxy", amount: 101, pr: 30, t: 0 },
      { id: "zzz", amount: 101, pr: 30, t: 0 },
    ],
  ],
  oneDimData: [
    { id: "abc", amount: 101, pr: 30, t: 0 },
    { id: "def", amount: 101, pr: 30, t: 0 },
    { id: "ghi", amount: 101, pr: 30, t: 0 },
    { id: "jkl", amount: 101, pr: 30, t: 0 },
    { id: "mno", amount: 101, pr: 30, t: 0 },
    { id: "prs", amount: 101, pr: 30, t: 0 },
    { id: "tuv", amount: 101, pr: 30, t: 0 },
    { id: "wxy", amount: 101, pr: 30, t: 0 },
    { id: "zzz", amount: 101, pr: 30, t: 0 },
  ],
  numOfRow: 3,
  numOfCol: 3,
  numOfHiglight: 3,
  _matrixMinCeil: 100,
  _matrixMaxCeil: 999,
  sum: [303,303,303],
  aver: [101,101,101],
  sameX: [101,101,101],
};

const setInputData = (m, n, x, state) => {
  if (x >= m * n) {
    throw new Error("!!!!!!! x < m*n !!!!!!!");
  }
  state.numOfCol = m;
  state.numOfRow = n;
  state.numOfHiglight = x;
};

const createRow = (col) => {
  new Array(col).fill(0).map(() => ({
    id: Math.random().toString(16).substring(2, 8),
    amount: 100 + ((Math.random() * 999) >> 0),
    pr: 0,
    t: 0,
  }));
};
const countAll = (state) => {
  let index = 0;
  let rowid = 0;
  let col = state.numOfCol;
  do {
    for (let i = 0; i < col; i++) {
      state.aver[i]
        ? (state.aver[i] += state.oneDimData[index].amount || 0)
        : (state.aver[i] = state.oneDimData[index].amount || 0);
      state.sum[rowid]
        ? (state.sum[rowid] += state.oneDimData[index].amount || 0)
        : (state.sum[rowid] = state.oneDimData[index].amount || 0);
      index++;
    }
    for (let j = 0; j < col; j++)
      state.data[rowid][j].pr = Math.round(
        (100 * state.data[rowid][j].amount) / state.sum[rowid]
      );
    rowid++;
  } while (index < state.oneDimData.length);
  Object.entries(state.aver).map(([key, el]) => Math.floor(el / state.numOfCol));
};
const setMNX = (num, what, state) => {
  let setter = (a, b) => {
    if (b !== undefined && b > 2) {
      state[a] = b;
    } else {
      state[a] = this.getRand(state._min, state._max);
    }
  };
  if (what === "m") {
    setter("numOfCol", num);
  } else if (what === "n") {
    setter("numOfRow", num);
  } else if (what === "x") {
    if (num !== undefined && num > 0) {
      state.matrix.numOfHiglight = num;
    } else {
      let max = state.matrix.numOfCol * state.matrix.numOfRow - 1;
      state.matrix.numOfHiglight = this.getRand(state.matrix._min, max);
    }
  } else {
    throw new Error("nothing to set, check action.what");
  }
};

const matrixReducer = (state = initialState, action) => {
  switch (action.type) {
    case ROW_ADD:
      state.data.splice(action.data, 0, createRow(state.numOfCol));
      countAll(state);
      return state;

    case ROW_REM:
      state.data.splice(action.data, 1);
      countAll(state);
      return state;
    case MNX_UPD:
      setMNX(action.data, action.what);
      return state;

    case CEIL_CLICK:
      state.matrix.oneDimData.find((el) =>
        el.id === action.data ? (el.amount += 1) : ""
      );
      countAll(state);
      return state;
    case CEIL_HOVER:
      state.sameX = state.data
        .slice()
        .filter((el) => el.amount != action.data)
        .map((el) =>
          Object.assign(el, { t: Math.abs(el.amount - action.data) })
        )
        .sort((a, b) => a.t - b.t)
        .slice(state.numOfHiglight);
      return state;
    case MATRIX_GENERATE:
      setInputData(action.data.m, action.data.n, action.data.x, state);
      state.data = new Array(action.data.n)
        .fill(0)
        .map(() => createRow(action.data.m));
      state.oneDimData = state.data.flat();
      countAll(state);
      return state;
    default:
      console.error("no action find");
      return state;
  }
};

export default matrixReducer;
