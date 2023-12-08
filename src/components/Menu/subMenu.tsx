import classNames from "classnames";
import React, { FunctionComponentElement, useContext, useState } from "react";
import { MenuContext } from "./menu";
import { MenuItemProps } from "./menuItem";
import Icon from "../Icon/icon";

export interface SubMenuProps {
  index?: string;
  title: string;
  className?: string;
  children?: React.ReactNode;
}

const SubMenu = ({
  index,
  title,
  className,
  children
}: SubMenuProps) => {
  const context = useContext(MenuContext)
  const openedSubMenus = context.defaultOpenSubMenus as Array<string>
  const isOpened = (index && context.mode === 'vertical') ? openedSubMenus.includes(index) : false
  const [menuOpen, setOpen] = useState(isOpened)
  const classes = classNames('menu-item submenu-item', className, {
    'is-active': context.index === index,
    'is-vertical': context.mode === 'vertical',
    'is-opened': menuOpen
  })
  const handleClick = (e: React.MouseEvent) => {
    setOpen(!menuOpen)
  }
  let timer: any
  const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
    clearTimeout(timer)
    e.preventDefault()
    timer = setTimeout(() => {
      setOpen(toggle)
    }, 300)
  }
  const clickEvents = context.mode === 'vertical' ? {
    onClick: handleClick
  } : []
  const handleEvents = context.mode !== 'vertical' ? {
    onMouseEnter: (e: React.MouseEvent) => { handleMouse(e, true) },
    onMouseLeave: (e: React.MouseEvent) => { handleMouse(e, false) },
  } : {}

  const renderChildren = () => {
    const subMenuClasses = classNames('submenu', {
      'menu-opened': menuOpen
    })
    const childComponent = React.Children.map(children, (child, i) => {
      const childElement = child as FunctionComponentElement<MenuItemProps>
      const { displayName } = childElement.type
      if (displayName === 'MenuItem') {
        return React.cloneElement(childElement, {
          index: `${index}-${i}`
        })
      } else {
        console.error('Warning: SubMenu has a child which is not a MenuItem component')
      }
    })
    return (
      <ul className={subMenuClasses}>
        {childComponent}
      </ul>
    )
  }
  return (
    <li key={index} className={classes} {...handleEvents}>
      <div className="submenu-title" {...clickEvents}>
        {title}
        <Icon icon="angle-down" className="arrow-icon"></Icon>
      </div>
      {renderChildren()}
    </li>
  )
}

SubMenu.displayName = 'SubMenu'
export default SubMenu