import type * as AllIcons from "@ant-design/icons";
type AllKeys = keyof typeof AllIcons;
type PickCapitalizeAsComp<K extends AllKeys> = K extends Capitalize<K>
  ? K
  : never;
export type IconNames = PickCapitalizeAsComp<AllKeys>;
export interface Item {
  path: string;
  name?: string;
  label: string;
  icon: IconNames;
  url?: string;
  children?: Item[];
}
export default [
  {
    path: "/home",
    name: "home",
    label: "首页",
    icon: "HomeOutlined",
    url: "/home/index",
  },
  {
    path: "/mall",
    name: "mall",
    label: "商品管理",
    icon: "ShopOutlined",
    url: "/mall/index",
  },
  {
    path: "/user",
    name: "user",
    label: "用户管理",
    icon: "UserOutlined",
    url: "/user/index",
  },
  {
    path: "/other",
    label: "其他",
    icon: "SettingOutlined",
    children: [
      {
        path: "/other/pageOne",
        name: "page1",
        label: "页面1",
        icon: "SettingOutlined",
      },
      {
        path: "/other/pageTwo",
        name: "page2",
        label: "页面2",
        icon: "SettingOutlined",
      },
    ],
  },
] as Item[];

export interface CountData {
  name: string;
  value: number;
  icon: IconNames;
  color: string;
}
