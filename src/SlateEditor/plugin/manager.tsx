import React from 'react';

import { RenderElementProps, RenderLeafProps } from 'slate-react';
import { DecoratedRange } from "slate";
import { SlatePlugin, PluginManager } from "../types/plugin/index";
import {CustomEditor } from "../types/editor/index"


export class SlatePluginManager implements PluginManager {
  private plugins: SlatePlugin[]
  
  constructor(plugins: SlatePlugin[] = []) {
    this.plugins = plugins
  }
  
  applyEditorExtensions(editor: CustomEditor): CustomEditor {
    return this.plugins.reduce((acc, plugin) => {
      return plugin.withEditor ? plugin.withEditor(acc) : acc
    }, editor)
  }
  
  getRenderElement() {
    return (props: RenderElementProps) => {
      // 按顺序查找第一个匹配的渲染函数
      for (const plugin of this.plugins) {
        if (plugin?.renderElement) {
          const element = plugin.renderElement(props)
          if (element) return element
        }
      }
      // 默认渲染
      return <p {...props.attributes}>{props.children}</p>
    }
  }
  
  getRenderLeaf() {
    return (props: RenderLeafProps) => {
      // 允许多个插件叠加处理
      let children = props.children
      
      this.plugins.forEach(plugin => {
        if (plugin?.renderLeaf) {
          const result = plugin.renderLeaf({ ...props, children })
          if (result) children = result
        }
      })
      
      return (<span {...props.attributes}>{children}</span>)
    }
  }
  
  getOnKeyDown() {
    return (event: React.KeyboardEvent, editor: CustomEditor) => {
      // 按顺序执行，直到有插件处理
      for (const plugin of this.plugins) {
        if (plugin.onKeyDown) {
          const handled = plugin.onKeyDown(event, editor)
          if (handled) {
            event.preventDefault()
            return true
          }
        }
      }
      return false
    }
  }
  
  getDecorates() {
    return this.plugins
      .filter(plugin => plugin.decorate)
      .map(plugin => plugin.decorate as unknown as (entry: any) => DecoratedRange[]);
  }
  
  getOnChanges() {
    return this.plugins
      .filter(plugin => plugin.onChange)
      .map(plugin => plugin.onChange!);
  }
  
  // 添加新插件（运行时扩展）
  addPlugin(plugin: SlatePlugin) {
    this.plugins.push(plugin)
  }
  
  // 移除插件
  removePlugin(key: string) {
    this.plugins = this.plugins.filter(p => p.key !== key)
  }
  
  // 获取所有插件
  getPlugins(): ReadonlyArray<SlatePlugin> {
    return this.plugins
  }
};