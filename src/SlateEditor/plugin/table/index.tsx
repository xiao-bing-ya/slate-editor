import React from 'react';
import { Transforms } from 'slate';
import { RenderElementProps } from 'slate-react';
import { EditorPlugin } from '../../types/plugin';
import { createBlockPlugin } from '../factory';

// 表格
export const TABLE_BLOCK_KEY = 'table';
// 列
export const TABLE_CELL_BLOCK_KEY = 'table-cell';
// 行
export const TABLE_ROW_BLOCK_KEY = 'table-row';

export interface BlockElement {
  [TABLE_BLOCK_KEY]?: boolean;
}

// 表格
export const TablePlugin: EditorPlugin = createBlockPlugin({
  key: TABLE_BLOCK_KEY,
  format: TABLE_BLOCK_KEY,
  match: (props: RenderElementProps) => {
    return props.element.type === TABLE_BLOCK_KEY;
  },
  render: (props: RenderElementProps) => {
    const { attributes, children } = props;
    return (
      <table
        {...attributes}
        style={{ border: '1px solid #000', borderCollapse: 'collapse' }}
      >
        <tbody>{children}</tbody>
      </table>
    );
  },
  commands: {
    insertTable: (editor: any, rows = 3, cols = 3) => {
      const table: any = {
        type: TABLE_BLOCK_KEY,
        children: [],
      };

      for (let r = 0; r < rows; r++) {
        const row: any = {
          type: TABLE_ROW_BLOCK_KEY,
          children: [],
        };

        for (let c = 0; c < cols; c++) {
          row.children.push({
            type: TABLE_CELL_BLOCK_KEY,
            children: [{ text: '' }],
          });
        }

        table.children.push(row);
      }

      Transforms.insertNodes(editor, table);
    },
  },
});
