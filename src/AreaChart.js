import React, { Component } from "react";

import { Line } from "react-chartjs-2";

class AreaChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: {
        responsive: true,
        elements: {
          line: {
            fill: false,
          },
        },
      },
      data: {
        labels: this.props.labels,
        datasets: [
          {
            label: "Messages Processed",
            backgroundColor: "#97f2f3",
            borderColor: "#97f2f3",
            data: this.props.msgProcessed,
          },
          {
            label: "Total number of messages",
            backgroundColor: "#89aeb2",
            borderColor: "#89aeb2",
            data: this.props.msgReceived,
          },
          {
            label: "Messages Failed",
            backgroundColor: "#b19cd9",
            borderColor: "#180018",
            data: this.props.msgFailed,
          },
        ],
      },
    };
  }
  render() {
    return (
      <div style={{ position: "relative" }} className="area-chart-container">
        <Line options={this.state.options} data={this.state.data} />
      </div>
    );
  }
}

export default AreaChart;
