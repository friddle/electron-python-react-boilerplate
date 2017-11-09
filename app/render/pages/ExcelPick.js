// @flow
import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import CircularProgress from 'material-ui/CircularProgress';
import AppBar from 'material-ui/AppBar';
import style from './ExcelPick.css';
import ClassStatics from "../components/ClassStatics";


export default class ExcelPick extends Component {

  constructor(props) {
    super(props);
    this.state = { load: 'begin' };
  }

  onDrop(files) {
    this.setState({ load: 'running' });
    console.log(files[0].path);
    window.client.invoke_promise('import_excel', files[0].path, 'ClassDetail').then((result) => {
      this.setState({ load: result === true ? 'finish' : 'error' });
    }).catch((error) => {
      if (this.state.load !== 'error') {
        this.setState({ load: 'error' });
        alert(error);
      }
    });
  }

  excelText() {
    if (this.state.load === 'begin') {
      return '请选取Excel';
    }
    if (this.state.load === 'running') {
      return '正在加载中';
    }
    if (this.state.load === 'finish') {
      return '加载完成';
    }
    if (this.state.load === 'error') {
      return '加载错误';
    }
  }

  render() {
    if (this.state.load === 'finish') {
      return (<ClassStatics />);
    }
    const text = this.excelText();
    return (
      <div className="root_page">
        <AppBar title="弘实教育Excel分析" />
        <div className={style.container}>
          <div className={`${style.text}`} >{text}</div>
          <div className={`${style.view}`}>
            {
                (this.state.load === 'begin' || this.state.load === 'error') ? (
                  <Dropzone onDrop={this.onDrop.bind(this)} />
                      ) : (
                        <CircularProgress />
                      )
            }
          </div>
        </div>
      </div>
    );
  }
}

