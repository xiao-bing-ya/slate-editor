import { Menu } from '@arco-design/web-react';
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
} from '@arco-design/web-react/icon';
import React from 'react';
import {
  ALIGN_KEY,
  BOLD_KEY,
  FONT_BASE_KEY,
  HYPER_LINK_KEY,
  INLINE_CODE_KEY,
  ITALIC_KEY,
  LINE_HEIGHT_KEY,
  STRIKE_THROUGH_KEY,
  UNDERLINE_KEY,
} from '../constant';
import './index.css';

const Banner = () => {
  return (
    <div>
      <Menu
        mode="pop"
        className="menu-toolbar-container"
        onMouseUp={(e) => e.stopPropagation()}
      >
        <Menu.Item key={BOLD_KEY}>
          <IconBold />
        </Menu.Item>
        <Menu.Item key={ITALIC_KEY}>
          <IconItalic />
        </Menu.Item>
        <Menu.Item key={UNDERLINE_KEY}>
          <IconUnderline />
        </Menu.Item>
        <Menu.Item key={STRIKE_THROUGH_KEY}>
          <IconStrikethrough />
        </Menu.Item>
        <Menu.Item key={INLINE_CODE_KEY}>
          <IconCode />
        </Menu.Item>
        <Menu.Item key={HYPER_LINK_KEY}>
          <IconLink />
        </Menu.Item>
        <Menu.Item key={FONT_BASE_KEY}>
          <IconFontColors />
        </Menu.Item>
        <Menu.Item key={LINE_HEIGHT_KEY}>
          <IconLineHeight />
        </Menu.Item>
        <Menu.SubMenu
          key={ALIGN_KEY}
          title={<IconAlignLeft />}
          triggerProps={{ trigger: 'click', position: 'bottom' }}
        >
          <Menu.Item key={`${ALIGN_KEY}.left`}>
            <div className="align-menu-center">
              <IconAlignLeft />
            </div>
          </Menu.Item>
          <Menu.Item key={`${ALIGN_KEY}.center`}>
            <div className="align-menu-center">
              <IconAlignCenter />
            </div>
          </Menu.Item>
          <Menu.Item key={`${ALIGN_KEY}.right`}>
            <div className="align-menu-center">
              <IconAlignRight />
            </div>
          </Menu.Item>
          <Menu.Item key={`${ALIGN_KEY}.justify`}>
            <div className="align-menu-center">
              <IconMenu />
            </div>
          </Menu.Item>
        </Menu.SubMenu>
      </Menu>
    </div>
  );
};

export default Banner;
