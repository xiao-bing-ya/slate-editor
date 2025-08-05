import { RenderLeafProps } from 'slate-react';
import { EditorPlugin } from '../../types/plugin';
import { createLeafPlugin } from '../factory';

export const BOLD_KEY = 'bold';

export interface TextElement {
  [BOLD_KEY]?: boolean;
}

export const BoldPlugin: EditorPlugin = createLeafPlugin({
  key: 'bold',
  format: 'bold',
  match: (props: RenderLeafProps) => {
    return !!props.leaf[BOLD_KEY];
  },
});
