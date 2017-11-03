import React, { Component } from 'react';
import { observer } from 'mobx-react';
import styles from './Hello.css';

@observer
class Hello extends React.Component {
  constructor(props) {
    super(props);
    props.store.fetchHello();
  }
  render() {
    const { world } = this.props.store;
    return (
      <div>
        <div>
          <div className={styles.container} data-tid="container">
            <h2>{world}</h2>
          </div>
        </div>
      </div>);
  }
}

export default Hello;
