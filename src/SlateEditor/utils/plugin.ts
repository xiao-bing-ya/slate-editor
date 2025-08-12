import { CustomEditor, CustomTextKey } from '../types/editor';
import {
  AlignType,
  CustomElement,
  CustomElementFormat,
  CustomElementWithAlign,
  LIST_TYPES,
  ListType,
  TEXT_ALIGN_TYPES,
} from '../types/plugin/element';
import { Editor, Element ,Transforms} from "slate";

// 查看当前文本节点是否已经存在某个属性
export const isMarkActive = (editor: CustomEditor, format: CustomTextKey) => {
  const marks = Editor.marks(editor);
  return marks ? (marks as Record<string, unknown>)[format] === true : false;
};

// 切换文本节点的属性
// 如果属性已存在，则移除；如果不存在，则添加
export const toggleMark = (editor: CustomEditor, format: CustomTextKey) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

const isAlignElement = (
  element: CustomElement,
): element is CustomElementWithAlign => {
  return 'align' in element;
};

// 检查块类型是否处于激活状态
export const isBlockActive = (
  editor: CustomEditor,
  format: CustomElementFormat,
  blockType: 'type' | 'align' = 'type',
) => {
  const { selection } = editor;
  if (!selection) return false;

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (n) => {
        if (!Editor.isEditor(n) && Element.isElement(n)) {
          if (blockType === 'align' && isAlignElement(n)) {
            return n.align === format;
          }
          return n.type === format;
        }
        return false;
      },
    }),
  );

  return !!match;
};

const isAlignType = (format: CustomElementFormat): format is AlignType => {
  return TEXT_ALIGN_TYPES.includes(format as AlignType);
};

const isListType = (format: CustomElementFormat): format is ListType => {
  return LIST_TYPES.includes(format as ListType);
};

export const toggleBlock = (
  editor: CustomEditor,
  format: CustomElementFormat,
) => {
  const isActive = isBlockActive(
    editor,
    format,
    isAlignType(format) ? 'align' : 'type',
  );
  const isList = isListType(format);

  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) &&
      Element.isElement(n) &&
      isListType(n.type) &&
      !isAlignType(format),
    split: true,
  });
  let newProperties: Partial<Element>;
  if (isAlignType(format)) {
    newProperties = {
      align: isActive ? undefined : format,
    };
  } else {
    newProperties = {
      type: isActive ? 'paragraph' : isList ? 'list-item' : format,
    };
  }
  Transforms.setNodes<Element>(editor, newProperties);

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};
