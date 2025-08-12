import { Descendant} from 'slate';
export type ParagraphElement = {
    type: 'paragraph'
    align?: string
    children: Descendant[]
};

// 定制的元素类型
export type CustomElement = ParagraphElement;  

export type CustomElementType = CustomElement['type'];

export const LIST_TYPES = ['numbered-list', 'bulleted-list'] as const;
export const TEXT_ALIGN_TYPES = ['left', 'center', 'right', 'justify'] as const;

export type AlignType = (typeof TEXT_ALIGN_TYPES)[number];
export type ListType = (typeof LIST_TYPES)[number];

export type CustomElementFormat = CustomElementType | AlignType | ListType;

export type CustomElementWithAlign = ParagraphElement;