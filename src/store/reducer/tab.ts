import type { Item } from '@/config'
import type { RootState } from '@/store'
import { type PayloadAction, createSlice } from '@reduxjs/toolkit'

export type TTab = Pick<Item, 'path' | 'name' | 'label'>

type TTableState = {
  isCollapse: boolean
  tabList: TTab[]
  currentMenu: TTab
}

const initialState: TTableState = {
  isCollapse: false,
  tabList: [
    {
      path: '/',
      name: 'home',
      label: '首页',
    },
  ],
  currentMenu: {
    path: '/',
    name: 'home',
    label: '首页',
  },
}

const tabSlice = createSlice({
  name: 'tab',
  initialState,
  reducers: {
    collapseMenu: (state) => {
      state.isCollapse = !state.isCollapse
    },
    setMenuList: (state, { payload: value }: PayloadAction<TTab>) => {
      if (value.name !== 'home') {
        state.currentMenu = value
        //如果已经存在的tag就不重复添加
        const result = state.tabList.findIndex(
          (item) => item.name === value.name,
        )
        if (result === -1) {
          state.tabList.push(value)
        }
      } else if (value.name === 'home' && state.tabList.length === 1) {
        state.currentMenu = initialState.currentMenu
      }
    },
    closeTab: (state, { payload: value }: PayloadAction<TTab>) => {
      const res = state.tabList.findIndex((item) => item.name === value.name)
      state.tabList.splice(res, 1)
    },
    setCurrentMenu: (state, { payload: value }: PayloadAction<TTab>) => {
      if (value.name === 'home') {
        state.currentMenu = initialState.currentMenu
      } else {
        state.currentMenu = value
      }
    },
  },
})

export const selectTabList = (state: RootState) => state.tab.tabList
export const selectCurrentMenu = (state: RootState) => state.tab.currentMenu

export const { collapseMenu, setMenuList, closeTab, setCurrentMenu } =
  tabSlice.actions
export default tabSlice.reducer
