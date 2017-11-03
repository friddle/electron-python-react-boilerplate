import React, { Component } from 'react';
import { observer } from 'mobx-react';
import styles from './App.css';

@observer
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { hello: 'world' };
  }

  componentWillMount() {
    window.client.invoke('hello', 'HelloWorld', (error, result) => { this.setState({ hello: result }); });
  }

  render() {
    return (
      <div>
        <div>
          <div className={styles.container} data-tid="container">
            <h2>{this.state.hello}</h2>
          </div>
        </div>
      </div>
    );
  }
}

