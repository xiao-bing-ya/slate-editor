import type { RenderLeafProps } from 'slate-react';
import { EditorPlugin } from '../../types/plugin';
import { createLeafPlugin } from '../factory';

export const INLINE_CODE_KEY = 'inlineCode';

export interface TextElement {
  [INLINE_CODE_KEY]?: boolean;
}

// 字体加粗
export const InlineCodePlugin: EditorPlugin = createLeafPlugin({
  key: INLINE_CODE_KEY,
  format: INLINE_CODE_KEY,
  tagName: 'code',
  shortcut: {
    key: 'c',
    modifier: 'ctrlKey',
  },
  match: (props: RenderLeafProps) => {
    return !!props.leaf[INLINE_CODE_KEY]
  },
});