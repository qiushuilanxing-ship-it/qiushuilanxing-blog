#!/usr/bin/env sh

# 确保脚本抛出错误时终止执行
set -e

# 1. 提前在主分支里把对 docs/*.md 的改动 commit 好，
#    这样 VuePress build 时能读到正确的 Git 记录。

# 2. 运行打包命令
npm run docs:build

# 3. 进入打包后的文件夹
cd docs/.vuepress/dist

# 4. 初始化一个空的临时仓库（只用于提交打包产物）
git init
git add -A
git commit -m 'deploy'

# 发布仓库由调用者显式提供，避免把个人主页误当作 Git 仓库地址。
: "${DEPLOY_REPOSITORY:?请先设置 DEPLOY_REPOSITORY，例如 git@github.com:用户名/仓库名.git}"
git push -f "$DEPLOY_REPOSITORY" HEAD:gh-pages

cd -
