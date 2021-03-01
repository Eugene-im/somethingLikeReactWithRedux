import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h2>Test app</h2>
      </header>
      <main>
        <div className="app-input">
          <label htmlFor="col">Columns</label>
          <input name="col" type="number" defaultValue='3'/>
          <label htmlFor="row">Rows</label>
          <input name="row" type="number" defaultValue='3'/>
          <button onClick={()=>{console.log('i`ll generate something')}}>Generate matrix</button>
        </div>
        <div className="app-output">
          <div className="output-matrix matrix">
            <div className="matrix-row row-1">
              <div className="matrix-cell cell-11">1</div>
              <div className="matrix-cell cell-12">2</div>
              <div className="matrix-cell cell-13">3</div>
              <div className="matrix-cell cell-amount">3</div>
            </div>
            <div className="matrix-row row-2">
              <div className="matrix-cell cell-21">4</div>
              <div className="matrix-cell cell-22">5</div>
              <div className="matrix-cell cell-23">6</div>
              <div className="matrix-cell cell-amount">3</div>
            </div>
            <div className="matrix-row row-3">
              <div className="matrix-cell cell-31">7</div>
              <div className="matrix-cell cell-32">8</div>
              <div className="matrix-cell cell-33">9</div>
              <div className="matrix-cell cell-amount">3</div>
            </div>
            <div className="matrix-row average-row row-4">
              <div className="matrix-cell cell-average-1">7</div>
              <div className="matrix-cell cell-average-2">8</div>
              <div className="matrix-cell cell-average-3">9</div>
            </div>
          </div>
        </div>
      </main>
      <footer>
        <a href="http://" target="_blank" rel="noopener noreferrer">send notes</a>
      </footer>
    </div>
  );
}

export default App;
