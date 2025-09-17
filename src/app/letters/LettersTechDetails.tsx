import Image from "next/image";

export default function LettersTechDetails() {
  return (
    <div className="space-y-4">
      <p className="mt-1 text-sm text-neutral-500">数字时代的家书 💌</p>
      <div className="space-y-3">
        <div>通过graph api脚本同步 Outlook 中 flagged 的邮件</div>
      </div>
      <div className="relative p-4 overflow-hidden min-h-[100px] flex items-center justify-center">
        <div className="absolute inset-0 opacity-70">
          <Image
            src="/images/env-note-with-flower.png"
            alt="Envelope note with flower decoration"
            fill
            className="object-contain"
            sizes="350px"
          />
        </div>
        <div className="relative z-10 text-center">
          <strong>家人专属：</strong>不对外开放 🏡
        </div>
      </div>
      <div className="space-y-2">
        <ul className="text-sm space-y-1 ml-4">
          <li>• 记录和小庄的线上不太碎片的探讨</li>
          <li>• 欢迎评论</li>
        </ul>
      </div>
    </div>
  );
}
