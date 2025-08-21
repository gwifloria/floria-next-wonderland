// scripts/inject-commit.js
const { execSync } = require("node:child_process");
const { writeFileSync } = require("node:fs");
const path = require("node:path");

function sh(cmd) {
  try {
    return execSync(cmd, { stdio: ["ignore", "pipe", "ignore"] })
      .toString()
      .trim();
  } catch {
    return "";
  }
}

const appCommit = sh("git rev-parse --short HEAD") || "unknown";

let contentCommit =
  sh("git rev-parse --short HEAD:src/app/content") ||
  sh("git -C src/app/content rev-parse --short HEAD") ||
  "unknown";

// 仅写入构建期可读的 .env.local（不会提交）
const envPath = path.join(process.cwd(), ".env.local");
const lines = [
  `NEXT_PUBLIC_COMMIT_ID=${appCommit}`,
  `NEXT_PUBLIC_SUBMODULE_COMMIT_ID=${contentCommit}`,
];
writeFileSync(envPath, lines.join("\n") + "\n", { encoding: "utf-8" });
console.log("[commit] wrote to .env.local:", lines);
