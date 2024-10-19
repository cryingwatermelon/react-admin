import { Layout, theme } from "antd";
import CommonAside from "@/components/commonAside";
import CommonHeader from "@/components/conmonHeader";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";

const { Content } = Layout;
const Main: React.FC = () => {
  // const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  //获取展开收起的状态
  const collapsed = useSelector((state: RootState) => state.tab.isCollapse);
  return (
    <Layout className="main-container">
      <CommonAside collapsed={collapsed} />
      <Layout>
        <CommonHeader collapsed={collapsed} />
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Main;
