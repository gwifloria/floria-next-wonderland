export default function WavyDivider() {
  return (
    <div className="w-full overflow-hidden" style={{ lineHeight: 0 }}>
      <svg
        viewBox="0 0 1440 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-12 md:h-20"
      >
        <path
          d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z"
          fill="#fdf6f9"
          opacity="0.8"
        />
      </svg>
    </div>
  );
}
