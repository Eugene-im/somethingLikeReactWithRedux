let store = {
  state: {
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
      _sum:'',
      _aver:'',
      setNumOfCol(num) {
        if (num != undefined) {
          this._numOfCol = num;
        }
      },
      setNumOfRow(num) {
        if (num != undefined) {
          this._numOfRow = num;
        }
      },
      setNumOfHiglight(num) {
        if (num != undefined) {
          this._numOfHiglight = num;
        }
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
      generateMatrixCeilData(a, b) {
        let ceil = {};
        min = this._matrixMinCeil;
        max = this._matrixMaxCeil;
        ceil.amount = Math.floor(Math.random() * (max - min + 1)) + min;
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
          this._sum = this.calcSumAndAv(this.data, "sum")
        return this._sum;
      },
      calcAver() {
        let arr = this.data[0].map((_, colIndex) =>
          this.data.map((row) => row[colIndex])
        );
        this._aver = this.calcSumAndAv(arr, "aver");
        return this._aver
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
        el.find((element, i) => {
          //note that element[id] need to change to element[amount]
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
        return arrRes;
      },
      percentOfSum(arr,j) {
          let sum = this._sum;
          let result = [];
        for (let i = 0; i < arr.length; i++) {
            result.push(Math.round((arr[i].amount/sum[j])*100))
        }
        return result
      },
      removeRow(id){
          //here need to regenerate matrix
        return  this.data.splice(id,1)
      }
    },
  },
};
// console.log(...store.state.matrix.generateMatrix());
// console.log(...store.state.matrix.calcSum());
// console.log(...store.state.matrix.calcAver());
// console.log(...store.state.matrix.findXSame(300));
// console.log(...store.state.matrix.percentOfSum(store.state.matrix.data[2],2));