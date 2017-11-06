import React, { Component } from 'react';
import moment from 'moment';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

export default class ClassDetail　extends Component {
  constructor(props) {
    super(props);
    this.state = {
      all_elements: {
        date: '日期',
        range: '范围',
        student: '学生',
        teacher: '老师',
        teacher_type: '老师类型',
        class_times: '课时',
        class_type: '上课类型',
        gradle: '年级',
        manager: '学管',
        subject: '科目',
        addition: '备注'
      } };
  }
  render() {
    return (
      <Table>
        <TableHeader
          displaySelectAll={false}
          displayRowCheckbox={false}
        >
          <TableRow>
            {
                        this.props.show_elements.map((element) => (
                          <TableRowColumn>{this.state.all_elements[element]}</TableRowColumn>
                          )
                        )
                    }
          </TableRow>
        </TableHeader>
        <TableBody
          adjustForCheckbox={false}
          enableSelectAll={false}
          displayRowCheckbox={false}
        >
          {
                  this.props.class_list.map(
                    single_class => (
                      <TableRow>
                        {
                                this.props.show_elements.map(element => (
                                  <TableRowColumn>
                                    {single_class[element]}
                                  </TableRowColumn>
                                ))
                            }
                      </TableRow>
                    )
                  )
                }
        </TableBody>
      </Table>
    );
  }
}


ClassDetail.defaultProps = {
  show_elements: ['date', 'range', 'student', 'teacher',
    'teacher_type', 'class_times', 'class_type',
    'gradle', 'manager', 'subject', 'addition'],
  class_list: [
    {
      date: '11111',
      range: '111',
      student: '111',
      teacher: '',
      teacher_type: '',
      class_times: 2,
      class_type: '',
      gradle: 'x',
      manager: 'xxx',
      subject: 'xx',
      addition: 'xxx'
    }],
};
