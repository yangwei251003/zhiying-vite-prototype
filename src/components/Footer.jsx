import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

const links = [
  ['/knowledge-base', '职业知识库'], ['/jd-parse', 'JD演示解析'],
  ['/ai-match', '岗位匹配示例'], ['/resume-generator', '合成简历'],
  ['/interview', '固定题目面试练习'],
];

function Footer() {
  return (
    <footer className="bg-primary text-white pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h2 className="font-bold text-xl mb-4">职映 · Vite交互原型</h2>
            <p className="text-white/70 text-sm">完整前端流程演示，暂无真实AI分析、账户系统或PDF下载。</p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">演示页面</h3>
            <ul className="space-y-3">
              {links.map(([to, label]) => <li key={to}><Link to={to} className="text-white/70 hover:text-white">{label}</Link></li>)}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">公开范围</h3>
            <p className="text-white/70 text-sm">无真实电话、邮箱或住址。姓名、学校和分数为合成示例；请勿填写私人资料。</p>
          </div>
        </div>
        <div className="border-t border-white/10 pt-6 text-white/60 text-sm flex flex-wrap justify-between gap-4">
          <p>© 2026 职映前端演示 · 自有代码MIT，依赖保留原协议</p>
          <p className="flex items-center gap-1">Made with <Heart size={14} /> · 开发中</p>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
