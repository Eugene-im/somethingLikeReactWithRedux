import logo from './logo.svg';
import './App.scss';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h2>Test app</h2>
      </header>
      <main className="App-main">
        <div className="app-input">
          <div className="input-group">
            <label className="input-label" htmlFor="col">Columns (M)</label>
            <input className="input-item" name="col" type="number" defaultValue='3'/>
          </div>
          <div className="input-group">
            <label className="input-label" htmlFor="row">Rows (N)</label>
            <input className="input-item" name="row" type="number" defaultValue='3'/>
          </div>
          <div className="input-group last">
            <label className="input-label" htmlFor="row">Number of cells with same amount (X)</label>
            <input className="input-item" name="row" type="number" defaultValue='3'/>
          </div>
          <button className="input-button" onClick={()=>{console.log('i`ll generate something')}}>Generate matrix</button>
        </div>
        <div className="app-output">
          <div className="output-matrix matrix">
            <div className="matrix-row row-1">
              <div className="matrix-cell cell-item cell-11">100</div>
              <div className="matrix-cell cell-item cell-12">999</div>
              <div className="matrix-cell cell-item cell-13">555</div>
              <div className="matrix-cell cell-amount">3</div>
            </div>
            <div className="matrix-row row-2">
              <div className="matrix-cell cell-item cell-21">148</div>
              <div className="matrix-cell cell-item cell-22">547</div>
              <div className="matrix-cell cell-item cell-23">261</div>
              <div className="matrix-cell cell-amount">3</div>
            </div>
            <div className="matrix-row row-3">
              <div className="matrix-cell cell-item cell-31">7</div>
              <div className="matrix-cell cell-item cell-32">8</div>
              <div className="matrix-cell cell-item cell-33">9</div>
              <div className="matrix-cell cell-amount">3</div>
            </div>
            <div className="matrix-row average-row row-4">
              <div className="matrix-cell cell-average cell-x1">1</div>
              <div className="matrix-cell cell-average cell-x2">2</div>
              <div className="matrix-cell cell-average cell-x3">3</div>
            </div>
          </div>
        </div>
      </main>
      <footer className="App-footer">
        {/* <a href="http://" target="_blank" rel="noopener noreferrer">send notes</a> */}
      </footer>
    </div>
  );
}

export default App;
