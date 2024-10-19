import * as AllIcons from "@ant-design/icons";
import { Menu, Layout } from "antd";
import type { IconNames } from "@/config/index";

import "@/main.css";
import MenuConfig from "@/config/index";

import type { ItemType, SubMenuType } from "antd/es/menu/interface";

const { Sider } = Layout;
type commonAsideProps = {
  collapsed: boolean;
};
const CommonAside = ({ collapsed }: commonAsideProps) => {
  // const [collapsed, setCollapsed] = useState(false);
  //处理菜单数据
  const iconToElement = (name: IconNames) => {
    // return React.createElement(
    //   AllIcons[name] as React.ClassType<any, any, any>
    // );
    const AntdIcon = AllIcons[name];
    return <AntdIcon value="" />;
  };

  const items: ItemType[] = MenuConfig.map((icon) => {
    const child = {
      key: icon.path,
      icon: iconToElement(icon.icon),
      label: icon.label,
    };
    if (icon.children) {
      (child as SubMenuType).children = icon.children.map((item) => {
        return {
          key: item.path,
          label: item.label,
          icon: iconToElement(item.icon),
        };
      });
    }
    return child;
  });
  // const onClick: MenuProps["onClick"] = () => {
  // console.log("click", e);
  // };
  // console.log(collapsed, "commonAside");
  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <h3 className="app-name">{collapsed ? "后台" : "通用后台管理系统"}</h3>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["/home"]}
        // items={[
        //   {
        //     key: "1",
        //     icon: <UserOutlined />,
        //     label: "nav 1",
        //   },
        //   {
        //     key: "2",
        //     icon: <VideoCameraOutlined />,
        //     label: "nav 2",
        //   },
        //   {
        //     key: "3",
        //     icon: <UploadOutlined />,
        //     label: "nav 3",
        //   },
        // ]}
        items={items}
        style={{
          height: "100%",
        }}
        // onClick={onClick}
      />
    </Sider>
  );
};

export default CommonAside;
