import React, { useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { Button } from "antd";

const fetchData = async () => {
  const { data } = await axios.get("http://localhost:8000/healthCheck");
  //const data = await response.data;
  return data;
};
const DisplayChart = () => {
  const [fetchId, setFetchId] = useState(1);
  const { data: result, status, error, isFetching } = useQuery(
    ["firstFetch", fetchId],
    fetchData
  );
  if (!result) return <div>Loading ....</div>;
  if (status === "error") {
    return <div>Error : {error.message}</div>;
  }
  return (
    <div>
      Returned data : {fetchId} : {result.statusMessage}
      <Button
        type="primary"
        onClick={() => {
          setFetchId((fetchId) => fetchId + 1);
        }}
      >
        Click
      </Button>
      <div>{isFetching ? "Background Updating " : ""}</div>
      <br />
    </div>
  );
};

export default DisplayChart;
