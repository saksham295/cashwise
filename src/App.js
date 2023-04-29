import {
  FileAddOutlined,
  CloudUploadOutlined,
  FileProtectOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Layout, Menu } from "antd";
import "./App.css";
import logo from "./assets/logo.png";
import entity from "./assets/entity.png";
import Tables from "./components/Tables";
const { Header, Content, Sider, Footer } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem("Document Generation", "document-generation", <FileAddOutlined />),
  getItem("Document Storage", "document-storage", <CloudUploadOutlined />, [
    getItem("Item 1", "1"),
    getItem("Item 2", "2"),
    getItem("Item 3", "3"),
  ]),
  getItem("Invoice Management", "invoice-Management", <FileProtectOutlined />, [
    getItem("New Invoice", "new-invoice"),
    getItem("Invoice Summary", "invoice-summary"),
    getItem("Client List", "client-list"),
  ]),
];
const App = () => {
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
          background: "#00204E",
        }}
        width={300}
      >
        <img src={logo} alt="logo" className="logo-img" />
        <div className="entity">
          <div style={{ display: "flex" }}>
            <img src={entity} alt="entity" className="entity-img" />
            <div className="entity-details">
              <p style={{ margin: 0 }}>Entity Name</p>
              <p
                style={{
                  margin: 0,
                  marginTop: 5,
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
              >
                Add Website
              </p>
            </div>
          </div>
          <div className="settings">
            <SettingOutlined
              style={{ color: "#f5f5f5", width: 20, cursor: "pointer" }}
            />
          </div>
        </div>
        <Menu
          style={{
            background: "#00204E",
            color: "white",
          }}
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout className="site-layout" style={{ marginLeft: 300 }}>
        <Header>
          <p style={{ fontSize: 20, color: "#323232" }}>Invoice Summary</p>
          <Avatar size={40} style={{ background: "#1161D6" }}>
            A
          </Avatar>
        </Header>
        <Content
          style={{
            margin: "0 16px",
          }}
        >
          <div
            style={{
              padding: 24,
              height: "100%",
              background: "white",
            }}
          >
            <Tables />
          </div>
        </Content>
        <Footer style={{ right: 0 }}>
          <Button
            size="large"
            style={{
              borderColor: "#1161D6",
              color: "#1161D6",
              marginRight: 15,
            }}
          >
            Upload Clients
          </Button>
          <Button type="primary" size="large" style={{ background: "#1161D6" }}>
            Add Client
          </Button>
        </Footer>
      </Layout>
    </Layout>
  );
};
export default App;
