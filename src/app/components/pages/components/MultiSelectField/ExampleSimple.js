import React, {Component} from 'react';
import MultiSelectField from '../../../../../components/MultiSelectField';

/**
 * `MultiSelectField` is implemented as a controlled component,
 * with the current selection set through the `value` property.
 * The `MultiSelectField` can be disabled with the `disabled` property.
 */
export default class MultiSelectFieldExampleSimple extends Component {
  state = {
    values: [],
  };

  dataSource = [
    {
      text: 'Never',
      value: 1,
    },
    {
      text: 'Every Night',
      value: 2,
    },
    {
      text: 'Weeknights',
      value: 3,
    },
    {
      text: 'Weekends',
      value: 4,
    },
    {
      text: 'Weekly',
      value: 5,
    },
  ];

  dataSourceConfig = {
    text: 'text',
    value: 'value',
  };

  handleAdd = (value) => {
    /* eslint-disable */
    console.log(value);
    /* eslint-enable */
    this.setState({
      values: this.state.values.concat(value),
    });
  };

  handleDelete = (value) => {
    this.setState({
      values: this.state.values.filter((v) => v !== value),
    });
  };

  render() {
    /* eslint-disable */
    // console.log(this.state.values);
    /* eslint-enable */

    return (
      <div>
        <MultiSelectField
          floatingLabelText="Frequency"
          value={this.state.values}
          dataSource={this.dataSource}
          dataSourceConfig={this.dataSourceConfig}
        />
      </div>
    );
  }
}
