import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';

export default class ClassStatics extends Component {
  constructor(props) {
    super(props);
    this.state = { attrs: [] };
  }
  componentDidMount() {
    window.client.invoke_promise('SumByTypeAndSubject').then(result => this.setState({ statics: result }));
  }
  render() {
    if (this.state.statics === undefined) {
      return (<div>Empty</div>);
    }
    return (
      <div>
        <Table >
          <TableBody>
            {
                this.state.statics.map(staticx => (
                  <TableRow>
                      <TableRowColumn >{staticx.subject}</TableRowColumn>
                      <TableRowColumn >{staticx.teacher_type}</TableRowColumn>
                      <TableRowColumn >{staticx.count}</TableRowColumn>
                      <TableRowColumn >{staticx.percent}</TableRowColumn>
                  </TableRow>
                ))
            }
          </TableBody>
        </Table>
      </div>
    );
  }
}


ClassStatics.propTypes = {
  select_attrs: PropTypes.array,
};

ClassStatics.defaultProps = {
  select_attrs: ['teacher_type',
    'subject'],
};
