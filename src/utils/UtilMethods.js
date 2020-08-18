import moment from "moment-timezone";

export const sortByProperty = function (property) {
  return function (a, b) {
    if (a[property] > b[property]) return 1;
    else if (a[property] < b[property]) return -1;
    return 0;
  };
};

export const changeData = (data) => {
  if (data) console.log(JSON.stringify(data));
  if (data) data.MsgCount = data.MsgCount + 1;
  return data;
};

export const getHourlyMessagesPerSecond = () => {
  let startDay = moment().add(-1, "week").startOf("day").format();
  let endDay = moment().startOf("hour").format();
  let [dataArray, msgCount] = [[], 0];

  while (startDay <= endDay) {
    msgCount = Math.round(Math.random() * 40 + 5);
    dataArray.push({ startDay, msgCount });
    startDay = moment(startDay).add(1, "hour").format();
  }

  let startToday = moment().startOf("day").format();
  let nowHour = moment().format();

  let hourWiseData = [];

  while (startToday <= nowHour) {
    let condition = moment(startToday).format("HH:mm");
    console.log(startToday);
    hourWiseData.push(
      dataArray.filter((p) => {
        return moment(p.startDay).format("HH:mm") === condition;
      })
    );
    startToday = moment(startToday).add(1, "Hour").format();
  }

  return hourWiseData;
};
