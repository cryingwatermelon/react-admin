import type { RootState } from '@/store'
import type { TabItem } from '@/store/reducer/tab'
import { Space, Tag } from 'antd'
import { useSelector } from 'react-redux'
import { closeTab, setCurrentMenu } from '@/store/reducer/tab'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'

const CommonTag = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const location = useLocation()
	const tabList = useSelector((state: RootState) => state.tab.tabList)
	const currentMenu = useSelector((state: RootState) => state.tab.currentMenu)
	const handleClose = (item: TabItem, index: number) => {
		const length = tabList.length - 1

		dispatch(closeTab(item))
		if (item.path !== location.pathname) {
			return
		}
		//如果关闭的是当前的页面
		if (index === length) {
			//定位到前一个tab
			const currentTab = tabList[index - 1]
			// console.log(currentTab, 'currentTab')
			dispatch(setCurrentMenu(currentTab))
			// console.log(currentTab.name, '关闭的是最后一项')
			navigate(currentTab.path)
		} else {
			//如果tablist里存在至少一个数据，定位到后一个
			if (tabList.length > 1) {
				const nextTab = tabList[index + 1]
				// console.log(nextTab, 'nextTab')
				dispatch(setCurrentMenu(nextTab))
				// console.log(nextTab.name, '关闭的不是最后一项')
				navigate(nextTab.path)
			}
		}
	}
	const handleChange = (tab: TabItem) => {
		dispatch(setCurrentMenu(tab))
		// console.log(tab.label, 'handleChange')
		navigate(tab.path)
	}
	type setTagProps = {
		flag: boolean
		item: TabItem
		index: number
	}
	//处理tag显示的逻辑
	const setTag = ({ flag, item, index }: setTagProps) => {
		return flag ? (
			<Tag
				key={item.name}
				color="#55acee"
				closeIcon={item.label !== '首页'}
				onClose={() => {
					handleClose(item, index)
				}}
			>
				{item.label}
			</Tag>
		) : (
			<Tag
				color="#808a87"
				// closeIcon
				key={item.name}
				onClick={() => handleChange(item)}
				// onClose={() => handleClose(item, index)}
			>
				{item.label}
			</Tag>
		)
	}
	return (
		<Space size={[0, 8]} wrap className="pt-[24px] pl-[24px]">
			{currentMenu &&
				tabList.map((item, index) => {
					const flag = currentMenu.path === item.path
					return setTag({ flag, item, index })
				})}
		</Space>
	)
}

export default CommonTag
