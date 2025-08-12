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
import { useSlate,ReactEditor } from "slate-react";
import { Editor } from 'slate';
import { PluginType,PLUGIN_TYPE} from "../../types/plugin/index";

const Banner = ({ pluginsMap }: {
  pluginsMap: Array<{
    key: string;
    type:PluginType
  }>
}) => {
  const editor = useSlate();

  /**
   * 
   * @param key 插件key
   * @param e 
   * 实现思路：
   * 找到鼠标当前的位置
   * 看是否有选区范围：
   * 选中的节点是什么类型的，
   *  如果是 block 类型，工具栏不需要的进行置灰不可操作，可以操作的action则需要对整体操作
   *  如果是 inline 类型，工具栏不需要的进行置灰不可操作，可以操作的则需要对文本进行处理
   */

  const handleClickMenu = (key: string, e) => {
    // 鼠标事件 e
const domRange = window.getSelection()?.getRangeAt(0);
if (domRange) {
  // 将 DOM Range 转为 Slate Range
  const slateRange = ReactEditor.toSlateRange(editor, domRange, { exactMatch: true });
  if (slateRange) {
    const [node, path] = Editor.node(editor, slateRange.focus);
    // node 就是鼠标点击位置对应的节点
  }
}
    // const pluginInfo = pluginsMap.find(plugin => plugin.key === key);
    // if (pluginInfo?.key === PLUGIN_TYPE.BLOCK) {
    //   // 块级节点插件
    // } else if (pluginInfo?.key === PLUGIN_TYPE.INLINE) { 
    //   // 叶子节点插件
    // }
    console.log(pluginInfo.type,pluginsMap,key,"===pluginType")
  };
  
  return (
    <div>
      <Menu
        mode="pop"
        className="menu-toolbar-container"
        onMouseUp={(e) => e.stopPropagation()}
        onClickMenuItem={handleClickMenu}
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
        <Menu.Item key={INLINE_CODE_KEY} onClick={() => { editor.addMark('inlineCode',true)}}>
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
