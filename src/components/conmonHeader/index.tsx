// import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout, Button, Avatar, Dropdown, type MenuProps } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { collapseMenu } from "@/store/reducer/tab";

const { Header } = Layout;
const url =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvq0Th12s2DdB94TomTrlK3rEHVPKSF_Hj4Q&s";

type commonHeaderProps = {
  collapsed: boolean;
};
const CommonHeader = ({ collapsed }: commonHeaderProps) => {
  // console.log(collapsed, "commonHeader");
  const logout = () => {};
  const items: MenuProps["items"] = [
    {
      label: <a href="https://www.antgroup.com">个人中心</a>,
      key: "0",
    },
    {
      label: (
        <a href="https://www.aliyun.com" onClick={() => logout}>
          退出
        </a>
      ),
      key: "1",
    },
  ];
  //创建dispatch
  const dispatch = useDispatch();
  //侧边栏的展开收起
  const setCollapsed = () => {
    dispatch(collapseMenu());
  };
  return (
    <Header className="flex items-center justify-between ">
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        style={{
          fontSize: "16px",
          width: 64,
          height: 32,
          backgroundColor: "white",
        }}
        onClick={setCollapsed}
      />
      <Dropdown menu={{ items }} trigger={["click"]}>
        <Avatar src={<img src={url} alt="avatar" />} size={36} />
      </Dropdown>
    </Header>
  );
};

export default CommonHeader;
