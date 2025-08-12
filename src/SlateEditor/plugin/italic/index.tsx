import { RenderLeafProps } from 'slate-react';
import { EditorPlugin } from '../../types/plugin';
import { createLeafPlugin } from '../factory';

export const ITALIC_KEY = 'italic';

export interface TextElement {
  [ITALIC_KEY]?: boolean;
};

// 斜体
export const ItalicPlugin: EditorPlugin = createLeafPlugin({
  key: ITALIC_KEY,
  format: ITALIC_KEY,
  tagName: 'em',
  shortcut: {
    key: 'i',
    modifier: 'ctrlKey',
  },
  match: (props: RenderLeafProps) => {
    return !!props.leaf[ITALIC_KEY];
  },
});
