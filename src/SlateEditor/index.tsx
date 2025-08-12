import React, { useCallback, useMemo } from 'react';
import { BaseEditor, createEditor, Node, NodeEntry } from 'slate';
import { withHistory } from 'slate-history';
import { Editable, ReactEditor, Slate, withReact } from 'slate-react';
import { SlatePluginManager } from './plugin/manager';
import { Banner } from './toolbar';
import { CustomEditor, SlateEditorProps } from './types/editor/index';
import { BoldPlugin, ItalicPlugin, UnderlinePlugin,InlineCodePlugin } from "./plugin";
import { EditorPlugin } from './types/plugin';

const createCustomEditor = (): CustomEditor => {
  return withReact(
    withHistory(createEditor() as ReactEditor & BaseEditor),
  ) as CustomEditor;
};

const builtInPlugins: EditorPlugin[] = [BoldPlugin,ItalicPlugin,UnderlinePlugin,InlineCodePlugin];

const SlateEditor = ({
  readOnly = false,
  initialValue = [],
  placeholder,
  plugins = [],
  className,
}: SlateEditorProps) => {

  // 创建插件管理器
  const pluginManager = useMemo(
    () => new SlatePluginManager([...builtInPlugins, ...plugins]),
    [plugins],
  );

  // 创建编辑器实例
  const editor = useMemo(() => {
    const baseEditor = createCustomEditor();
    return pluginManager.applyEditorExtensions(baseEditor);
  }, [pluginManager]);

  // 组合装饰器
  const decorate = useCallback(
    (entry: NodeEntry<Node>) => {
      const decorates = pluginManager.getDecorates();
      return decorates.flatMap((decorate) => decorate(entry));
    },
    [pluginManager],
  );

  // 渲染函数
  const renderElement = useCallback(pluginManager.getRenderElement(), [
    pluginManager,
  ]);

  const renderLeaf = useCallback(pluginManager.getRenderLeaf(), [
    pluginManager,
  ]);

  const handleKeyDown = useCallback(
    (event) => pluginManager.getOnKeyDown()(event, editor),
    [pluginManager, editor],
  );

  // 处理变化事件
  const handleChange = useCallback(
    (value: Node[]) => {
      const onChanges = pluginManager.getOnChanges();
      onChanges.forEach((onChange) => onChange(value, editor));
    },
    [editor, pluginManager],
  );

  // 获取插件key 对应的 type 之间的映射
  const Plugin_Key_Type = useMemo(() => {
    return (pluginManager.getPlugins()??[]).map(plugin => ({
      key: plugin.key,
      type:plugin.type
    }))
   },[pluginManager,editor])


  return (
    <div className={className}>
      <Slate
        editor={editor}
        initialValue={initialValue}
        onChange={handleChange}
      >
        <Banner pluginsMap={ Plugin_Key_Type} />
        <Editable
          readOnly={readOnly}
          placeholder={placeholder}
          decorate={decorate}
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          onKeyDown={handleKeyDown}
        />
      </Slate>
    </div>
  );
};

export default SlateEditor;
