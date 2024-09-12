import React from "react";
import { Layout, Menu, theme } from "antd";
import { Link, Outlet } from "react-router-dom";

const { Header, Content, Footer } = Layout;
const LayoutWithRoutes: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const items1 = [
    { key: "1", label: <Link to="/advertisements">Объявления</Link> },
    { key: "2", label: <Link to="/orders">Заказы</Link> },
  ];

  return (
    <Layout>
      <Header style={{ display: "flex", alignItems: "center" }}>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["1"]}
          items={items1}
          style={{ flex: 1, minWidth: 0 }}
        />
      </Header>
      <Content style={{ padding: "0 48px" }}>
        <Layout
          style={{
            padding: "24px 0",
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Content style={{ padding: "0 24px", minHeight: 280 }}>
            <Outlet />
          </Content>
        </Layout>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </Layout>
  );
};

export default LayoutWithRoutes;
