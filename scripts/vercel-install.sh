#!/usr/bin/env bash
set -euo pipefail

echo "==> Debug .gitmodules (if any)"
test -f .gitmodules && cat .gitmodules || echo "(no .gitmodules)"

# --- 私有 submodule：可选，用 Token 重写 URL ---
if [[ -n "${SUBMODULE_TOKEN:-}" ]]; then
  echo "==> Rewriting submodule URL with SUBMODULE_TOKEN for private repo"
  git config -f .gitmodules submodule.src/app/content.url \
    "https://${SUBMODULE_TOKEN}@github.com/gwifloria/eriko-whispers.git"
  # 兜底：把任何 SSH 形式改为 HTTPS+token
  git config --global url."https://${SUBMODULE_TOKEN}@github.com/".insteadOf "git@github.com:"
  git config --global url."https://${SUBMODULE_TOKEN}@github.com/".insteadOf "ssh://git@github.com/"
fi

# --- 拉取 submodules ---
echo "==> Sync & update submodules"
git submodule sync --recursive
git submodule update --init --recursive --depth 1

echo "==> Submodule status"
git submodule status || true

echo "==> List content dir (before check)"
ls -la src/app/content 2>/dev/null || true

# 确认内容确实存在，否则提前失败
if [[ ! -d "src/app/content" ]] || [[ -z "$(ls -A src/app/content 2>/dev/null)" ]]; then
  echo "[ERROR] submodule 'src/app/content' is missing or empty. Check token/permissions and .gitmodules path/url." >&2
  exit 1
fi

# --- 注入 commitId（写到 .env.local，客户端可读）---
APP_SHA=$(git rev-parse --short HEAD)
CONTENT_SHA=$(git rev-parse --short HEAD:src/app/content 2>/dev/null || git -C src/app/content rev-parse --short HEAD || echo unknown)

printf "NEXT_PUBLIC_COMMIT_ID=%s\nNEXT_PUBLIC_SUBMODULE_COMMIT_ID=%s\n" \
  "$APP_SHA" "$CONTENT_SHA" > .env.local

# 用子模块 SHA 写一个文件，作为构建缓存破坏符（内容变化时，Vercel 缓存会失效）
echo "$CONTENT_SHA" > .content-version

# --- 保险：镜像一份到 public/_content，方便运行时/静态读取 ---
mkdir -p public/_content
rm -rf public/_content/* 2>/dev/null || true
cp -R src/app/content/. public/_content/

echo "==> List public/_content (mirror)"
ls -la public/_content | head -50 || true

# --- 安装依赖（Yarn 4 / Corepack） ---
corepack enable
corepack prepare yarn@4.2.2 --activate
yarn -v
yarn install --immutable