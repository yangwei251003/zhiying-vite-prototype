import { useState, useEffect } from 'react';
import { Menu, X, User } from 'lucide-react';
import { Button } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';

const navItems = [
  { key: '/', label: '首页' },
  { key: '/knowledge-base', label: '职业知识库' },
  { key: '/jd-parse', label: 'JD解析' },
  { key: '/ai-match', label: 'AI匹配' },
  { key: '/resume-generator', label: '简历生成' },
  { key: '/interview', label: '模拟面试' },
];

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (key) => {
    navigate(key);
    setIsMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => navigate('/')}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-light flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
              <span className="text-white font-bold text-lg">职映</span>
            </div>
            <span
              className={`font-bold text-xl transition-colors ${
                scrolled ? 'text-primary' : 'text-white'
              }`}
            >
              职映
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => handleNavClick(item.key)}
                className={`text-sm font-medium transition-all duration-200 hover:scale-105 ${
                  location.pathname === item.key
                    ? scrolled
                      ? 'text-primary'
                      : 'text-white border-b-2 border-white pb-1'
                    : scrolled
                    ? 'text-text-light hover:text-primary'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Button
              type="text"
              disabled
              icon={<User />}
              className={`transition-colors ${
                scrolled ? 'text-text-light hover:text-primary' : 'text-white hover:text-white'
              }`}
            >
              账号未实现
            </Button>
            <Button
              className="bg-accent hover:bg-accent-light text-white font-medium rounded-lg transition-all hover:scale-105 hover:shadow-lg"
              onClick={() => handleNavClick('/knowledge-base')}
            >
              免费体验
            </Button>
          </div>

          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="切换导航菜单"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <X className={scrolled ? 'text-primary' : 'text-white'} size={24} />
            ) : (
              <Menu className={scrolled ? 'text-primary' : 'text-white'} size={24} />
            )}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 animate-fade-in">
            <div className="bg-white rounded-xl shadow-xl p-4 space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => handleNavClick(item.key)}
                  className={`block w-full text-left px-4 py-3 rounded-lg transition-colors ${
                    location.pathname === item.key
                      ? 'bg-primary/10 text-primary'
                      : 'text-text hover:bg-gray-light/50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-4 border-t border-gray-light">
                <Button
                  block
                  type="text"
                  icon={<User />}
                  className="text-text-light hover:text-primary"
                  disabled
                >
                  账号未实现
                </Button>
                <Button
                  block
                  className="mt-2 bg-accent hover:bg-accent-light text-white font-medium rounded-lg"
                  onClick={() => handleNavClick('/knowledge-base')}
                >
                  免费体验
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
