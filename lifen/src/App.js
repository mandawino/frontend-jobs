import React, { Component } from 'react';
import './App.css';
import Title from './presenters/Title'
import Content from './containers/Content'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Title/>
        <Content/>
      </div>
    );
  }
}

export default App;
