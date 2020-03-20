import React from 'react';
import Canvas from './Canvas'

export default class App extends React.Component {
  render() {
    return (
      <div>
        <div className="jumbotron jumbotron-fluid">
          <div className="container">
            <h1 className="display-4">Sort Visualizer</h1>
            <p className="lead">This is a tool to visualize different kinds of sorting algorithms</p>
          </div>
        </div>
        <div className="canvas-div">
        <Canvas />
        </div>
      </div>
    );

  }
}