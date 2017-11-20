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
import { Button } from 'material-ui';

export default class ClassStatics extends Component {
  constructor(props) {
    super(props);
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
        <Table adjustForCheckbox={false} >
          <TableBody>
            {
                this.state.statics.map(staticx => (
                  <TableRow>
                    <TableRowColumn >{staticx.subject.toString()}</TableRowColumn>
                    <TableRowColumn >{staticx.teacher_type.toString()}</TableRowColumn>
                    <TableRowColumn >{staticx.count.toString()}</TableRowColumn>
                    <TableRowColumn >{staticx.percent.toString()}</TableRowColumn>
                  </TableRow>
                ))
            }
          </TableBody>
        </Table>
        <Button>下个统计信息</Button>
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
