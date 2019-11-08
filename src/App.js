import React from "react";
import "./App.css";

const data = require("../src/data.json");

const names = data.reduce((accumulator, currentValue) => {
  if (accumulator.indexOf(currentValue.name) === -1) {
    accumulator.push(currentValue.name);
  }
  return accumulator;
}, []);

const months = [
  { January: 1 },
  { Febuary: 2 },
  { March: 3 },
  { April: 4 },
  { May: 5 },
  { June: 6 },
  { July: 7 },
  { August: 8 },
  { September: 9 },
  { October: 10 },
  { November: 11 },
  { December: 12 }
];

class App extends React.Component {
  state = {
    name: ""
  };

  calculatePoints = amount => {
    if (amount > 50 && amount < 100) {
      let points = Math.floor(amount) - 50;
      return points;
    }
    if (amount >= 100) {
      let points = (Math.floor(amount) - 100) * 2 + 50;
      return points;
    } else {
      return 0;
    }
  };

  totalPoints = data => {
    let total = 0;
    for (let i in data) {
      if (data[i].name === this.state.name) {
        let points = this.calculatePoints(data[i].transaction);
        total = total + points;
      }
    }
    return total;
  };

  onChange = e => {
    this.setState({ name: e.target.value });
  };

  pointsByMonth = data => {
    for (let i in months) {
      let month = data.date.split("-");
      month = parseInt(month[1]);
      if (month === i + 1) {
        return this.totalPoints(data[i]);
      }
    }
  };

  render() {
    return (
      <div className="App">
        <div className="input">
          <label>Customer Name</label>
          <input
            type="text"
            name="name"
            list="names"
            onChange={this.onChange}
          />
          <datalist id="names">
            {names.map(name => (
              <option>{name}</option>
            ))}
          </datalist>
        </div>
        <table>
          <tr>
            <th>Name: {this.state.name} </th>
            <th>Total Points: {this.totalPoints(data)}</th>
          </tr>
          <tr>
            {months.map((object, index) => {
              return <th>{Object.keys(object)}</th>;
            })}
            {data.map(data => {
              return <td>{this.pointsByMonth(data)}</td>;
            })}
          </tr>
        </table>
      </div>
    );
  }
}

export default App;
