import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as Sentry from '@sentry/browser';

Sentry.init({
 release: process.env.REACT_APP_RELEASE,
 dsn: "https://08180de465554bf3848fdc2034fff008@sentry.io/1376935"
});


class App extends Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };
  }
  handleChange = event => {
    this.setState({ value: event.target.value });
  };
  handleSubmit = event => {
    event.preventDefault();
    const { value } = this.state;
    if (value) {
      throw new Error(`Test error: ${value}`);
    }
  };
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">React + Sentry example app</h1>
        </header>
        <p>Type some text and submit to throw an error</p>
        <form onSubmit={this.handleSubmit}>
          <input onChange={this.handleChange} type="text" name="name" />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default App;
