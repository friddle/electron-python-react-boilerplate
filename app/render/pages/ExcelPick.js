// @flow
import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import CircularProgress from 'material-ui/CircularProgress';
import AppBar from 'material-ui/AppBar';
import style from './ExcelPick.css';
import ClassStatics from '../components/ClassStatics';
import { Link } from 'react-router-dom';


export default class ExcelPick extends Component {
  constructor(props) {
    super(props);
    debugger;
    this.state = { load: 'begin' };
  }

  onDrop(files) {
    this.setState({ load: 'running' });
    console.log(files[0].path);
    window.client.invoke_promise('import_excel_async', files[0].path).then((result) => {
      this.setState({ load: result === true ? 'running' : 'error' });
      const job = setTimeout(this.getStatus.bind(this), 1000);
      console.log(`setJob:${job}`);
      this.setState({ job });
    }).catch((error) => {
      if (this.state.load !== 'error') {
        this.setState({ load: 'error' });
        alert(error);
      }
    });
  }
  getStatus() {
    window.client.invoke_promise('status_import').then(result => {
      console.log(`invoke ready get answer:${result}`);
      if (result.toString() === 'finish') {
        this.setState({ load: 'finish' });
      } else {
        setTimeout(this.getStatus.bind(this), 1000);
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
                        ) : (this.state.load !== 'finish') ? (
                          <CircularProgress />
                        ) : (<Link className={style.container_text} to="/teacher">统计页面</Link>)
                    }
          </div>
        </div>
      </div>
    );
  }
}

