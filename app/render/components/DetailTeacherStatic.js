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
import { FlatButton } from 'material-ui/FlatButton';

export default class DetailTeacherStatic extends Component {
  constructor(props) {
    super(props);
    this.state = { attrs: [] };
  }
  componentDidMount() {
    window.client.invoke_promise('GetTeacherDetailTimes').then(result => this.setState({ statics: result }));
  }
  render() {
    if (this.state.statics === undefined) {
      return (<div>Empty</div>);
    }
    return (
      <div>
        <RadioButtonGroup name="shipSpeed" defaultSelected="not_light">
          <RadioButton
            value="light"
            label="英语"
          />
          <RadioButton
            value="not_light"
            label=" by default"
          />
          <RadioButton
            value="ludicrous"
            label="Custom icon"
          />
        </RadioButtonGroup>
        <Table adjustForCheckbox={false} >
          <TableBody>
            {
                            this.state.statics.map(staticx => (
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
      </div>
    );
  }
}

