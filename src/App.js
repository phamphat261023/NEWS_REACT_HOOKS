import logo from "./logo.svg";
import "./App.scss";
import AddNew from "./views/AddNew";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <AddNew />
      </header>
    </div>
  );
}

export default App;
