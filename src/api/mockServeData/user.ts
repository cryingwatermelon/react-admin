import Mock from 'mockjs'

type TJSONValue = number | string | boolean | null

type TJSONArray = TJSONArray[] | TJSONValue[] | TJSONMap[]

interface TJSONMap {
	[key: string]: TJSONValue | TJSONArray | TJSONMap
}

// get请求从config.url获取参数，post从config.body中获取参数
function param2Obj<T extends TJSONMap>(url: string): T {
	const search = url.split('?')[1]
	if (!search) {
		return Object.create({})
	}
	return JSON.parse(
		`{"${decodeURIComponent(search)
			.replace(/"/g, '\\"')
			.replace(/&/g, '","')
			.replace(/=/g, '":"')}"}`,
	)
}

type TGender = 0 | 1

export type TUser = {
	id: string
	name: string
	addr: string
	age: number
	birth: string
	sex: TGender
}

let List: TUser[] = Array.from<null, TUser>({ length: 200 }, () =>
	Mock.mock({
		id: Mock.Random.guid(),
		name: Mock.Random.cname(),
		addr: Mock.mock('@county(true)'),
		age: Mock.Random.integer(18, 60),
		birth: Mock.Random.date(),
		sex: Mock.Random.integer(0, 1),
	}),
)

// const count = 200
// for (let i = 0; i < count; i++) {
// 	List.push(
// 		Mock.mock({
// 			id: Mock.Random.guid(),
// 			name: Mock.Random.cname(),
// 			addr: Mock.mock('@county(true)'),
// 			age: Mock.Random.integer(18, 60),
// 			birth: Mock.Random.date(),
// 			sex: Mock.Random.integer(0, 1),
// 		}),
// 	)
// }

type TGetMethodProps = {
	url: string
}

type TPostMethodProps = {
	body: string
}

export type TGetUserListParams = {
	name?: string
	page?: number
	limit?: number
}

export default {
	/**
	 * 获取列表
	 * 要带参数 name, page, limt; name可以不填, page,limit有默认值。
	 * @param {TGetMethodProps} config name, page, limit
	 */
	getUserList: (config: TGetMethodProps) => {
		const {
			name,
			page = 1,
			limit = 20,
		} = param2Obj<TGetUserListParams>(config.url)
		const mockList = List.filter((user) => {
			if (
				name &&
				user.name.indexOf(name) === -1 &&
				user.addr.indexOf(name) === -1
			)
				return false
			return true
		})
		const pageList = mockList.filter(
			(_, index) => index < limit * page && index >= limit * (page - 1),
		)
		return {
			code: 20000,
			count: mockList.length,
			list: pageList,
		}
	},

	/**
	 * 增加用户
	 * @param {TPostMethodProps} config name, addr, age, birth, sex
	 */
	createUser: (config: TPostMethodProps) => {
		const newValue = JSON.parse(config.body) as Omit<TUser, 'id'>
		List.unshift({
			id: Mock.Random.guid(),
			...newValue,
		})
		return {
			code: 20000,
			data: {
				message: '添加成功',
			},
		}
	},

	/**
	 * 删除用户
	 * @param {TPostMethodProps} config id
	 */
	deleteUser: (config: TPostMethodProps) => {
		const { id } = JSON.parse(config.body) as Pick<TUser, 'id'>
		if (!id) {
			return {
				code: -999,
				message: '参数不正确',
			}
		}
		List = List.filter((u) => u.id !== id)
		return {
			code: 20000,
			message: '删除成功',
		}
	},

	/**
	 * 批量删除
	 * @param config
	 */
	batchremove: (config: TGetMethodProps) => {
		const { ids } = param2Obj<{ ids: string }>(config.url)
		const batchRemoveIds = ids.split(',')
		List = List.filter((u) => !batchRemoveIds.includes(u.id))
		return {
			code: 20000,
			data: {
				message: '批量删除成功',
			},
		}
	},

	/**
	 * 修改用户
	 * @param {TPostMethodProps} config id, name, addr, age, birth, sex
	 */
	updateUser: (config: TPostMethodProps) => {
		const newValue = JSON.parse(config.body) as TUser
		List = List.map((u) => {
			if (u.id === newValue.id) {
				return {
					...newValue,
					id: u.id,
				}
			}
			return u
		})
		return {
			code: 20000,
			data: {
				message: '编辑成功',
			},
		}
	},
}
