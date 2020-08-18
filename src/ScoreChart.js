import React, { useState, useEffect } from "react";
import moment from "moment-timezone";
import { Line } from "react-chartjs-2";
import { getHourlyMessagesPerSecond } from "./utils/UtilMethods";
import * as d3 from "d3";

const options = {
  legend: {
    display: true,
  },
  layout: {
    padding: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    },
  },
  responsive: true,
  elements: {
    line: {
      fill: false,
    },
  },
  scales: {
    yAxes: [
      {
        gridLines: {
          display: true,
          drawBorder: true,
          //tickMarkLength: 10,
        },
        ticks: {
          beginAtZero: true,
          min: 0,
        },
        scaleLabel: {
          display: true,
          labelString: "Number of Messages per second",
        },
      },
    ],
    xAxes: [
      {
        offset: true,
        ticks: {
          display: true,
          fontSize: 10,
          autoSkip: true,
          maxTicksLimit: 10,
          maxRotation: 0,
          minRotation: 0,
          //beginAtZero: true,
          //min: 0,
        },
        gridLines: {
          display: false,
          drawBorder: true,
          //tickMarkLength: 10,
        },
        scaleLabel: {
          display: true,
          labelString: "Interval (Time)",
        },
      },
    ],
  },
};

/*const data = {
  labels: ["10:00", "11:00", "12:00", "01:00", "02:00", "03:00", "04:00"],
  datasets: [
    {
      label: "Total number of messages",
      backgroundColor: "#F2A30F",
      borderColor: "#F2A30F",
      data: [2, 4, 5, 6, 7, 8, 10],
      pointBackgroundColor: "#0583F2",
      pointRadius: 3,
    },
    {
      label: "dfs number of messages",
      backgroundColor: "#F2A30F",
      borderColor: "#F2A30F",
      data: [2, 44, 5, 6, 37, 8, 110],
      pointBackgroundColor: "#0583F2",
      pointRadius: 3,
    },
  ],
};*/
const ScoreChart = () => {
  const [data, setData] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const chartData = getHourlyMessagesPerSecond();
    let [label, avg, min, max, today] = [[], [], [], [], []];
    console.log(chartData);
    chartData.forEach((item) => {
      label.push(moment(item[0].startDay).format("HH:mm"));
      let hdata = item.map((q) => {
        return q.msgCount;
      });
      today.push(hdata[hdata.length - 1]);
      hdata.length = hdata.length - 1;
      avg.push(Math.round(d3.mean(hdata)));
      min.push(d3.min(hdata));
      max.push(d3.max(hdata));
    });
    let chData = {
      labels: label,
      datasets: [
        {
          label: "Average",
          backgroundColor: "green",
          borderColor: "green",
          data: avg,
          pointBackgroundColor: "#0583F2",
        },
        {
          label: "Minimum",
          backgroundColor: "purple",
          borderColor: "purple",
          data: min,
          pointBackgroundColor: "#0583F2",
        },
        {
          label: "Maximum",
          backgroundColor: "red",
          borderColor: "red",
          data: max,
          pointBackgroundColor: "#0583F2",
        },
        {
          label: "Today",
          backgroundColor: "#F2A30F",
          borderColor: "#F2A30F",
          data: today,
          pointBackgroundColor: "#0583F2",
        },
      ],
    };
    setData(chData);
    setLoaded(true);
  }, []);
  return (
    <div style={{ height: "500px", width: "600px", textAlign: "center" }}>
      {loaded ? <Line data={data} options={options} /> : "Loading"}
    </div>
  );
};

export default ScoreChart;
