import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Menu, {MenuProps} from "./menu";
import MenuItem from "./menuItem";
import SubMenu from "./subMenu";

const testProps: MenuProps = {
  defaultIndex: '0',
  className: 'test',
  onSelect: jest.fn(),
}
const testVerticalProps: MenuProps = {
  defaultIndex: '0',
  mode: 'vertical',
}
const generateMenu = (props: MenuProps) => {
  return(
    <Menu {...props}>
      <MenuItem>
        test defaultProps
      </MenuItem>
      <MenuItem disabled>
        test disabled
      </MenuItem>
      <SubMenu title="dropdown">
        <MenuItem>
          drop 1
        </MenuItem>
        <MenuItem>
          drop 2
        </MenuItem>
      </SubMenu>
      <MenuItem>
        test active
      </MenuItem>
    </Menu >
  )
}
const createStyleFile = () => {
  const cssFile: string = `
    .submenu {
      display: none;
    }
    .submenu.menu-opened {
      display:block;
    }
  `
  const style = document.createElement('style')
  style.innerHTML = cssFile
  return style
}
describe('test Menu and MenuItem components', () => {
  it('should render corrent Menu and MenuItem based on default props', () => {
    render(generateMenu(testProps))
    const element = screen.getByText('test defaultProps')
    const menu = screen.getByTestId('test-menu') as HTMLElement
    expect(element).toBeInTheDocument()
    expect(element.tagName).toEqual('LI')
    expect(element).toHaveClass('menu-item is-active')
    expect(menu).toHaveClass('test menu')
    fireEvent.click(element)
    expect(testProps.onSelect).toHaveBeenCalled()
  })
  it('click items should change active and call the right callback', () => {
    render(generateMenu(testProps))
    const element = screen.getByText('test active')
    expect(element).toBeInTheDocument()
    expect(element).toHaveClass('menu-item')
    fireEvent.click(element)
    expect(element).toHaveClass('menu-item is-active')
    expect(testProps.onSelect).toHaveBeenCalledWith('3')
    const disabledElement = screen.getByText('test disabled')
    expect(disabledElement).toHaveClass('menu-item is-disabled')
    fireEvent.click(disabledElement)
    expect(disabledElement).not.toHaveClass('is-active')
    expect(testProps.onSelect).not.toHaveBeenCalledWith('1')
  })
  it('should render vertical mode when mode is set to vertical', () => {
    render(generateMenu(testVerticalProps))
    const element = screen.getByTestId('test-menu')
    expect(element).toHaveClass('menu-vertical')
  })
  it('should show dropdown items when hover on subMenu', async () => {
    render(generateMenu(testProps))
    const style = createStyleFile();
    document.head.appendChild(style);
    const dropdown = screen.getByText('dropdown')
    const drop = screen.getByText('drop 1')
    expect(drop).not.toBeVisible()
    fireEvent.mouseEnter(dropdown)
    await waitFor(() => {
      expect(drop).toBeVisible()
    })
    fireEvent.click(drop)
    expect(testProps.onSelect).toHaveBeenCalledWith('2-0')
    fireEvent.mouseLeave(dropdown)
    await waitFor(() => {
      expect(drop).not.toBeVisible()
    })
  })
})
