import { routes } from "@/constants/routes";
import Image from "next/image";

interface IconProps {
  /** 图标名称 (不包含扩展名) */
  name: string;
  /** 尺寸大小 */
  size?: number;
  /** CSS 类名 */
  className?: string;
  /** alt 文本 */
  alt?: string;
  /** 是否首屏关键资源 */
  priority?: boolean;
  /** 点击事件 */
  onClick?: () => void;
}

interface RouteIconProps {
  /** 路由名称 */
  route: string;
  /** 图标尺寸 */
  size?: number;
  /** CSS 类名 */
  className?: string;
}

/**
 * 路由图标组件 - 根据路由配置显示图标或emoji
 */
export function RouteIcon({
  route,
  size = 20,
  className = "",
}: RouteIconProps) {
  const routeConfig = routes[route as keyof typeof routes];

  if (routeConfig?.icon) {
    return <Icon name={routeConfig.icon} size={size} className={className} />;
  }

  return <span className={className}>{routeConfig?.emoji || "🌟"}</span>;
}

/**
 * 图标组件 - 简单封装 Next.js Image
 * 利用现有的 WebP 转换配置自动优化
 */
export default function Icon({
  name,
  size = 24,
  className = "",
  alt,
  priority = false,
  onClick,
}: IconProps) {
  return (
    <div
      className={`inline-flex items-center justify-center flex-shrink-0 ${onClick ? "cursor-pointer hover:opacity-80 transition-opacity" : ""}`}
      style={{
        width: size,
        height: size,
      }}
      onClick={onClick}
    >
      <Image
        src={`/icons/${name}.png`}
        alt={alt || name}
        width={size}
        height={size}
        className={`select-none ${className}`}
        priority={priority}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          objectPosition: "center",
        }}
      />
    </div>
  );
}
