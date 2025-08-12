import {
  BaseEditor,
  Descendant,
} from 'slate';
import { HistoryEditor } from 'slate-history';
import { ReactEditor} from 'slate-react';
import {EditorPlugin } from '../plugin/index';

// 扩展编辑器类型
export type CustomEditor = BaseEditor &
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
  inlineCode?: boolean
  // MARKDOWN PREVIEW SPECIFIC LEAF
  title?: boolean
  list?: boolean
  hr?: boolean
  blockquote?: boolean
  text: string
};

// 文本节点可定制属性
export type CustomTextKey = keyof Omit<CustomText, 'text'>

export interface SlateEditorProps {
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

declare module 'slate' {
  interface CustomTypes {
    Editor: CustomEditor
    // Element: CustomElement
    Text: CustomText
    // Range: BaseRange & {
    //   [key: string]: unknown
    // }
  }
}

