import type { IconNames, Item } from '@/config/index'
import * as AllIcons from '@ant-design/icons'
import { Layout, Menu, type MenuProps } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import '@/main.css'
import MenuConfig from '@/config/index'
import type { TabItem } from '@/store/reducer/tab'

import type { ItemType, SubMenuType } from 'antd/es/menu/interface'
import { setMenuList } from '@/store/reducer/tab'

const { Sider } = Layout
type commonAsideProps = {
	collapsed: boolean
}
const CommonAside = ({ collapsed }: commonAsideProps) => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	//添加数据到store
	const setTabList = (value: TabItem) => {
		// console.log(value, 'before add to tablist')
		dispatch(setMenuList(value))
	}
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
		const data: Item = {
			name: 'home',
			path: '/home',
			label: '首页',
			icon: 'HomeOutlined',
			url: '/home/index',
		}
		for (const items of MenuConfig) {
			//找到当前的数据（一级路由）
			if (items.path === e.keyPath[e.keyPath.length - 1]) {
				Object.assign(data, items)
				//如果长度大于一，说明有子菜单
				if (e.keyPath.length > 1 && items.children) {
					const newData = items.children.find((child) => {
						return child.path === e.key
					})
					if (newData) Object.assign(data, newData)
				}
			}
		}
		setTabList({
			path: data.path,
			name: data.name,
			label: data.label,
		})
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
