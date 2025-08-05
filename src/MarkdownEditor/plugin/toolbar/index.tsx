import React from 'react';
import { MenuItems } from "./menu";
import { Menu } from "@arco-design/web-react";
import './index.css';


const Toolbar = () => {
  return (
      <div className="hover-menu-container">
          <Menu className="menu-toolbar-container">
              <MenuItems />
          </Menu>
      </div>
  );
}

export default Toolbar;