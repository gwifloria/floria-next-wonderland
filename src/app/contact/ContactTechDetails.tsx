export default function ContactTechDetails() {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg text-neutral-800">页面特色</h3>
      <div className="space-y-3">
        <div>
          <strong>剪贴簿风格：</strong>
          采用纸质背景和手写字体，营造温馨的个人简历感觉
        </div>
        <div>
          <strong>双语支持：</strong>
          支持中英文切换，适应不同场景需求
        </div>
        <div>
          <strong>打印优化：</strong>
          专门优化了打印样式，可以直接生成 PDF 简历
        </div>
        <div>
          <strong>响应式设计：</strong>
          在各种设备上都有良好的阅读体验
        </div>
      </div>
      <div className="bg-green-50 p-3 rounded-lg border border-green-200">
        <strong>内容包含：</strong>
        个人信息、工作经历、技能专长、教育背景和联系方式
      </div>
      <div className="space-y-2">
        <h4 className="font-medium text-neutral-800">技术实现</h4>
        <ul className="text-sm space-y-1 ml-4">
          <li>• CSS-in-JS 动态样式管理</li>
          <li>• 自定义打印媒体查询</li>
          <li>• Framer Motion 动画效果</li>
          <li>• TypeScript 类型安全</li>
        </ul>
      </div>
    </div>
  );
}
