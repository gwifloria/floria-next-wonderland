import "./index.scss";
export function DivideTitle({ title }: { title: string }) {
  return (
    <div className="hover:animate-bounce hover:-translate-y-1 hover:scale-120 duration-300 transition ease-in-out divide-title divide-x-0 divide-mint-400">
      <span className="text-2xl">{title}</span>
    </div>
  );
}
