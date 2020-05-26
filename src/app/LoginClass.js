import React, { Component } from "react";
import { Select } from "antd";
import AreaChart from "../AreaChart.js";

const { Option } = Select;
class LoginClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropValue: "",
      loaded: false,
      label: [],
      msgReceived: [],
      msgProcessed: [],
      msgFailed: [],
    };
  }

  sortByProperty(property) {
    return function (a, b) {
      if (a[property] > b[property]) return 1;
      else if (a[property] < b[property]) return -1;
      return 0;
    };
  }

  generateChartdetails(response) {
    const data = response;
    data.sort(this.sortByProperty("ts"));
    const labels = [];
    const receivedData = [];
    const processedData = [];
    const failedData = [];
    let date;
    //time = response.hasOwnProperty("hour") ? true : false;
    //console.log(data.hasOwnProperty("hour"), response.hasOwnProperty("hour"));
    for (const item of data) {
      date = new Date(item.ts);
      date.setHours(date.getHours());
      const labelString =
        (date.getHours() === 0 ? "00" : date.getHours()) +
        " : " +
        (date.getMinutes() === 0 ? "00" : date.getMinutes());
      labels.push(labelString);
      receivedData.push(item.MessageReceivedSum);
      processedData.push(item.MessageProcessedSum);
      failedData.push(item.MessageFailedSum);
      console.log(labelString);
    }
    this.setState({
      label: labels,
      msgReceived: receivedData,
      msgProcessed: processedData,
      msgFailed: failedData,
      loaded: true,
    });
  }

  componentDidMount() {
    let startDate = new Date();
    startDate.setHours(0);
    startDate.setMinutes(0);
    startDate.setSeconds(0);
    let endDate = new Date();
    let url = `http://localhost:4000/api?startTs=${startDate}&endTs=${endDate}&minOrHour=hour`;
    fetch(url)
      .then((response) => response.json())
      .then((response) => {
        console.log("Returned Value ", response);
        const data = response;
        data.sort(this.sortByProperty("ts"));
        const labels = [];
        const receivedData = [];
        const processedData = [];
        const failedData = [];
        let date;

        for (const item of data) {
          date = new Date(item.ts);
          date.setHours(date.getHours());
          const labelString =
            (date.getHours() === 0 ? "00" : date.getHours()) +
            " : " +
            (date.getMinutes() === 0 ? "00" : date.getMinutes());
          labels.push(labelString);
          receivedData.push(item.MessageReceivedSum);
          processedData.push(item.MessageProcessedSum);
          failedData.push(item.MessageFailedSum);
          console.log(labelString);
        }
        this.setState({
          label: labels,
          msgReceived: receivedData,
          msgProcessed: processedData,
          msgFailed: failedData,
          loaded: true,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleChange = (value) => {
    this.setState({
      dropValue: value,
      loaded:false,
    });
    let url = "";
    let startDate = new Date();
    if (value === "1Hour") {
      startDate.setHours(startDate.getHours() - 1);
      let endDate = new Date();
      url = `http://localhost:4000/api?startTs=${startDate}&endTs=${endDate}&minOrHour=min`;
      console.log(`fetching for 1 hour with url ${url}`);
    } else if (value === "2Hours") {
      startDate.setHours(startDate.getHours() - 2);
      let endDate = new Date();
      url = `http://localhost:4000/api?startTs=${startDate}&endTs=${endDate}&minOrHour=min`;
      console.log(`fetching for 2 hours with url ${url}`);
    } else if (value === "Today") {
      startDate.setHours(0);
      let endDate = new Date();
      url = `http://localhost:4000/api?startTs=${startDate}&endTs=${endDate}&minOrHour=hour`;
      console.log(`fetching for today with url ${url}`);
    }
    if (url === "") {
      console.log("Choose the Correct Option");
    } else {
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          //console.log(data);
          this.generateChartdetails(data);
        })
        .catch((error) => console.error(error));
    }
  };
  render() {
    if (this.state.loaded) {
      return (
        <div>
          <Select
            defaultValue="Today"
            style={{ width: 120, textAlign: "left" }}
            bordered={false}
            value={this.state.dropValue}
            onChange={this.handleChange}
          >
            <Option value="1Hour">1 Hour</Option>
            <Option value="2Hours">2 Hours</Option>
            <Option value="Today">Today</Option>
            <Option value="Yesterday">Yesterday</Option>
            <Option value="Week">Week</Option>
            <Option value="Month">Month</Option>
          </Select>
          <div>
            You selected : {this.state.dropValue}
            <AreaChart
              labels={this.state.label}
              msgReceived={this.state.msgReceived}
              msgProcessed={this.state.msgProcessed}
              msgFailed={this.state.msgFailed}
            />{" "}
          </div>
        </div>
      );
    } else {
        return <p> Still Loading </p>
    }
  }
}

export default LoginClass;
