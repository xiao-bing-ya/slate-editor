import { RenderLeafProps } from 'slate-react';
import { EditorPlugin } from '../../types/plugin';
import { createLeafPlugin } from '../factory';

export const UNDERLINE_KEY = 'underline';

export interface TextElement {
  [UNDERLINE_KEY]?: boolean;
};

// 下划线
export const UnderlinePlugin: EditorPlugin = createLeafPlugin({
  key: UNDERLINE_KEY,
  format: UNDERLINE_KEY,
  tagName: 'u',
  shortcut: {
    key: 'u',
    modifier: 'ctrlKey',
  },
  match: (props: RenderLeafProps) => {
    return !!props.leaf[UNDERLINE_KEY];
  },
});
