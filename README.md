# qiushuilanxing 的技术博客

基于 VuePress 1.x 与 `vuepress-theme-vdoing` 的 AI 应用开发者技术博客，记录 AI 实践、项目开发、工程技术和行业思考。

## 本地启动

```bash
npm install
npm run docs:dev
```

开发服务器启动后，按终端提示访问本地地址。

## 生产构建

```bash
npm run docs:build
```

构建产物位于 `docs/.vuepress/dist`。

## 内容结构

- `docs/10.AI`：Agent、RAG、MCP、Prompt、Automation
- `docs/20.Projects`：智能客服 Agent、视频质检系统、AI 工具开发、企业 AI 应用、LiveInspector 直播智能巡检平台
- `docs/30.Tech`：Python、Git、Linux、Docker、Frontend
- `docs/40.Thinking`：AI 行业观察、产品思考、技术成长记录
- `docs/90.About`：个人介绍与站点说明

新增文章时放入对应目录，并沿用现有 Markdown Front Matter 格式。导航、头像、社交信息与页脚配置位于 `docs/.vuepress`。

分类目录使用 `README.md` 作为入口页；`docs/.vuepress/common/sidebar.ts` 根据导航模块中的友好链接自动生成侧边栏映射，因此目录不需要添加数字序号，导航和侧边栏也不会重复维护路径。

## 首页视觉效果

首页保留沉浸式视觉风格，包括：

- 8 张背景图循环切换
- 全屏首屏、透明导航和下滑箭头
- AI 技术方向动态文案
- 樱花飘落和鼠标星光轨迹
- 离开或返回浏览器标签时的标题提示

背景、动态文案和轮换时间在 `docs/.vuepress/config/themeConfig.ts` 中配置；交互动效在 `docs/.vuepress/config/plugins.ts` 中配置。

## 首页信息侧栏

首页使用 vdoing 的个人资料、文章分类、标签和站点信息卡片。个人资料与联系方式读取 `themeConfig.ts`；分类、标签和文章数量根据 Markdown Front Matter 自动生成；运行时间、总字数、最近更新和访问量由现有站点统计逻辑动态计算，不在组件中写死数字。

新增文章时请维护 `categories` 和 `tags` 字段，首页侧栏及分类、标签索引页会随内容自动更新。

## 自动部署

生产环境部署由 GitHub Actions 统一处理，工作流位于：

```text
.github/workflows/deploy.yml
```

当 `main` 分支收到新的 push 时，GitHub Actions 会：

1. 安装锁定版本的 npm 依赖。
2. 执行 `npm run docs:build`。
3. 打包 `docs/.vuepress/dist` 静态产物。
4. 使用专用 SSH 部署账户上传到服务器。
5. 将静态文件发布到 `/var/www/blog`，并统一设置目录 `755`、文件 `644` 权限。

仓库需要配置以下 Repository Secrets：

- `SERVER_HOST`：服务器地址
- `SERVER_USER`：部署用户
- `SERVER_SSH_KEY_B64`：部署用户 SSH 私钥的 Base64 编码内容

Windows PowerShell 可使用以下命令生成 `SERVER_SSH_KEY_B64`：

```powershell
[Convert]::ToBase64String([IO.File]::ReadAllBytes("$env:USERPROFILE\.ssh\qiushuilanxing_blog_deploy"))
```

服务器上的 Nginx 直接读取 `/var/www/blog`。生产部署不再使用 GitHub Pages，也不在服务器上构建源码。

## 更新流程

日常更新博客时：

```bash
git add .
git commit -m "更新博客内容"
git push
```

push 到 `main` 后自动部署，无需手工 SSH 到服务器发布。

当前尚未配置项目代码的外部链接；上传项目后再在首页和项目记录页补充。
