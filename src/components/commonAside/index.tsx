import { Layout, Menu, type MenuProps } from 'antd'
import { useNavigate } from 'react-router-dom'
import '@/main.css'
import MenuConfig from '@/config/index'

import { useAppDispatch } from '@/store'
import { type TTab, setCurrentMenu, setMenuList } from '@/store/reducer/tab'
import { iconToElement } from '@/utils/function'
import type { ItemType } from 'antd/es/menu/interface'

const { Sider } = Layout

type commonAsideProps = {
  collapsed: boolean
}

const CommonAside = ({ collapsed }: commonAsideProps) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const location = useLocation()

  //添加数据到store
  const setTabList = (value: TTab) => {
    dispatch(setMenuList(value))
  }

  //处理菜单数据
  const items: ItemType[] = MenuConfig.map((item) => {
    return {
      key: item.path,
      icon: iconToElement(item.icon),
      label: item.label,
      children: item.children?.length
        ? item.children.map((item) => {
            return {
              key: item.path,
              label: item.label,
              icon: iconToElement(item.icon),
            }
          })
        : undefined,
    }
  })

  const menuClick: MenuProps['onClick'] = (e) => {
    const data = MenuConfig.reduce<TTab>((acc, item) => {
      //如果长度大于一，说明有子菜单
      if (e.keyPath.length > 1) {
        const childItem = item.children?.find((child) => {
          return child.path === e.key
        })
        if (childItem) {
          return childItem
        }
      }
      //找到当前的数据（一级路由）
      if (e.key === item.path) {
        return item
      }
      return acc
    }, Object.create({}))
    setTabList({
      path: data.path,
      name: data.name,
      label: data.label,
    })
    dispatch(setCurrentMenu(data))
    navigate(e.key)
  }

  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <h3 className="app-name">{collapsed ? '后台' : '通用后台管理系统'}</h3>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['/home']}
        selectedKeys={[location.pathname]}
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
