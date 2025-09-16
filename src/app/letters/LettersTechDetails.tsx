export default function LettersTechDetails() {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg text-neutral-800">工作原理</h3>
      <p className="mt-1 text-sm text-neutral-500">Archive Mail With yiceng</p>
      <div className="space-y-3">
        <div>
          <strong>邮件爬取：</strong>通过 Microsoft Graph API 自动获取 Outlook
          邮箱中的邮件
        </div>
        <div>
          <strong>智能过滤：</strong>
          只保存来自家庭成员的重要邮件，过滤垃圾和商业邮件
        </div>
        <div>
          <strong>数据存储：</strong>邮件内容安全存储在 MongoDB 数据库中
        </div>
        <div>
          <strong>线程管理：</strong>
          自动按邮件主题和时间组织为对话线程
        </div>
      </div>
      <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
        <strong>隐私保护：</strong>
        此页面不对搜索引擎开放，仅用于家庭内部记录和回顾
      </div>
      <div className="space-y-2">
        <h4 className="font-medium text-neutral-800">特色功能</h4>
        <ul className="text-sm space-y-1 ml-4">
          <li>• 全文搜索和高亮显示</li>
          <li>• 时间线浏览和分页导航</li>
          <li>• 邮件附件和图片预览</li>
          <li>• 评论和回复功能</li>
        </ul>
      </div>
    </div>
  );
}
