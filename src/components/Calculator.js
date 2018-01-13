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
    error: ''
  };

  calculate = (result, value, operator) => {
    let calError = false;
    let calculatedValue = result;
    if (!value || !operator) {
      console.log('no value');
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
      if (value === '0') {
        calError = true;
      } else {
        calculatedValue /= value;
      }
    }

    calculatedValue = numeral(calculatedValue).format('0,0.0000').toString();
    return { calculatedValue, calError };
  }

  onClickFunction = (value) => {
    let { displayValue, currentValue, result, newValue, operator, error } = this.state;
    if (value != '+' && value != '-' && value != '*' && value != '/' && value != 'C' && value != '=') {
      displayValue = currentValue = (currentValue === '0' || newValue) ? value : currentValue + value;
      newValue = false;
      error = '';
      this.setState(() => ({ currentValue, newValue, displayValue, error }));
    } else if (value === 'C') {
      result = '';
      currentValue = displayValue = '0';
      newValue = true;
      operator = '';
      error = '';
      this.setState(() => ({ result, currentValue, newValue, error, displayValue, operator }));
    } else if (value === '=') {
      const { calculatedValue, calError } = this.calculate(result, currentValue, operator);
      displayValue = result = calculatedValue;
      currentValue = '0';
      operator = '';
      newValue = true;
      error = '';
      this.setState(() => ({ displayValue, newValue, result, currentValue, operator, error }));
    } else {
      if (result === '' || result === '0') {
        result = currentValue ? currentValue : result;
      } else {
        const { calculatedValue, calError } = this.calculate(result, currentValue, operator);
        displayValue = result = calculatedValue;
        this.setState(() => ({ displayValue, result }));
      }

      newValue = true;
      currentValue = '';
      operator = value;
      this.setState(() => ({ currentValue, result, operator, newValue }));
    }

    setTimeout(() => {
      console.log(this.state);
    }, 100);
  }

  render() {
    const { error, displayValue } = this.state;
    return (
      <div className="container">
        <br />
        <br />
        <div className="row">
          <div className="col-4 offset-4">
            <div>{error ? 'ERROR!!' : displayValue}</div>
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
