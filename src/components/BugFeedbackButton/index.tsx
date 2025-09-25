"use client";

import AntDShell from "@/provider/AntDShell";
import { SWRShell } from "@/provider/SWRShell";
import { useMessage } from "@/provider/UIProviders";
import { postFetcher } from "@/util/fetch";
import { ArrowRightOutlined } from "@ant-design/icons";
import { Button, Input, Radio } from "antd";
import { useSession, signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import useSWRMutation from "swr/mutation";
export default function BugFeedbackButtonWrapper() {
  return (
    <AntDShell>
      <SWRShell>
        <FeedBackButton></FeedBackButton>
      </SWRShell>
    </AntDShell>
  );
}
function FeedBackButton() {
  const { data: session } = useSession();
  const message = useMessage();
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<"bug" | "idea">("bug");
  const [title, setTitle] = useState("");
  const [hovered, setHovered] = useState(false);

  const { trigger, isMutating } = useSWRMutation("/api/lab/add", postFetcher, {
    onSuccess: () => {
      message.success("反馈提交成功！");
      setTitle("");
      setOpen(false);
    },
    onError: (error) => {
      message.error(error.message || "提交失败");
    },
  });

  const handleSubmit = async () => {
    if (!session) {
      await signIn("github");
      return;
    }

    if (!title.trim()) {
      message.warning("请输入标题");
      return;
    }

    await trigger({
      title: title.trim(),
      type,
      category: "tech",
      status: "open",
    });
  };

  const handleGitHubLogin = async () => {
    await signIn("github");
  };

  return (
    <div className="fixed top-1/2 right-0 z-50 -translate-y-1/2">
      <div className="group">
        {/* Bookmark Button - 滑出式设计 */}
        <div
          className="cursor-pointer"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onClick={() => setOpen(!open)}
        >
          {/* 书签容器 - 中性白色背景 */}
          <div
            className={`
              bg-white hover:bg-gray-50
              text-gray-700 rounded-l-lg shadow-md border border-gray-200 border-r-0
              transition-all duration-300 ease-out
              flex items-center overflow-hidden
              ${hovered ? "pr-3" : "pr-0"}
            `}
            style={{
              width: hovered ? "auto" : "32px",
              minWidth: "32px",
            }}
          >
            {/* 图标 - 始终可见 */}
            <div className="flex items-center justify-center w-8 h-8 flex-shrink-0">
              <span className="text-sm">🗂️</span>
            </div>

            {/* 文字 - hover时滑入 */}
            <div
              className={`
                whitespace-nowrap text-sm font-medium transition-all duration-300 ease-out overflow-hidden
                ${hovered ? "opacity-100 max-w-20 ml-1" : "opacity-0 max-w-0 ml-0"}
              `}
            >
              反馈
            </div>
          </div>
        </div>

        {/* 抽屉面板 - 仅点击时显示 */}
        <div
          className={`absolute top-0 right-full transition-all duration-300 ${
            open
              ? "translate-x-0 opacity-100"
              : "translate-x-2 opacity-0 pointer-events-none"
          }`}
        >
          <div className="bg-white/95 backdrop-blur-sm rounded-l-xl shadow-lg border border-gray-200 border-r-0 p-4 min-w-[280px]">
            <div className="mb-3 text-sm font-medium text-mint-600 flex items-center gap-2">
              🗂️ 反馈收集箱
            </div>

            <div className="mb-3">
              <Radio.Group
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full"
              >
                <Radio.Button value="bug" className="flex-1">
                  🐛 Bug
                </Radio.Button>
                <Radio.Button value="idea" className="flex-1">
                  💡 Idea
                </Radio.Button>
              </Radio.Group>
            </div>

            <div className="mb-2">
              <Input
                placeholder="简单描述问题或想法..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                maxLength={200}
              />
            </div>

            <div className="flex justify-between items-center">
              <Link
                href="/lab"
                className="text-mint-600 hover:text-mint-700 flex items-center gap-1 text-sm"
                onClick={() => setOpen(false)}
              >
                <ArrowRightOutlined />
              </Link>

              {session ? (
                <Button
                  type="primary"
                  size="small"
                  onClick={handleSubmit}
                  loading={isMutating}
                  disabled={!title.trim()}
                  className="bg-mint-500 hover:bg-mint-600 border-mint-500 hover:border-mint-600"
                >
                  提交
                </Button>
              ) : (
                <Button
                  size="small"
                  onClick={handleGitHubLogin}
                  className="bg-mint-500 hover:bg-mint-600 text-white border-mint-500 hover:border-mint-600"
                >
                  🐙 GitHub 登录
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
