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
  IconApps
} from '@arco-design/web-react/icon';
import React from 'react';
import { Editor } from 'slate';
import { useSlate } from 'slate-react';
import { PluginType,PLUGIN_TYPE } from '../../types/plugin/index';
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
import { toggleMark } from "../../utils/plugin";

const table_value = {
  type: 'table',
  children: [{
    type: 'table-row',
    children: [{
      type: 'table-cell',
      children: [{text:'1'}]
    },{
      type: 'table-cell',
      children: [{text:'2'}]
    },{
      type: 'table-cell',
      children: [{text:'3'}]
    },{
      type: 'table-cell',
      children: [{text:'4'}]
    }]
  }, {
     type: 'table-row',
    children: [{
      type: 'table-cell',
      children: [{text:'5'}]
    },{
      type: 'table-cell',
      children: [{text:'6'}]
    },{
      type: 'table-cell',
      children: [{text:'7'}]
    },{
      type: 'table-cell',
      children: [{text:'8'}]
    }]
  }]
};


const Banner = ({
  pluginsMap,
  CommandOperation
}: {
  pluginsMap: Array<{
    key: string;
    type: PluginType;
  }>;
  CommandOperation:Record<string,any>
}) => {
  const editor = useSlate();

  /**
   *
   * @param key 插件key
   * @param e
   * 实现思路：
   * 点击工具栏的时候，获取当前选区，然后对选区范围内的内容应用操作
   * 选中的节点是什么类型的，
   *  如果是 block 类型，工具栏不需要的进行置灰不可操作，可以操作的action则需要对整体操作
   *  如果是 inline 类型，工具栏不需要的进行置灰不可操作，可以操作的则需要对文本进行处理
   */

  const handleClickMenu = (key: string, e) => {
    // 获取当前选区
    const slateRange = editor.selection;
    if (!slateRange) return;

    const [node, path] = Editor.node(editor, slateRange.focus);
    // node 就是鼠标点击位置对应的节点
   
    const pluginInfo = pluginsMap.find(plugin => plugin.key === key);
    if (pluginInfo?.type === PLUGIN_TYPE.BLOCK) {
      // 块级节点插件
      if (key === "table") { 
        CommandOperation.insertTable(editor)
      }
    } else if (pluginInfo?.type === PLUGIN_TYPE.INLINE) {
      // 叶子节点操作
      toggleMark(editor, key as any);
    }
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
        <Menu.Item key='table'>
          <IconApps />
        </Menu.Item>
        <Menu.Item key={STRIKE_THROUGH_KEY}>
          <IconStrikethrough />
        </Menu.Item>
        <Menu.Item
          key={INLINE_CODE_KEY}
          onClick={() => {
            editor.addMark('inlineCode', true);
          }}
        >
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
