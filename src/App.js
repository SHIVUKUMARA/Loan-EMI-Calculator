import React, { Component } from "react";
import CustomRange from "./Component/CustomRange";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: 10000,
      intrest: 1,
      tenure: 1,
      emi: 0,
      totalIntrest: 0,
      totalAmount: 0,
    };
    this.readAmount = this.readAmount.bind(this);
    this.readIntrest = this.readIntrest.bind(this);
    this.readTenure = this.readTenure.bind(this);
  }

  componentDidMount() {
    this.calculateEmi();
  }

  readAmount(val) {
    this.setState({ amount: val });
    this.calculateEmi();
  }

  readIntrest(val) {
    this.setState({ intrest: val });
    this.calculateEmi();
  }

  readTenure(val) {
    this.setState({ tenure: val });
    this.calculateEmi();
  }

  // EMI = p X r X (1 + r)^N / [(1 + r)^N-1]
  calculateEmi() {
    const { amount, intrest, tenure } = this.state;
    const P = amount;
    const N = tenure * 12;
    const r = intrest / (12 * 100);

    const emi = (P * r * Math.pow(1 + r, N)) / (Math.pow(1 + r, N) - 1);
    const totalAmount = emi * N;
    const totalIntrest = totalAmount - P;
    this.setState({
      emi: emi.toFixed(2),
      totalAmount: totalAmount.toFixed(2),
      totalIntrest: totalIntrest.toFixed(2),
    });
  }

  render() {
    return (
      <div className="main-container">
        <div className="title">
          <h1>Loan EMI Calculator</h1>
        </div>
        <div className="container">
          <div className="left">
            <CustomRange
              title={"Loan Amount"}
              val={this.state.amount}
              min={10000}
              max={10000000}
              step={10000}
              value={this.state.amount}
              unit={"Rs. "}
              handler={this.readAmount}
            />
            <CustomRange
              title={"Rate of Intrest (Per Anum)"}
              val={this.state.intrest}
              min={1}
              max={30}
              step={0.1}
              unit={"% "}
              value={this.state.intrest}
              handler={this.readIntrest}
            />
            <CustomRange
              title={"Loan Tenure"}
              val={this.state.tenure}
              min={1}
              max={30}
              step={1}
              unit={"Yr "}
              value={this.state.tenure}
              handler={this.readTenure}
            />
          </div>

          <div className="right">
            <h3>Monthly EMI = ₹{this.state.emi}</h3>
            <div className="right-bottom">
              <h3>Total Interest = ₹{this.state.totalIntrest}</h3>
              <h3>Total Amount = ₹{this.state.totalAmount}</h3>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
