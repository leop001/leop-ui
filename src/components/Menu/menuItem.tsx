import classNames from "classnames";
import React, {useContext} from "react";
import { MenuContext } from "./menu";
export interface MenuItemProps {
  index?: string,
  disabled?: boolean,
  className?: string,
  style?: React.CSSProperties,
  children?: React.ReactNode
}
const MenuItem = ({ 
  index,
  disabled = false,
  className,
  style,
  children
}: MenuItemProps) => {
  const context = useContext(MenuContext)
  const classes = classNames('menu-item', className, {
    'is-disabled': disabled,
    'is-active': context.index === index
  })
  const handleClick = () => {
    if (context.onSelect && !disabled && (typeof index === 'string')) {
      context.onSelect(index)
    }
  }
  return (
    <li className={classes} style={style} onClick={handleClick}>
      {children}
    </li>
  )
}
MenuItem.displayName = 'MenuItem'
export default MenuItem