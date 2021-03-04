// imoprt dialogReducer from "./dialogReducer"

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
      setNumOfCol(num) {
        if (num != undefined && num > 1) {
          this._numOfCol = num;
        }
        this._numOfCol = this.getRand(this._min, this._max);
      },
      setNumOfRow(num) {
        if (num != undefined && num > 1) {
          this._numOfRow = num;
        }
        this._numOfRow = this.getRand(this._min, this._max);
      },
      setNumOfHiglight(num) {
        if (num != undefined && num > 0) {
          this._numOfHiglight = num;
        }
        this._numOfHiglight = this.getRand(this._min, this._max);
      },
      setInputData(m, n, x) {
        if (x >= m * n) {
          throw new Error("!!!!!!! x < m*n !!!!!!!");
        }
        this.setNumOfCol(m);
        this.setNumOfRow(n);
        this.setNumOfHiglight(x);
        this.update();
      },
      getNumOfCol() {
        return this._numOfCol;
      },
      getNumOfRow() {
        return this._numOfRow;
      },
      getNumOfHiglight() {
        return this._numOfHiglight;
      },
      getRand(max, min) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      },
      generateMatrixCeilData(a, b) {
        let ceil = {};
        min = this._matrixMinCeil;
        max = this._matrixMaxCeil;
        ceil.amount = this.getRand(max, min);
        ceil.id = +((a + 1).toString() + (b + 1).toString());
        return ceil;
      },
      generateMatrix(col = this._numOfCol, row = this._numOfRow) {
        for (var i = 0; i < row; i++) {
          this.data[i] = [];
          this.dataAmount[i] = [];
          for (var j = 0; j < col; j++) {
            let x3rnd = this.generateMatrixCeilData(i, j);
            this.data[i][j] = x3rnd;
            this.oneDimData.push(x3rnd);
            this.dataAmount[i][j] = x3rnd.amount;
            this.oneDimDataAmount.push(x3rnd.amount);
          }
        }
        return this.data;
      },
      calcSum() {
        this.sum = [...this.calcSumAndAv(this.data, "sum")];
        return this.sum;
      },
      calcAver() {
        let arr = this.data[0].map((_, colIndex) =>
          this.data.map((row) => row[colIndex])
        );
        this.aver = [...this.calcSumAndAv(arr, "aver")];
        return this.aver;
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
        if (arg == "sum") {
          return arrSum;
        } else if (arg == "aver") {
          return arrAver;
        }
      },
      findXSame(amount, x = this._numOfHiglight) {
        //note that id need to change to amount
        if (x >= this.oneDimDataAmount.length) throw new Error("check X");
        let arrRes = [];
        let xData = {};
        let elAmount = [...this.oneDimDataAmount];
        let el = [...this.oneDimData];
        el[1].amount = 300;
        elAmount[1] = 300;
        //note that id need to change to amount
        xData.half = Math.floor(x / 2);
        xData.odd = x % 2 !== 0;
        let obj = "";
        //note that element[id] need to change to element[amount]
        el.find((element, i) => {
          if (element.amount == amount) {
            obj = {};
            obj.id = element.id;
            obj.index = i;
            obj.amount = element.amount;
            return obj;
          }
          return obj;
        });
        if (obj == "") throw new Error("check ceil.amount");
        let goal = obj;
        let closest = {};
        elAmount.splice(obj.index, 1);
        el.splice(obj.index, 1);
        while (x > 0) {
          x--;
          el.reduce(function (prev, curr) {
            // Math.abs(curr.id - goal.id) < Math.abs(prev.id - goal.id) ? curr : prev;
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
        this.sameX = [...arrRes];
        return this.sameX;
      },
      percentOfSum() {
        let sum = this.sum;
        let result = [];
        let arr = this.data;
        for (let i = 0; i < arr.length; i++) {
          result.push([]);
          for (let j = 0; j < arr[i].length; j++) {
            result[i].push(Math.round((arr[i][j].amount / sum[j]) * 100));
          }
        }
        this.percentOfSumData = [...result];
        return this.percentOfSumData;
      },
      removeRow(i) {
        let arr = [...this.data[i]];
        let el = this.oneDimData;
        let elAmount = this.oneDimDataAmount;
        this.data.splice(i, 1);
        this.dataAmount.splice(i, 1);
        arr.forEach((_) => {
          el.find((element, ind) => {
            if (element.id == _.id) {
              el.splice(ind, 1);
              elAmount(ind, 1);
            }
          });
        });
        this.oneDimData;
        this.oneDimDataAmount;
        this.updatePart();
      },
      addRow(id) {
        let row = this.getNumOfRow() + 1;
        this.setNumOfRow(row);
        this.data.splice(id, 0, []);
        let i = 0;
        let arr = [];
        let obj = {};
        let ceil = {};
        while (i < this._numOfCol) {
          ceil = this.generateMatrixCeilData(id, i);
          obj.id = ceil.id;
          obj.amount = ceil.amount;
          obj.index = this.oneDimData.length + i;
          arr.push(obj);
          this.data[id].push([]);
          i++;
        }
        arr.forEach((_) => this.updateCeilData(_));
        this.updatePart();
      },
      ceillClick(id) {
        let el = this.oneDimData;
        let obj = "";
        el.find((element, i) => {
          if (element.id == id) {
            obj = {};
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
        this.data[i][j].amount = a.amount;
        this.dataAmount[i][j] = a.amount;
        this.oneDimDataAmount[k] = a.amount;
        this.oneDimData[k].amount = a.amount;
      },
      updatePart() {
        this.calcSum();
        this.calcAver();
        this.findXSame();
        this.percentOfSum();
      },
      updateAll() {
        this.generateMatrix();
        this.updatePart();
      },
    },
  },
  getState(){
    return this.state;
  },
  //_callSubscriber(){},
  // dispatch(action){},
  //subscribe(observer){},
};
// console.log(...store.state.matrix.generateMatrix());
// console.log(...store.state.matrix.calcSum());
// console.log(...store.state.matrix.calcAver());
// console.log(...store.state.matrix.findXSame(300));
// console.log(...store.state.matrix.percentOfSum(store.state.matrix.data[2],2));
