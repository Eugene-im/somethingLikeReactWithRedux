let store = {
  _state: {
    matrix: {
      data: [],
      oneDimData: [],
      dataAmount: [],
      oneDimDataAmount: [],
      //why 4 arr ??? because lat arr = [{a:1}]; arr.indexOf({a:1}) == -1
      _numOfRow: 3,
      _numOfCol: 3,
      _numOfHiglight: 3,
      _matrixMinCeil: 100,
      _matrixMaxCeil: 999,
      sum: "",
      aver: "",
      sameX: "",
      percentOfSumData: "",
      _min: 2,
      _max: 10,
    },
  },
  setNumOfCol(num) {
    if (num !== undefined && num > 2) {
      return (this._state.matrix._numOfCol = num);
    } else {
      return (this._state.matrix._numOfCol = this.getRand(
        this._state.matrix._min,
        this._state.matrix._max
      ));
    }
  },
  setNumOfRow(num) {
    if (num !== undefined && num > 2) {
      return (this._state.matrix._numOfRow = num);
    } else {
      return (this._state.matrix._numOfRow = this.getRand(
        this._state.matrix._min,
        this._state.matrix._max
      ));
    }
  },
  setNumOfHiglight(num) {
    if (num !== undefined && num > 0) {
      return (this._state.matrix._numOfHiglight = num);
    } else {
      let max = this._state.matrix._numOfCol * this._state.matrix._numOfRow - 1;
      return (this._state.matrix._numOfHiglight = this.getRand(
        this._state.matrix._min,
        max
      ));
    }
  },
  setInputData(m, n, x) {
    if (x >= m * n) {
      throw new Error("!!!!!!! x < m*n !!!!!!!");
    }
    this.setNumOfCol(m);
    this.setNumOfRow(n);
    this.setNumOfHiglight(x);

    this.updateAll();
  },
  getNumOfCol() {
    return this._state.matrix._numOfCol;
  },
  getNumOfRow() {
    return this._state.matrix._numOfRow;
  },
  getNumOfHiglight() {
    return this._state.matrix._numOfHiglight;
  },
  getRand(max, min) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },
  generateMatrixCeilData(a, b) {
    let ceil = {};
    let min = this._state.matrix._matrixMinCeil;
    let max = this._state.matrix._matrixMaxCeil;
    ceil.id = +((a + 1).toString() + (b + 1).toString());
    ceil.amount = this.getRand(max, min);
    return ceil;
  },
  generateMatrix(
    col = this._state.matrix._numOfCol,
    row = this._state.matrix._numOfRow
  ) {
    for (var i = 0; i < row; i++) {
      this._state.matrix.data[i] = [];
      this._state.matrix.dataAmount[i] = [];
      for (var j = 0; j < col; j++) {
        let x3rnd = this.generateMatrixCeilData(i, j);
        this._state.matrix.data[i][j] = x3rnd;
        this._state.matrix.oneDimData.push(x3rnd);
        this._state.matrix.dataAmount[i][j] = x3rnd.amount;
        this._state.matrix.oneDimDataAmount.push(x3rnd.amount);
      }
    }
    return this._state.matrix.data;
  },
  calcSum() {
    this._state.matrix.sum = [
      ...this.calcSumAndAv(this._state.matrix.data, "sum"),
    ];
    return this._state.matrix.sum;
  },
  calcAver() {
    let arr = this._state.matrix.data[0].map((_, colIndex) =>
      this._state.matrix.data.map((row) => row[colIndex])
    );
    this._state.matrix.aver = [...this.calcSumAndAv(arr, "aver")];
    return this._state.matrix.aver;
  },
  calcSumAndAv(arr, arg) {
    let arrAver = [];
    let arrSum = [];
    let sum = 0;
    let av = 0;
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr[i].length; j++) {
        sum += arr[i][j].amount;
      }
      arrSum.push(sum);
      av = Math.round(sum / arr[i].length);
      arrAver.push(av);
      av = 0;
      sum = 0;
    }
    if (arg === "sum") {
      return arrSum;
    } else if (arg === "aver") {
      return arrAver;
    }
  },
  findXSame(amount, x = this._state.matrix._numOfHiglight) {
    if (x >= this._state.matrix.oneDimDataAmount.length)
      throw new Error("check X");
    let arrRes = [];
    let xData = {};
    let elAmount = [...this._state.matrix.oneDimDataAmount];
    let el = [...this._state.matrix.oneDimData];
    // el[1].amount = 300;
    // elAmount[1] = 300;
    xData.half = Math.floor(x / 2);
    xData.odd = x % 2 !== 0;
    let obj = "";
    el.find((element, i) => {
      if (element.amount === amount) {
        obj = {};
        obj.id = element.id;
        obj.index = i;
        obj.amount = element.amount;
        return obj;
      }
      return obj;
    });
    if (obj === "") throw new Error("check ceil.amount");
    let goal = obj;
    let closest = {};
    elAmount.splice(obj.index, 1);
    el.splice(obj.index, 1);
    while (x > 0) {
      x--;
      el.reduce(function (prev, curr) {
        if (
          Math.abs(curr.amount - goal.amount) <
          Math.abs(prev.amount - goal.amount)
        ) {
          closest.id = curr.id;
          closest.index = elAmount.indexOf(curr.amount);
          closest.amount = curr.amount;
        }
        closest.id = prev.id;
        closest.index = elAmount.indexOf(prev.amount);
        closest.amount = prev.amount;
        return closest;
      });
      arrRes.push(closest);
      if (closest.index > -1) {
        elAmount.splice(closest.index, 1);
        el.splice(closest.index, 1);
      }
      closest = {};
    }
    this._state.matrix.sameX = [...arrRes];

    return this._state.matrix.sameX;
  },
  percentOfSum() {
    let sum = this._state.matrix.sum;
    let result = [];
    let arr = this._state.matrix.data;
    for (let i = 0; i < arr.length; i++) {
      result.push([]);
      for (let j = 0; j < arr[i].length; j++) {
        result[i].push(Math.round((arr[i][j].amount / sum[j]) * 100));
      }
    }
    this._state.matrix.percentOfSumData = [...result];
    return this._state.matrix.percentOfSumData;
  },
  removeRow(i) {
    let arr = [...this._state.matrix.data[i]];
    let el = this._state.matrix.oneDimData;
    let elAmount = this._state.matrix.oneDimDataAmount;
    this._state.matrix.data.splice(i, 1);
    this._state.matrix.dataAmount.splice(i, 1);

    arr.forEach((_) => {
      let ind = _.id - 11;
      el.splice(ind, 1);
      elAmount.splice(ind, 1);
    });

    this.updatePart();
  },
  addRow(id) {
    let row = this.getNumOfRow() + 1;
    this.setNumOfRow(row);
    // this._state.matrix.data.splice(id, 0, []);
    let i = 0;
    let arr = [];
    let arrAmount = [];
    while (i < this._state.matrix._numOfCol) {
      let obj = {};
      let ceil = {};
      ceil = this.generateMatrixCeilData(id, i);
      obj.id = ceil.id;
      obj.amount = ceil.amount;
      arr.push(obj);
      arrAmount.push(obj.amount);
      // obj.index = this._state.matrix.oneDimData.length + i;
      // this._state.matrix.data[id].push([]);
      // this._state.matrix.data[id].forEach(_=>_.push([]));
      i++;
    }

    this._state.matrix.data.forEach((_, i) =>
      i < id ? "" : _.forEach((el) => (el.id += 10))
    );
    this._state.matrix.data.splice(id, 0, arr);
    this._state.matrix.dataAmount.splice(id, 0, arrAmount);
    arr.forEach((_, i) =>
      this._state.matrix.oneDimData.splice(id * arr.length + i, 0, _)
    );
    arrAmount.forEach((_, i) =>
      this._state.matrix.oneDimDataAmount.splice(
        id * arrAmount.length + i,
        0,
        _
      )
    );
    this.updatePart();
  },
  ceillClick(id) {
    let el = this._state.matrix.oneDimData;
    let obj = {};
    el.find((element, i) => {
      if (element.id === id) {
        obj.id = element.id;
        obj.index = i;
        obj.amount = element.amount + 1;

        return obj;
      }

      return obj;
    });
    this.updateCeilData(obj);
    this.updatePart();
  },
  updateCeilData(a) {
    let i = a.id.toString()[0] - 1;
    let j = a.id.toString()[1] - 1;

    let k = a.index;
    this._state.matrix.data[i][j].amount = a.amount;
    this._state.matrix.dataAmount[i][j] = a.amount;
    this._state.matrix.oneDimDataAmount[k] = a.amount;
    this._state.matrix.oneDimData[k].amount = a.amount;
  },
  updatePart() {
    this.calcSum();
    this.calcAver();
    this.percentOfSum();

    this._callSubscriber(this);
  },
  updateAll() {
    this.generateMatrix();
    this.updatePart();
    this._callSubscriber(this);
  },
  getState() {
    //
    return this._state;
  },
  _callSubscriber() {
    console.log("ill render next time");
  },
  dispatch(action) {
    if (action.type === "ROW-ADD") {
      this.addRow(action.data);
    } else if (action.type === "MNX-UPD") {
      if (action.what === "m") {
        this.setNumOfCol(action.data.m);
      } else if (action.what === "n") {
        this.setNumOfRow(action.data.n);
      } else if (action.what === "x") {
        this.setNumOfHiglight(action.data.x);
      }
    } else if (action.type === "ROW-REM") {
      this.removeRow(action.data);
    } else if (action.type === "CEIL-CLICK") {
      this.ceillClick(action.data);
    } else if (action.type === "CEIL-HOVER") {
      this.findXSame(action.data);
    } else if (action.type === "SUMM-HOVER") {
      this.percentOfSum(action.data);
    } else if (action.type === "MATRIX-GENERATE") {
      this.setInputData(action.data.m, action.data.n, action.data.x);
    } else {
      console.error("no action find");
    }
  },
  subscribe(observer) {
    this._callSubscriber = observer;
  },
};

export default store;
window.store = store;
// console.log(store.getState());
