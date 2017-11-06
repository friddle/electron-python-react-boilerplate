import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Checkbox from 'material-ui/Checkbox';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';

export default class ClassSum extends Component {
  constructor(props) {
    super(props);
    this.state = { attrs: [] };
  }
  async GetAttributes() {
    const attrs = {};
    this.props.select_attrs.forEach(async (attr) => {
      const result = await window.client.invoke_promise('SelectAttrByType', attr);
      attrs[attr] = result;
    });
    return attrs;
  }
  componentDidMount() {
    this.GetAttributes().then(result => this.setState({ attrs: result }));
  }
  render() {
    if (this.state.attrs.length === 0) {
      return (<div />);
    }
    debugger;
    return (
      <div>
        {
                this.props.select_attrs.map(
                    (attr) => (
                      <div>
                        <p>{attr}</p>
                        <RadioButtonGroup name="shipSpeed" defaultSelected={this.state.attrs[attr][0]} style={{color:"white"}}>
                          {
                                this.state.attrs[attr].map((single_value) => (
                                  <RadioButton
                                      value={}
                                    label={single_value}
                                  />
                                    )
                                )
                            }
                        </RadioButtonGroup>
                      </div>
                    )
                )
        }
      </div>
    );
  }
}


ClassSum.propTypes = {
  select_attrs: PropTypes.array,
};

ClassSum.defaultProps = {
  select_attrs: ['teacher_type',
    'subject'],
};
