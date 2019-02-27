import React, { Component } from 'react';
import './App.css';
import Title from './Title'
import Dropzone from './Dropzone'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Title/>
        <Dropzone/>
      </div>
    );
  }
}

export default App;
