import classNames from "classnames";
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome'

export type ThemeProps = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'light' | 'dark'
export interface IconProps extends FontAwesomeIconProps {
  theme?: ThemeProps;
}

export const Icon = (({
  theme,
  className,
  ...restProps
}: IconProps) => {
  const classes = classNames('icon', className, {
    [`icon-${theme}`]: theme
  })
  return (
    <FontAwesomeIcon className={classes} {...restProps} />
  )
})

export default Icon;