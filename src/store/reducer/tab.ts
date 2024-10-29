import { createSlice } from '@reduxjs/toolkit'
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
	},
	reducers: {
		collapseMenu: (state) => {
			state.isCollapse = !state.isCollapse
		},
		selectMenuList: (state, { payload: value }) => {
			if (value.name !== 'home') {
				//如果已经存在的tag就不重复添加
				const result = state.tabList.findIndex(
					(item) => item.name === value.name,
				)
				if (result === -1) {
					state.tabList.push(value)
				}
			}
		},
	},
})

export const { collapseMenu, selectMenuList } = tabSlice.actions
export default tabSlice.reducer
