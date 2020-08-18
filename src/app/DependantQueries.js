import React, { useState } from "react";
import { useCounts } from "./hooks/useCounts";
import { Spin, Button, Table } from "antd";
import { MessageColumns as columns } from "./TableColumns";

const DependantQueries = () => {
  const [fetchId, setFetchId] = useState(1);
  const [pageNo, setPageNo] = useState(1);
  const url =
    fetchId === 1
      ? "http://localhost:8000/message/msgCount"
      : "http://localhost:8000/payment/msgCount";

  const { data: msgCount, status, error } = useCounts("count", fetchId, url);
  const count = msgCount ? (msgCount.MsgCount > 0 ? true : false) : false;
  const { isIdle, data: messages } = useCounts(
    "messages",
    pageNo,
    `http://localhost:8000/message/all/:${pageNo}/:10`,
    { enabled: count }
  );

  if (status === "error") return <div> No Messages in the message Service</div>;
  if (status === "loading") return <Spin />;

  return (
    <div>
      <pre>{JSON.stringify(msgCount, null, 4)}</pre>
      <Button onClick={() => setFetchId(1)}>Click Me!</Button>
      <div>
        {!isIdle ? (
          messages ? (
            <div
              style={{ color: "red", float: "center", position: "relative" }}
            >
              <div style={{ overflowX: "auto" }}>
                <Table
                  dataSource={messages}
                  columns={columns}
                  scroll={{ x: 1200 }}
                  rowKey="GrpHdrMsgId"
                  onChange={(pagination) => {
                    console.log(pagination);
                    setPageNo(pagination.current);
                  }}
                  pagination={{
                    pageSize: 10,
                    total: 3000, // total count returned from backend
                  }}
                />
              </div>
            </div>
          ) : (
            "No Messages Found in the "
          )
        ) : (
          <Spin />
        )}
      </div>
    </div>
  );
};

export default DependantQueries;
