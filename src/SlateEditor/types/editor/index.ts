import {
  BaseEditor,
  DecoratedRange,
  Descendant,
  Editor,
  Node,
  NodeEntry,
  Element,
  Transforms
} from 'slate';
import { HistoryEditor } from 'slate-history';
import { ReactEditor, RenderElementProps, RenderLeafProps } from 'slate-react';
import {EditorPlugin } from '../plugin/index';

// 扩展编辑器类型
type CustomEditor = BaseEditor &
  ReactEditor &
  HistoryEditor & {
    // 可添加自定义编辑器方法
    pluginMethod?: () => void;
};

// 文本节点属性
export type CustomText = {
  bold?: boolean
  italic?: boolean
  code?: boolean
  underline?: boolean
  strikethrough?: boolean
  // MARKDOWN PREVIEW SPECIFIC LEAF
  underlined?: boolean
  title?: boolean
  list?: boolean
  hr?: boolean
  blockquote?: boolean
  text: string
};

// 文本节点可定制属性
export type CustomTextKey = keyof Omit<CustomText, 'text'>

interface SlateEditorProps {
  // 初始值
  initialValue?: Descendant[];

  // 占位符文本
  placeholder?: string;

  // 只读模式
  readOnly?: boolean;

  // 自定义插件列表
  plugins?: EditorPlugin[];

  // 自定义类名
  className?: string;
};

export {
  BaseEditor,
  CustomEditor,
  DecoratedRange,
  Descendant,
  Editor,
  HistoryEditor,
  Node,
  NodeEntry,
  ReactEditor,
  RenderElementProps,
  RenderLeafProps,
  SlateEditorProps,
  Element,
  Transforms
};
