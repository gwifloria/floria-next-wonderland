"use client";
export const PrintButton = () => {
  const handleClick = () => {};
  return (
    <button
      aria-label="导出 PDF"
      title="导出 PDF"
      className="fixed print:hidden right-6 bottom-6 h-10 w-10 rounded-full bg-rose-600 text-white shadow-lg hover:bg-rose-700 focus:outline-none focus-visible:ring-2 z-50"
      onClick={handleClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-5 w-5 mx-auto"
      >
        <path d="M6 9V2h12v7h2a2 2 0 012 2v6h-4v4H8v-4H4v-6a2 2 0 012-2h0zm2-5v5h8V4H8zm8 14H8v2h8v-2zM6 13h12v2H6v-2z" />
      </svg>
    </button>
  );
};
