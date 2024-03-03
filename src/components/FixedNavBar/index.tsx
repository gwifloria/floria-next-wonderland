export function FixedNavBar() {
  return (
    <div className="bg-ginger-200 flex flex-col text-ginger-900 justify-between min-h-40 rounded-lg p-4 fixed-nav-bar fixed right-6">
      {["introduction", "portfolio", "blog"].map((i) => {
        return (
          <div key={i}>
            <a href={`#${i}`}>{i}</a>
          </div>
        );
      })}
    </div>
  );
}
