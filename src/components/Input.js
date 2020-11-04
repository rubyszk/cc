import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';


export default class Currency extends Component {
  constructor() {
    super();
    this.state = {
      countries: [],
      countryCodes: [],
      baseCurrency: '',
      newCurrency: '',
      amount:'',
      conversion: ''
    }
  }

  componentDidMount() {
    const api = `https://data.fixer.io/api/symbols?access_key=8af875955272a02de85e98fc2e5dafbb`;
    
    fetch(api)
     .then(response => {
        return response.json();
    }).then(data => this.setState({
        countries: Object.values(data.symbols),
        countryCodes: data.symbols
    }));
  }

  changeBase = (e, v) => {  
    const getKey = (object, value) => {
      return Object.keys(object).find(key => object[key] === value);
    }
    this.setState({baseCurrency: getKey(this.state.countryCodes, v)});
  };

  changeNewCurrency = (e, v) => {  
    const getKey = (object, value) => {
      return Object.keys(object).find(key => object[key] === value);
    }
    this.setState({newCurrency: getKey(this.state.countryCodes, v)});
  };

  inputAmount = (e) => {
    this.setState({amount: e.target.value})
    if (e.target.value === ''){
      this.setState({conversion: ''})
    } 
  }

  onSubmit = () => {
    const api = `https://data.fixer.io/api/convert?access_key=8af875955272a02de85e98fc2e5dafbb&from=${this.state.baseCurrency}&to=${this.state.newCurrency}&amount=${this.state.amount}`;
    fetch(api)
     .then(response => {
        return response.json();
    }).then(data => this.setState({
      conversion: data.result
    }));
  };

  render () {
  return (
    <div>
    <div className="inputs">
      <Autocomplete
        className="auto"
        onChange={this.changeBase}
        id="from"
        style={{ width: 300 }}
        options={ this.state.countries}
        autoHighlight
        renderInput={(params) => (
          <TextField
            {...params}
            label="Choose a currency"
            variant="outlined"
          />
        )}
      />

      <Autocomplete
        className="auto"
        onChange={this.changeNewCurrency}
        id="to"
        style={{ width: 300 }}
        options={this.state.countries}
        autoHighlight
        renderInput={(params) => (
          <TextField
            {...params}
            label="Choose a currency"
            variant="outlined"
          />
        )}
      />
    </div>
    <div className="body">
      <Input type="number" className="input" onChange={this.inputAmount}/>
      <Input id="output" disabled={true} className="input" value={this.state.conversion === '' ? '' : this.state.conversion }/>
    </div>
      <Button 
        className="submit" 
        variant="contained"
        color="primary" 
        disabled={this.state.newCurrency && this.state.baseCurrency && this.state.amount > 0 ? false : true}
        onClick={this.onSubmit}> Submit </Button>
    </div>
  );
}

}