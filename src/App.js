import logo from './logo.svg';
import './App.css';
import Form from './Form.js';

function App() {
  return (
    <div className="App">
      <div className="app-header">
        <img src={logo} className="App-logo" alt="logo"/>
        <h2></h2>
      </div>
      <Form />
    </div>
  );
}

export default App;
