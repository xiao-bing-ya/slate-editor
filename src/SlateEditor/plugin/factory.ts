import React from 'react';
import {
  CustomEditor,
  CustomTextKey,
  Editor,
  RenderElementProps,
} from '../types/editor/index';
import { BlockPlugin, EditorPlugin, LeafPlugin } from '../types/plugin/index';
import {   CustomElementFormat } from '../types/plugin/element';
import { toggleBlock, toggleMark } from '../utils/plugin';

/**
 * 通用插件工厂函数
 * @param plugin 插件定义对象
 * @returns 标准化的插件对象
 */
export const createSlatePlugin = (plugin: EditorPlugin): EditorPlugin => {
  // 这里可以做一些通用的校验或默认值处理
  if (!plugin.key) {
    throw new Error('Plugin must have a unique "key" property');
  }
  return plugin;
};

// 块级节点插件工厂函数
export const createBlockPlugin = ({
  key,
  format,
  render,
  shortcut,
  match,
  withEditor: customWithEditor,
  ...rest
}: Omit<BlockPlugin, 'type'> & {
  format: CustomElementFormat;
  render: (props: RenderElementProps) => JSX.Element | null;
  shortcut?: {
    key: string;
    modifier: 'ctrlKey' | 'shiftKey' | 'altKey';
  };
  withEditor?: <T extends Editor>(editor: T) => T;
  }): BlockPlugin => {
  
  const plugin: BlockPlugin = {
    key,
    type: 'BLOCK',
    match,
  };

  plugin.withEditor = <T extends Editor>(editor: T): T => {
    // 添加切换块方法
    (editor as any)[`toggle${key.charAt(0).toUpperCase() + key.slice(1)}`] =
      () => {
        toggleBlock(editor, format);
      };

    // 自定义编辑器增强
    if (customWithEditor) {
      const enhancedEditor = customWithEditor(editor as any) as T;
      return enhancedEditor;
    }

    return editor;
  };

  plugin.renderElement = ({ attributes, children, element }) => {
    return render({ attributes, children, element });
  };

  plugin.onKeyDown = (event: React.KeyboardEvent, editor: CustomEditor) => {
    if (shortcut && event.key === shortcut.key && event[shortcut.modifier]) {
      toggleBlock(editor, format);
      return true;
    }
    return false;
  };

  return createSlatePlugin({ ...plugin, ...rest }) as BlockPlugin;
};

// 文本节点插件工厂函数
export const createLeafPlugin = ({
  key,
  match,
  style = {},
  tagName = 'span',
  shortcut,
  format,
  ...rest
}: Omit<LeafPlugin, 'type'> & {
  style?: React.CSSProperties;
  tagName?: string;
  format: CustomTextKey;
  shortcut?: {
    key: string;
    modifier: 'ctrlKey' | 'shiftKey' | 'altKey';
  };
}) => {
  const plugin: LeafPlugin = {
    key,
    match,
    type: 'INLINE',
  };

  plugin.render = ({ attributes, children }) => {
    return React.createElement(
      tagName,
      {
        ...attributes,
        style,
        className: `format-${format}`,
      },
      children,
    );
  };

  plugin.onKeyDown = (event: React.KeyboardEvent, editor: CustomEditor) => {
    if (shortcut && event.key === shortcut.key && event[shortcut.modifier]) {
      toggleMark(editor, format);
      return true;
    }
    return false;
  };
  return createSlatePlugin({ ...plugin, ...rest }) as LeafPlugin;
};
