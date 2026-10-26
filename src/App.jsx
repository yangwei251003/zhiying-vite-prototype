import { HashRouter, Routes, Route } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { zhiyingTheme } from './theme';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import KnowledgeBase from './pages/KnowledgeBase';
import JDParse from './pages/JDParse';
import AIMatch from './pages/AIMatch';
import ResumeGenerator from './pages/ResumeGenerator';
import Interview from './pages/Interview';

function App() {
  return (
    <ConfigProvider theme={zhiyingTheme}>
      <HashRouter>
        <div className="min-h-screen bg-bg">
          <Navbar />
          <aside className="bg-primary text-white pt-24 pb-4 px-4 text-center text-sm" role="note">
            开发中 · 离线交互原型。JD、匹配、评分和面试反馈均为固定合成示例，无真实AI；PDF/打印尚未实现。仅输入演示资料。
          </aside>
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/knowledge-base" element={<KnowledgeBase />} />
              <Route path="/jd-parse" element={<JDParse />} />
              <Route path="/ai-match" element={<AIMatch />} />
              <Route path="/resume-generator" element={<ResumeGenerator />} />
              <Route path="/interview" element={<Interview />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </HashRouter>
    </ConfigProvider>
  );
}

export default App;
