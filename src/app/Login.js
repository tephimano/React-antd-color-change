import React, { useState, useEffect } from "react";
import { Button, Layout, Select } from "antd";
import AreaChart from "../AreaChart.js";

const { Header, Sider, Content, Footer } = Layout;
const { Option } = Select;
export default function Login() {
  const [dropValue, setDropValue] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [label, setLabel] = useState([]);
  const [msgReceived, setMsgReceived] = useState([]);
  const [msgProcessed, setMsgProcessed] = useState([]);
  const [msgFailed, setMsgFailed] = useState([]);

  let date = new Date();
  date.setHours(9);
  date.setDate(26);
  date.setMinutes(0);
  date.setSeconds(0);
  let totalMessages;
  let totalProcessed;
  let totalFailed;
  let messageType = "rtp";

  const onSubmitHandle = () => {
    const time = "2020-05-22 09:15:00.836-04";
    fetch("http://localhost:4000/api", {
      method: "post",
      body: JSON.stringify({
        messageType: "rtp",
        messageReceived: "890",
        messageProcessed: "800",
        messageFailed: "90",
        time: time,
      }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Resturned from Server : ", data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
  }

  const onApiHandle = () => {
    messageType = messageType === "rtp" ? "other" : "rtp";
    let min;
    let max;
    if (messageType === "rtp") {
      min = 750;
      max = 1000;
    } else {
      min = 200;
      max = 500;
    }
    totalMessages = Math.ceil(randomNumber(min, max));
    totalProcessed = Math.ceil(
      randomNumber(totalMessages - 100, totalMessages)
    );
    totalFailed = Math.ceil(totalMessages - totalProcessed);
    console.log(
      totalMessages,
      " : ",
      totalProcessed,
      " : ",
      totalFailed,
      " : ",
      date,
      " : ",
      messageType
    );
    fetch("http://localhost:4000/api", {
      method: "post",
      body: JSON.stringify({
        messageType: messageType,
        messageReceived: totalMessages,
        messageProcessed: totalProcessed,
        messageFailed: totalFailed,
        time: date,
      }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Resturned from Server : ", data);
      })
      .catch((error) => {
        console.log(error);
      });
    date.setMinutes(date.getMinutes() + 15);
  };

  function sortByProperty(property) {
    return function (a, b) {
      if (a[property] > b[property]) return 1;
      else if (a[property] < b[property]) return -1;
      return 0;
    };
  }

  //"http://localhost:4000/api?messageType=rtp&&startTs=2020-05-17&endTs=2020-05-19"
  //"http://localhost:4000/api?startTs=2020-05-17&endTs=2020-05-19"

  useEffect(() => {
    let startDate = new Date();
    startDate.setHours(0);
    startDate.setMinutes(0);
    startDate.setSeconds(0);
    let endDate = new Date();
    let url = `http://localhost:4000/api?startTs=${startDate}&endTs=${endDate}&interval=hour`;
    fetch(url)
      .then((response) => response.json())
      .then((response) => {
        console.log("Returned Value ", response);
        const data = response;
        data.sort(sortByProperty("ts"));
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
        setLabel(labels);
        setMsgReceived(receivedData);
        setMsgProcessed(processedData);
        setMsgFailed(failedData);
        setLoaded(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const onHelloHandle = () => {
    fetch("http://localhost:4000/hello", { method: "post" })
      .then((response) => response.json())
      .then((response) => {
        console.log("Returned Value ", response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  /* function getMonday(currentDate) gives the first day of the work week */
  function getMonday(d) {
    d = new Date(d);
    var day = d.getDay(),
      diff = d.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
    return new Date(d.setDate(diff));
  }

  /**
   * Generates the parameters for the Area chart
   * @param {data from the fetch} response
   * @param {generate labels according to day, hours, minutes} label
   */
  function generateChartdetails(response, label) {
    const data = response;
    data.sort(sortByProperty("ts"));
    const labels = [];
    const receivedData = [];
    const processedData = [];
    const failedData = [];
    let date;
    let labelString;
    //time = response.hasOwnProperty("hour") ? true : false;
    //console.log(data.hasOwnProperty("hour"), response.hasOwnProperty("hour"));
    for (const item of data) {
      date = new Date(item.ts);
      if (label === "Week") {
        date.setDate(date.getDate() + 1);
        labelString = date.toLocaleString("en-us", { weekday: "long" });
      } else {
        labelString =
          (date.getHours() === 0 ? "00" : date.getHours()) +
          " : " +
          (date.getMinutes() === 0 ? "00" : date.getMinutes());
      }

      labels.push(labelString);
      receivedData.push(item.MessageReceivedSum);
      processedData.push(item.MessageProcessedSum);
      failedData.push(item.MessageFailedSum);
      console.log(labelString);
    }
    setLabel([...labels]);
    setMsgReceived([...receivedData]);
    setMsgProcessed([...processedData]);
    setMsgFailed([...failedData]);
    setLoaded(true);
  }

  /* Called when the value in the dropdown changes */
  const handleChange = (value) => {
    setDropValue(value);
    setLoaded(false);
    let url = "";
    let startDate = new Date();
    if (value === "1Hour") {
      startDate.setHours(startDate.getHours() - 1);
      let endDate = new Date();
      url = `http://localhost:4000/api?startTs=${startDate}&endTs=${endDate}&interval=min`;
      console.log(`fetching for 1 hour with url ${url}`);
    } else if (value === "2Hours") {
      startDate.setHours(startDate.getHours() - 2);
      let endDate = new Date();
      url = `http://localhost:4000/api?startTs=${startDate}&endTs=${endDate}&interval=min`;
      console.log(`fetching for 2 hours with url ${url}`);
    } else if (value === "Today") {
      startDate.setHours(0);
      let endDate = new Date();
      url = `http://localhost:4000/api?startTs=${startDate}&endTs=${endDate}&interval=hour`;
      console.log(`fetching for today with url ${url}`);
    } else if (value === "Yesterday") {
      startDate.setDate(startDate.getDate() - 1);
      startDate.setHours(0);
      startDate.setMinutes(0);
      let endDate = new Date();
      endDate.setDate(endDate.getDate() - 1);
      endDate.setHours(23);
      endDate.setMinutes(59);
      url = `http://localhost:4000/api?startTs=${startDate}&endTs=${endDate}&interval=hour`;
      console.log(`fetching for today with url ${url}`);
    } else if (value === "Week") {
      startDate = getMonday(startDate);
      startDate.setHours(0);
      startDate.setMinutes(0);
      let endDate = new Date();
      url = `http://localhost:4000/api?startTs=${startDate}&endTs=${endDate}&interval=day`;
      console.log(`fetching for today with url ${url}`);
    }
    if (url === "") {
      console.log("Choose the Correct Option");
    } else {
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          generateChartdetails(data, value);
        })
        .catch((error) => console.error(error));
    }

    /* if (value === "1Hour") {
      const date = new Date();
      const startHour = date.getHours() - 1;
      const startMinutes = 0;
      const labelsArr = [];
      var count = 0;
      while(count<5) {
        var dateString = (startHour.length > 1 ? startHour : '00') + ":" + (startMinutes.length > 1 ? startHour : '00') ;
        labelsArr.push();
        count++;
      }
      setLabels(labelsArr);
      console.log(startHour);
    }*/
  };
  if (loaded) {
    return (
      <Layout style={{ height: "100vh" }}>
        <Header>Header</Header>
        <Layout>
          <Sider collapsible breakpoint="lg">
            Sider
          </Sider>
          <Layout>
            <Content>
              <div
                style={{
                  textAlign: "center",
                  lineHeight: "25px",
                  padding: "2px",
                }}
              >
                {" "}
                <br />
                Username : <input type="text" name="uname" />
                <br /> <br />
                Password : <input type="password" name="pword" /> <br />
                <br />
                <Button type="submit" onClick={onSubmitHandle}>
                  Submit
                </Button>
                <Button type="submit" onClick={onHelloHandle}>
                  Hello
                </Button>
                <Select
                  defaultValue="Today"
                  style={{ width: 120, textAlign: "left" }}
                  bordered={false}
                  value={dropValue}
                  onChange={handleChange}
                >
                  <Option value="1Hour">1 Hour</Option>
                  <Option value="2Hours">2 Hours</Option>
                  <Option value="Today">Today</Option>
                  <Option value="Yesterday">Yesterday</Option>
                  <Option value="Week">Week</Option>
                </Select>
                <div> </div>
                <div>
                  You selected : {dropValue} {label}
                  <AreaChart
                    labels={label}
                    msgReceived={msgReceived}
                    msgProcessed={msgProcessed}
                    msgFailed={msgFailed}
                  />{" "}
                </div>
              </div>
            </Content>
            <Footer></Footer>
          </Layout>
        </Layout>
      </Layout>
    );
  } else {
    return (
      <Layout style={{ height: "100vh" }}>
        <Header>Header</Header>
        <Layout>
          <Sider collapsible breakpoint="lg">
            Sider
          </Sider>
          <Layout>
            <Content>
              <div
                style={{
                  textAlign: "center",
                  lineHeight: "25px",
                  padding: "2px",
                }}
              >
                {" "}
                <br />
                Username : <input type="text" name="uname" />
                <br /> <br />
                Password : <input type="password" name="pword" /> <br />
                <br />
                <Button type="submit" onClick={onSubmitHandle}>
                  Submit
                </Button>
                <Button type="submit" onClick={onHelloHandle}>
                  Hello
                </Button>
                <Select
                  defaultValue="Today"
                  style={{ width: 120, textAlign: "left" }}
                  bordered={false}
                  value={dropValue}
                  onChange={handleChange}
                >
                  <Option value="1Hour">1 Hour</Option>
                  <Option value="2Hours">2 Hours</Option>
                  <Option value="Today">Today</Option>
                  <Option value="Yesterday">Yesterday</Option>
                  <Option value="Week">Week</Option>
                </Select>
                <div> You selected : {dropValue}</div>
                <AreaChart
                  labels={label}
                  msgReceived={msgReceived}
                  msgProcessed={msgProcessed}
                  msgFailed={msgFailed}
                />
              </div>
            </Content>
            <Footer></Footer>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}
/*
                <Button
                  type="submit"
                  style={{ diabled: false }}
                  onClick={onApiHandle}
                >
                  display get sum with query
                </Button>
                <Button
                  type="submit"
                  style={{ disabled: false }}
                  onClick={onApiHandle}
                >
                  display get sum with query
                </Button>
*/
