#!/usr/bin/env sh

# 本项目生产部署由 GitHub Actions 统一完成。
# 保留此脚本仅作为本地构建入口，避免出现两套发布流程。
set -e

npm run docs:build

echo "Build complete: docs/.vuepress/dist"
echo "Production deployment is handled by .github/workflows/deploy.yml after pushes to main."
