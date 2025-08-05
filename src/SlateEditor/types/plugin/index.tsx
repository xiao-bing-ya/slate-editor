import {
  CustomEditor,
  Editor,
  Node,
  NodeEntry,
  RenderElementProps,
  RenderLeafProps,
  DecoratedRange
} from '../editor/index';
import {Object } from "../../utils/index"

export const PLUGIN_TYPE = {
  BLOCK: "BLOCK" as const,
  INLINE: "INLINE" as const,
};

export type PluginType = Object.Keys<typeof PLUGIN_TYPE>;

// 插件接口定义
export interface SlatePlugin {
  /** 唯一标识符 */
  key: string;

  /** 编辑器增强函数 */
  withEditor?: <T extends Editor>(editor: T) => T;

  /** 渲染元素组件 */
  renderElement?: (props: RenderElementProps) => JSX.Element | null;

  /** 渲染叶子节点 */
  renderLeaf?: (props: RenderLeafProps) => JSX.Element | null;

  /** 键盘事件处理 */
  onKeyDown?: (
    event: React.KeyboardEvent,
    editor: CustomEditor,
  ) => boolean | void;

  /** 装饰器函数 */
  decorate?: (entry: NodeEntry<Node>) => Range[];

  /** 编辑器变化回调 */
  onChange?: (value: Node[], editor: CustomEditor) => void;
};

export type BlockPlugin = SlatePlugin & {
  type: typeof PLUGIN_TYPE.BLOCK;
  /** 块节点匹配插件 */
  match:(props: RenderElementProps)=> boolean;
  /** 渲染行节点 */
  renderLine?:()=> JSX.Element;
  /** 渲染块级子节点 */
  render?: () => JSX.Element|null;
  /** 注册的子节点插件 */
   WITH_LEAF_PLUGINS?: LeafPlugin[];
}

export type LeafPlugin  =  SlatePlugin &  {
  /** 块级节点类型 */
  type : typeof PLUGIN_TYPE.INLINE;
  /** 行内节点匹配插件 */
  match:(props: RenderLeafProps)=> boolean;
  /** 渲染行内节点 */
  render?:(props:RenderLeafProps)=> JSX.Element;
}

export type EditorPlugin = BlockPlugin | LeafPlugin;


// 插件管理器接口
export interface PluginManager {
  /** 应用所有插件到编辑器 */
  applyEditorExtensions: (editor: CustomEditor) => CustomEditor;
  
  /** 获取组合后的 renderElement 函数 */
  getRenderElement: () => (props: RenderElementProps) => JSX.Element;
  
  /** 获取组合后的 renderLeaf 函数 */
  getRenderLeaf: () => (props: RenderLeafProps) => JSX.Element;
  
  /** 获取组合后的 onKeyDown 函数 */
  getOnKeyDown: () => (event: React.KeyboardEvent, editor: CustomEditor) => void;
  
  /** 获取所有装饰器函数 */
  getDecorates: () => ((entry: NodeEntry<Node>) => DecoratedRange[])[];
  
  /** 获取所有 onChange 回调 */
  getOnChanges: () => ((value: Node[], editor: CustomEditor) => void)[];
};

