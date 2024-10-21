import type { IconNames } from '@/config'
import * as AllIcons from '@ant-design/icons'

// export const iconToElement = (name: IconNames, width?: string) => {
//   const AntdIcon = AllIcons[name];
//   return (
//     <AntdIcon
//       value=""
//       style={{ fontSize: width, textAlign: "center", marginTop: "10px" }}
//     />
//   );
// };

export const iconToElement = (
	name: IconNames,
	props: React.HTMLAttributes<HTMLSpanElement> = {},
) => {
	const AntdIcon = AllIcons[name]
	return <AntdIcon {...props} />
}
