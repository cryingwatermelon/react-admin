import { createSlice } from '@reduxjs/toolkit'

export type TabItem = {
	path: string
	name?: string
	label: string
}
const tabSlice = createSlice({
	name: 'tab',
	initialState: {
		isCollapse: false,
		tabList: [
			{
				path: '/',
				name: 'home',
				label: '首页',
			},
		],
		currentMenu: { path: '/' },
	},
	reducers: {
		collapseMenu: (state) => {
			state.isCollapse = !state.isCollapse
		},
		setMenuList: (state, { payload: value }) => {
			if (value.name !== 'home') {
				state.currentMenu = value
				//如果已经存在的tag就不重复添加
				const result = state.tabList.findIndex(
					(item) => item.name === value.name,
				)
				if (result === -1) {
					state.tabList.push(value)
				}
				// console.log(state.tabList, 'after push')
			}
		},
		closeTab: (state, { payload: value }) => {
			const result = state.tabList.findIndex((item) => item.name === value.name)
			state.tabList.splice(result, 1)
		},
		setCurrentMenu: (state, { payload: value }) => {
			if (value.name === 'home') {
				state.currentMenu = { path: '/' }
			} else {
				state.currentMenu = value
			}
		},
	},
})

export const { collapseMenu, setMenuList, closeTab, setCurrentMenu } =
	tabSlice.actions
export default tabSlice.reducer
