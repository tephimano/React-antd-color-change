import React from "react";
import { Button, Layout } from "antd";

const { Header, Sider, Content, Footer } = Layout;
export default function login() {
  return (
    <Layout>
      <Header>Header</Header>
      <Layout>
        <Sider>Sider</Sider>
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
              Username : <input type="text" name="uname" />
              <br /> <br />
              Password : <input type="password" name="pword" /> <br />
              <Button type="primary">Submit</Button>
            </div>
          </Content>
          <Footer>Footer</Footer>
        </Layout>
      </Layout>
    </Layout>
  );
}
