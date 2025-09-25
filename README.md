# 🌟 Floria's Wonderland

一个充满创意的个人网站，采用手帐风格设计，记录生活、分享想法、展示作品。

**🌐 线上地址**: [floria-next-wonderland.onrender.com](https://floria-next-wonderland.onrender.com)
*（免费部署，首次访问可能需要等待 30 秒唤醒）*

## ✨ 核心功能

### 🎨 **作品展示 (Lab)**
- 项目展示与技术分享
- Bug/Idea 反馈收集系统
- 实时状态管理与分类展示

### 📝 **博客系统**
- Markdown 支持，语法高亮
- 文章置顶与分类管理
- 目录导航与阅读体验优化

### 💌 **Letters (论坛)**
- 富文本编辑器 (TipTap)
- 评论系统与消息通知
- GitHub 登录集成

### 🗺️ **旅行记录**
- Mapbox 地图集成
- 地理位置标记与游记

### 🎭 **交互体验**
- 3D 场景与动画效果
- 响应式设计，适配各端
- 暗色/亮色主题切换

### 🗂️ **反馈系统**
- 全局悬浮反馈按钮
- Bug/Idea 快速提交
- GitHub 认证与权限管理

## 🏗️ 技术架构

### 前端技术栈
- **Next.js 15** + **App Router** - 现代化 React 框架
- **React 19** - 最新的 React 特性
- **TypeScript** - 类型安全保障
- **Tailwind CSS** - 原子化样式框架
- **Ant Design v5** - 企业级 UI 组件库
- **Framer Motion** - 流畅动画效果
- **TipTap** - 富文本编辑器

### 后端与数据
- **MongoDB** + **Mongoose** - 文档数据库
- **NextAuth.js** - GitHub OAuth 认证
- **SWR** - 数据获取与缓存
- **API Routes** - 服务端接口

### 开发体验
- **Yarn 4.2.2** - 包管理器
- **ESLint** + **Prettier** - 代码规范
- **Husky** + **lint-staged** - Git 钩子
- **Jest** + **Playwright** - 测试框架

## 🎨 设计理念

### 手帐风格 (Journal Style)
这个项目遵循 **手帐/笔记本美学**，而非传统的后台管理风格：

- **色彩**: 薄荷绿 (#72B385) 为主色调，避免传统蓝色
- **字体**: 柔和圆润的字体，传达温暖感
- **布局**: 有机流动的布局，充足留白
- **组件**: 圆角设计，柔和阴影，渐变效果
- **交互**: 温和的过渡动画，友好的用户体验

## 🚀 快速开始

### 环境要求
- Node.js 18+
- Yarn 4.2.2
- MongoDB 数据库

### 环境配置
```bash
# 安装依赖
yarn install

# 配置环境变量
cp .env.example .env.local

# 启动开发服务器
yarn dev
```

### 环境变量
```env
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_SECRET=your_nextauth_secret
GITHUB_ID=your_github_oauth_app_id
GITHUB_SECRET=your_github_oauth_app_secret
```

## 📜 开发命令

```bash
# 开发
yarn dev                    # 启动开发服务器
yarn predev                 # 生成 Ant Design CSS

# 构建
yarn build                  # 生产构建
yarn prebuild              # 生产环境 CSS 生成
yarn start                  # 启动生产服务器

# 代码质量
yarn lint                   # ESLint 检查
yarn typecheck             # TypeScript 类型检查

# 测试
yarn test                   # Jest 单元测试
yarn test:watch            # Jest 监听模式
yarn test:e2e              # Playwright E2E 测试
yarn test:e2e:ui           # Playwright UI 模式

# 工具
yarn img:opt               # 图片优化
```

## 📁 项目结构

```
src/
├── app/                   # Next.js App Router 页面
├── components/            # 可复用组件
├── constants/             # 常量定义
├── hooks/                # 自定义 Hooks
├── provider/             # Context 提供者
├── types/                # TypeScript 类型定义
├── util/                 # 工具函数
└── monitoring/           # 性能监控
```

## 🔧 特殊功能

### 性能监控
- 生产环境自动监控 Web Vitals
- 用户行为分析与错误追踪
- 开发环境完全跳过监控逻辑

### 主题定制
- 基于 Ant Design 的主题系统
- 支持 CSS-in-JS 和 SCSS 模块
- 响应式设计适配

### 数据库模型
- **Lab**: 项目展示与反馈管理
- **Message**: 论坛消息系统
- **BlogPost**: 博客文章管理

## 🤝 参与贡献

欢迎通过以下方式参与项目：

- 🐛 **Bug 反馈**: 使用网站内的反馈按钮
- 💡 **功能建议**: 提交 GitHub Issues
- 🔧 **代码贡献**: Fork 项目并提交 PR
- 📝 **文档完善**: 帮助改进项目文档

### 贡献指南
1. Fork 本仓库
2. 创建特性分支: `git checkout -b feature/amazing-feature`
3. 提交更改: `git commit -m 'Add amazing feature'`
4. 推送分支: `git push origin feature/amazing-feature`
5. 提交 Pull Request

## 📞 联系方式

- **邮箱**: gwifloria@outlook.com
- **GitHub**: [@gwifloria](https://github.com/gwifloria)
- **Website**: [floria-next-wonderland.onrender.com](https://floria-next-wonderland.onrender.com)

---

💚 **用心做产品，用爱写代码** - 让每一行代码都充满温度
