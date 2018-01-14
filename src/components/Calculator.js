import React, { Component } from 'react';
import numeral from 'numeral';

import Block from './Block';

class Calculator extends Component {
  state = {
    displayValue: '0',
    result: '',
    currentValue: '0',
    newValue: true,
    operator: '',
    error: false
  };

  formatString(value) {
    const formattedValue = numeral(value).value();
    return numeral(formattedValue).format('0,0[.][00000]').toString();
  }

  calculate = (result, value, operator) => {
    let calError = false;
    let calculatedValue = result;
    if (!value || !operator) {
      return { calculatedValue, calError };
    }

    calculatedValue = numeral(calculatedValue).value();
    value = numeral(value).value();
    if (operator === '+') {
      calculatedValue += value;
    } else if (operator === '-') {
      calculatedValue -= value;
    } else if (operator === '*') {
      calculatedValue *= value;
    } else if (operator === '/') {
      if (value === 0) {
        calError = true;
      } else {
        calculatedValue /= value;
      }
    }

    calculatedValue = calculatedValue.toString();
    return { calculatedValue, calError };
  }

  onClickFunction = (value) => {
    let { displayValue, currentValue, result, newValue, operator, error } = this.state;
    if (value != '+' && value != '-' && value != '*' && value != '/' && value != 'C' && value != '=') {
      displayValue = currentValue = newValue ? value : currentValue + value;
      newValue = false;
      result = operator ? result : '';
      error = false;
    } else if (value === 'C') {
      result = '';
      currentValue = displayValue = '0';
      newValue = true;
      operator = '';
      error = false;
    } else if (value === '=') {
      if (error) {
        return;
      }
      const { calculatedValue, calError } = this.calculate(result, currentValue, operator);
      error = calError;
      result = calculatedValue;
      displayValue = result ? result : '0';
      currentValue = '0';
      operator = '';
      newValue = true;
    } else {
      if (error) {
        return;
      }
      if (result === '' || result === '0') {
        result = currentValue ? currentValue : result;
        error = false;
      } else {
        const { calculatedValue, calError } = this.calculate(result, currentValue, operator);
        error = calError;
        displayValue = result = calculatedValue;
      }

      newValue = true;
      currentValue = '';
      operator = value;
    }

    if (error) {
      displayValue = '0';
      currentValue = '';
      result = '';
      operator = '';
      newValue = true;
    }

    this.setState(() => ({ displayValue, currentValue, result, operator, newValue, error }));
  }

  render() {
    const { error, displayValue } = this.state;
    return (
      <div className="container">
        <br />
        <br />
        <div className="row">
          <div className="col-4 offset-4">
            <div>{error ? 'ERROR!!' : this.formatString(displayValue) }</div>
          </div>
        </div>
        <br />
        <div className="d-flex flex-row row-hl justify-content-center">
          <Block title={'7'} onClickFunction={this.onClickFunction} />
          <Block title={'8'} onClickFunction={this.onClickFunction} />
          <Block title={'9'} onClickFunction={this.onClickFunction} />
          <Block title={'+'} onClickFunction={this.onClickFunction} />
        </div>
        <div className="d-flex flex-row row-hl justify-content-center">
          <Block title={'4'} onClickFunction={this.onClickFunction} />
          <Block title={'5'} onClickFunction={this.onClickFunction} />
          <Block title={'6'} onClickFunction={this.onClickFunction} />
          <Block title={'-'} onClickFunction={this.onClickFunction} />
        </div>
        <div className="d-flex flex-row row-hl justify-content-center">
          <Block title={'1'} onClickFunction={this.onClickFunction} />
          <Block title={'2'} onClickFunction={this.onClickFunction} />
          <Block title={'3'} onClickFunction={this.onClickFunction} />
          <Block title={'*'} onClickFunction={this.onClickFunction} />
        </div>
        <div className="d-flex flex-row row-hl justify-content-center">
          <Block title={'C'} onClickFunction={this.onClickFunction} />
          <Block title={'0'} onClickFunction={this.onClickFunction} />
          <Block title={'='} onClickFunction={this.onClickFunction} />
          <Block title={'/'} onClickFunction={this.onClickFunction} />
        </div>
      </div>
    );
  }
}

export default Calculator;
