import React from 'react';
import { RenderElementProps } from 'slate-react';
import { EditorPlugin } from '../../types/plugin';
import { createBlockPlugin } from '../factory';

export const TABLE_ROW_BLOCK_KEY = 'table-row';

// 行
export const TableRowPlugin: EditorPlugin = createBlockPlugin({
  key: TABLE_ROW_BLOCK_KEY,
  format: TABLE_ROW_BLOCK_KEY,
  match: (props: RenderElementProps) => {
    return props.element.type === TABLE_ROW_BLOCK_KEY;
  },
  render: (props: RenderElementProps) => {
    const { attributes, children } = props;
    return (
      <tr {...attributes}>
        {children}
      </tr>
    );
  },
});