import React, { Component } from "react";

class CustomRange extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="range-input">
        <div className="top">
          <span className="top-title">{this.props.title}</span>
          <span className="val">
            {this.props.val} {this.props.unit}
          </span>
        </div>

        <div className="bottom">
          <input
            type="range"
            name={this.props.name}
            id={this.props.id}
            value={this.props.value}
            onChange={(e) => this.props.handler(e.target.value)}
            min={this.props.min}
            max={this.props.max}
            step={this.props.step}
          />
        </div>
      </div>
    );
  }
}

export default CustomRange;
