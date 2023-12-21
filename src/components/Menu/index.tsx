import Menu, { MenuProps } from './menu'
import SubMenu from './subMenu'
import MenuItem from './menuItem'

interface IMenuComponent extends MenuProps {
  Item: typeof MenuItem;
  SubMenu: typeof SubMenu;
}
// export type IMenuComponent = MenuProps & MenuComponents;

const TransMenu = Menu as unknown as IMenuComponent

TransMenu.Item = MenuItem
TransMenu.SubMenu = SubMenu

export default TransMenu;