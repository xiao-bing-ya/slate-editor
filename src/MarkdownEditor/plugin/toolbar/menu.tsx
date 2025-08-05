import { Menu } from "@arco-design/web-react";
import {
  IconAlignCenter,
  IconAlignLeft,
  IconAlignRight,
  IconBold,
  IconCode,
  IconFontColors,
  IconItalic,
  IconLineHeight,
  IconLink,
  IconMenu,
  IconStrikethrough,
  IconUnderline,
} from "@arco-design/web-react/icon";
import React from "react";

export const MenuItems = () => (
  <>
    <Menu.Item key='bold'>
      <IconBold />
    </Menu.Item>
    <Menu.Item key='italic'>
      <IconItalic />
    </Menu.Item>
    <Menu.Item key='underline'>
      <IconUnderline />
    </Menu.Item>
    <Menu.Item key='strike-through'>
      <IconStrikethrough />
    </Menu.Item>
    <Menu.Item key='inline-code'>
      <IconCode />
    </Menu.Item>
    <Menu.Item key='hyper-link'>
      <IconLink />
    </Menu.Item>
    <Menu.Item key='font-color'>
      <IconFontColors />
    </Menu.Item>
    <Menu.Item key='line-height'>
      <IconLineHeight />
    </Menu.Item>
    <Menu.SubMenu
      key='align'
      title={<IconAlignLeft />}
      popup
      triggerProps={{ trigger: "click", position: "bottom" }}
    >
      <Menu.Item key='align-left'>
        <div className="align-menu-center">
          <IconAlignLeft />
        </div>
      </Menu.Item>
      <Menu.Item key='align-center'>
        <div className="align-menu-center">
          <IconAlignCenter />
        </div>
      </Menu.Item>
      <Menu.Item key='align-right'>
        <div className="align-menu-center">
          <IconAlignRight />
        </div>
      </Menu.Item>
      <Menu.Item key='align-justify'>
        <div className="align-menu-center">
          <IconMenu />
        </div>
      </Menu.Item>
    </Menu.SubMenu>
  </>
);
