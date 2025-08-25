import { Dropdown, Menu } from '@arco-design/web-react';
import React from 'react';
import { RenderElementProps } from 'slate-react';
import { EditorPlugin } from '../../types/plugin';
import { createBlockPlugin } from '../factory';
import { CustomEditor } from '../../types/editor';
import { Editor,Element,Transforms} from "slate";

export const TABLE_CELL_BLOCK_KEY = 'table-cell';

// 列
export const TableCellPlugin: EditorPlugin = createBlockPlugin({
  key: TABLE_CELL_BLOCK_KEY,
  format: TABLE_CELL_BLOCK_KEY,
  match: (props: RenderElementProps) => {
    return props.element.type === TABLE_CELL_BLOCK_KEY;
  },
  render: (props: RenderElementProps,editor:CustomEditor) => {
    const { attributes, children } = props;
    console.log(editor, "===editor")
    const handleClick = (key: string) => {
      const slateRange = editor.selection;
      if(!slateRange) return 
      const [node, path] = Editor.node(editor, slateRange.focus);
      console.log(node,path,editor,"==ppp")
      
      if (key === "1") { 
        // 插入行，需要看表格有几列
        //Transforms.insertNodes(editor, {}, {})
      }
      
    
      console.log(key,"===key")
     };
    return (
      <Dropdown
        trigger="contextMenu"
        position="bl"
        droplist={
          <Menu onClickMenuItem={handleClick}>
            <Menu.Item key="1">向上插入一行</Menu.Item>
            <Menu.Item key="2">向下插入一行</Menu.Item>
            <Menu.Item key="3">向左插入一列</Menu.Item>
            <Menu.Item key="4">向右插入一列</Menu.Item>
          </Menu>
        }
      >
        <td {...attributes} style={{ border: '1px solid #000', minWidth: 100 }}>
          {children}
        </td>
      </Dropdown>
    );
  },
});
