export default function BlogTechDetails() {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg text-neutral-800">技术实现</h3>
      <div className="space-y-3">
        <div>
          <strong>内容创作：</strong>使用 Obsidian
          进行写作，支持双向链接和图谱结构
        </div>
        <div>
          <strong>自动同步：</strong>通过 Git 仓库自动同步 Obsidian 笔记到项目
        </div>
        <div>
          <strong>API 集成：</strong>后端 API 实时读取 Markdown 文件并解析为
          HTML
        </div>
        <div>
          <strong>分类系统：</strong>
          <ul className="ml-4 mt-2 space-y-1">
            <li>
              • <strong>ByteNotes</strong>：技术学习与开发笔记
            </li>
            <li>
              • <strong>LifeNotes</strong>：生活感悟与思考
            </li>
          </ul>
        </div>
      </div>
      <div className="bg-amber-50 p-3 rounded-lg border border-amber-200">
        <strong>特色功能：</strong>
        支持语法高亮、数学公式、目录导航和标签检索
      </div>
    </div>
  );
}
