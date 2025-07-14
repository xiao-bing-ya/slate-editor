import { defineConfig } from 'dumi';
import { defineThemeConfig} from "dumi-theme-antd/dist/defineThemeConfig";

export default defineConfig({
  outputPath: 'docs-dist',
  mfsu:false,
  themeConfig: defineThemeConfig({
    title: 'slate-editor',
    name: 'slate-editor',
    description: '基于 slate.js 构建的文档编辑器',
    bannerConfig: {
      showBanner:true
    },
    github:'',
    actions: [{ type: 'primary', text: '快速开始', link: '/components/markdown-editor' }]
  }),
  resolve: {
    docDirs:['docs']
  }
});
