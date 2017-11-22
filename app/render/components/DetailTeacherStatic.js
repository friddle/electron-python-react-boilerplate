import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import FlatButton from 'material-ui/FlatButton';


export default class DetailTeacherStatic extends Component {
  constructor(props) {
    super(props);
    this.state = { attrs: [], select_subject: '英语' };
  }
  componentDidMount() {
    window.client.invoke_promise('GetTeacherDetailTimes').then(result => this.setState({ statics: result }));
  }
  selectItem(event, item) {
    this.setState({ select_subject: item });
  }
  renderSubjects() {
    const subjects = [...new Set(this.state.statics.map(staticx => staticx.subject.toString()))].filter(staticx => staticx != '学科');
    return (
      <RadioButtonGroup
        name="subject"
        defaultSelected={this.state.select_subject}
        onChange={this.selectItem.bind(this)}
        style={{ display: 'inline-flex' }}
      >
        {
                  subjects.map(subject =>
                      (
                        <RadioButton
                          value={subject}
                          length={subject}
                          label={subject}
                          style={{ height: '100%', width: 'auto' }}
                        />
                      )
                  )
              }
      </RadioButtonGroup>
    );
  }

  render() {
    if (this.state.statics === undefined) {
      return (<div>Empty</div>);
    }
    return (
      <div>
        {
              this.renderSubjects()
          }
        <Table>
          <TableBody displayRowCheckbox={false}>
            {
                            this.state.statics.filter(staticx => (staticx.subject.toString() === this.state.select_subject) ||
                            (staticx.subject.toString() === '学科')).map(staticx => (
                              <TableRow>
                                <TableRowColumn >{staticx.subject.toString()}</TableRowColumn>
                                <TableRowColumn >{staticx.teacher.toString()}</TableRowColumn>
                                <TableRowColumn >{staticx.class_type.toString()}</TableRowColumn>
                                <TableRowColumn >{staticx.total_time.toString()}</TableRowColumn>
                              </TableRow>
                            ))
            }
          </TableBody>
        </Table>
        <FlatButton onClick={() => { this.props.history.push('/static'); }}>查看下一项统计</FlatButton>
      </div>
    );
  }
}

