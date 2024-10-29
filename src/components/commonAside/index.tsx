import type { IconNames } from '@/config/index'
import * as AllIcons from '@ant-design/icons'
import { Layout, Menu, type MenuProps } from 'antd'
import { useNavigate } from 'react-router-dom'

import '@/main.css'
import MenuConfig from '@/config/index'

import type { ItemType, SubMenuType } from 'antd/es/menu/interface'

const { Sider } = Layout
type commonAsideProps = {
  collapsed: boolean
}
const CommonAside = ({ collapsed }: commonAsideProps) => {
  const navigate = useNavigate()
  //处理菜单数据
  const iconToElement = (name: IconNames) => {
    const AntdIcon = AllIcons[name]
    return <AntdIcon value="" />
  }

  const items: ItemType[] = MenuConfig.map((icon) => {
    const child = {
      key: icon.path,
      icon: iconToElement(icon.icon),
      label: icon.label,
    }
    if (icon.children) {
      ;(child as SubMenuType).children = icon.children.map((item) => {
        return {
          key: item.path,
          label: item.label,
          icon: iconToElement(item.icon),
        }
      })
    }
    return child
  })
  const menuClick: MenuProps['onClick'] = (e) => {
    // console.log(e, 'menu click')
    navigate(e.key)
  }

  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <h3 className="app-name">{collapsed ? '后台' : '通用后台管理系统'}</h3>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['/home']}
        items={items}
        style={{
          height: '100%',
        }}
        onClick={menuClick}
      />
    </Sider>
  )
}

export default CommonAside
