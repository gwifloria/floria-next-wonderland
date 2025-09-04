"use client";
import { useSWRMutation } from "@/api/useFetch";
import { App } from "antd";
import { useState } from "react";

export default function SayHiButton() {
  const { message } = App.useApp();
  const [show, setShow] = useState(false);
  const [sent, setSent] = useState(false);
  const [msg, setMsg] = useState("");
  const { trigger } = useSWRMutation("/floria-service/message/send", {
    method: "POST",
  });

  const send = async () => {
    try {
      await trigger({ content: msg });
      setSent(true);
    } catch (error) {
      const errorMsg =
        typeof error === "object" &&
        error !== null &&
        "message" in error &&
        typeof (error as any).message === "string"
          ? (error as any).message
          : "Error sending message";
      message.error(errorMsg);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        className="bg-rose-200 hover:bg-rose-300 text-rose-700 font-bold rounded-full shadow-lg px-6 py-3 text-lg border-2 border-rose-300 transition-all duration-200 animate-bounce"
        onClick={() => setShow((v) => !v)}
      >
        {sent ? "💌 Thanks!" : "👋 Say Hi!"}
      </button>
      {show && !sent && (
        <div className="mt-2 bg-white/90 rounded-2xl shadow-xl p-4 border border-mint-100 w-64 animate-fadeIn">
          <textarea
            className="w-full rounded-lg border border-mint-200 p-2 mb-2 text-mint-700"
            rows={3}
            placeholder="Type your message..."
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
          />
          <button
            className="bg-mint-200 hover:bg-mint-300 text-mint-900 font-bold rounded-full px-4 py-2 mt-1 float-right"
            onClick={send}
          >
            Send
          </button>
        </div>
      )}
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px);} to { opacity: 1; transform: none; } }
        .animate-fadeIn { animation: fadeIn 0.3s cubic-bezier(.4,1.6,.6,1); }
      `}</style>
    </div>
  );
}
