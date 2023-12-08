import Button, {ButtonSize, ButtonType} from "./components/Button/button";
import Menu from "./components/Menu/menu";
import MenuItem from "./components/Menu/menuItem";
import SubMenu from "./components/Menu/subMenu";
import Icon from "./components/Icon/icon";
import {library} from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Icon icon="coffee" theme="primary"></Icon>
        <Menu defaultIndex='0' onSelect={(index) => {console.log(index)}} defaultOpenSubMenus={['1']}>
          <MenuItem>
            item 1
          </MenuItem>
          <MenuItem disabled>
            item 2
          </MenuItem>
          <SubMenu title="drop">
            <MenuItem>
              item 1
            </MenuItem>
            <MenuItem>
              item 2
            </MenuItem>
          </SubMenu>
          <MenuItem>
            item 3
          </MenuItem>
        </Menu>
        <Menu defaultIndex='0' mode="vertical" onSelect={(index) => {console.log(index)}} defaultOpenSubMenus={['1']}>
          <MenuItem>
            item 1
          </MenuItem>
          <MenuItem disabled>
            item 2
          </MenuItem>
          <SubMenu title="drop">
            <MenuItem>
              item 1
            </MenuItem>
            <MenuItem>
              item 2
            </MenuItem>
          </SubMenu>
          <MenuItem>
            item 3
          </MenuItem>
        </Menu>

        <Button disabled>button</Button>
        <Button btnType={ButtonType.Primary} size={ButtonSize.Large}>button</Button>
        <Button btnType={ButtonType.Danger} size={ButtonSize.Small}>button</Button>
        <Button btnType={ButtonType.Link} href="https://www.baidu.com">baidu</Button>
        <Button btnType={ButtonType.Link} disabled href="https://www.baidu.com">baidu</Button>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
