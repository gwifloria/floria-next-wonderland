#!/usr/bin/env node

import { readFileSync, writeFileSync } from 'fs';
import { glob } from 'glob';
import path from 'path';

/**
 * 移除生产环境下的 console 语句（保留 console.error）
 */
async function removeConsoleStatements() {
  const files = await glob('src/**/*.{ts,tsx,js,jsx}', {
    ignore: ['src/**/*.test.*', 'src/**/*.spec.*']
  });

  let totalRemovals = 0;

  for (const file of files) {
    const content = readFileSync(file, 'utf-8');
    let modified = content;

    // 移除 console.log, console.warn, console.debug 但保留 console.error
    modified = modified.replace(
      /console\.(log|warn|debug|info)\([^)]*\);?\s*/g,
      ''
    );

    // 清理空行
    modified = modified.replace(/\n\s*\n\s*\n/g, '\n\n');

    if (content !== modified) {
      writeFileSync(file, modified);
      const removedCount = (content.match(/console\.(log|warn|debug|info)/g) || []).length;
      totalRemovals += removedCount;
      console.log(`📝 ${file}: 移除了 ${removedCount} 个 console 语句`);
    }
  }

  console.log(`\n✅ 总共移除了 ${totalRemovals} 个 console 语句`);
}

// 仅在生产构建时运行
if (process.env.NODE_ENV === 'production' || process.env.REMOVE_CONSOLE === 'true') {
  removeConsoleStatements().catch(console.error);
} else {
  console.log('💡 使用 REMOVE_CONSOLE=true 来移除 console 语句');
}