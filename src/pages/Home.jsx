import { useState, useEffect, useRef } from 'react';
import { Button, Card, Tag } from 'antd';
import { BookOpen, FileText, Zap, Briefcase, MessageCircle, ArrowRight, Play, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  const [visibleCards, setVisibleCards] = useState([]);
  const cardRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = cardRefs.current.indexOf(entry.target);
            if (index !== -1 && !visibleCards.includes(index)) {
              setVisibleCards((prev) => [...prev, index]);
            }
          }
        });
      },
      { threshold: 0.2 }
    );

    cardRefs.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, [visibleCards]);

  const features = [
    {
      icon: BookOpen,
      title: '职业知识库',
      description: '系统化梳理你的职业信息，建立完整的个人职业档案',
      color: 'from-blue-500 to-blue-600',
      path: '/knowledge-base',
    },
    {
      icon: FileText,
      title: 'JD智能解析',
      description: '一键解析岗位需求，精准提取关键词和能力要求',
      color: 'from-amber-500 to-orange-500',
      path: '/jd-parse',
    },
    {
      icon: Zap,
      title: 'AI岗位匹配',
      description: '智能分析匹配度，三分组展示你的优势和短板',
      color: 'from-purple-500 to-pink-500',
      path: '/ai-match',
    },
    {
      icon: Briefcase,
      title: '简历智能生成',
      description: '基于AI分析结果，自动生成专业简历',
      color: 'from-green-500 to-teal-500',
      path: '/resume-generator',
    },
    {
      icon: MessageCircle,
      title: '模拟面试',
      description: 'AI面试官在线陪练，提升你的面试技巧',
      color: 'from-red-500 to-rose-500',
      path: '/interview',
    },
  ];

  const stats = [
    { value: '6', label: '演示页面' },
    { value: '0', label: '真实模型调用' },
    { value: '本机', label: '知识库保存' },
    { value: '开发中', label: '交互原型' },
  ];

  return (
    <div className="min-h-screen">
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary via-primary-light to-blue-700">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/5 rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/5 rounded-full" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white/90 text-sm mb-6 animate-fade-in">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                职业工具纯前端演示
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 animate-fade-in-up">
                看见你的
                <span className="relative inline-block ml-2">
                  <span className="relative z-10 text-accent">职业未来</span>
                  <span className="absolute bottom-2 left-0 w-full h-3 bg-accent/30 -z-0 transform -rotate-1" />
                </span>
              </h1>
              
              <p className="text-lg text-white/80 mb-8 max-w-xl mx-auto lg:mx-0 animate-fade-in">
                体验六个职业工具页面；分析、匹配和反馈使用固定样例，没有真实AI或运营数据。
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                <Button
                  size="large"
                  className="bg-accent hover:bg-accent-light text-white font-semibold rounded-xl px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all hover:scale-105"
                  onClick={() => navigate('/knowledge-base')}
                >
                  开始探索
                  <ArrowRight className="ml-2" size={20} />
                </Button>
                <Button
                  size="large"
                  disabled
                  style={{ background: 'rgba(255,255,255,0.12)', color: '#ffffff', border: '1px solid rgba(255,255,255,0.4)' }}
                  className="border-2 border-white/30 text-white hover:bg-white/10 font-semibold rounded-xl px-8 py-6 text-lg transition-all hover:scale-105"
                  icon={<Play className="mr-2" />}
                >
                  视频尚未制作
                </Button>
              </div>
            </div>

            <div className="relative animate-slide-in-right">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-accent/20 to-primary/20 rounded-3xl blur-2xl" />
                <img
                  src={`${import.meta.env.BASE_URL}illustrations/career-dashboard.svg`}
                  alt="职业规划"
                  className="relative w-full rounded-2xl shadow-hero"
                />
              </div>
              
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-4 animate-float hidden lg:block">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle className="text-green-600" size={24} />
                  </div>
                  <div>
                    <p className="font-semibold text-text">固定匹配示例</p>
                    <p className="text-sm text-text-light">固定演示匹配度 92%</p>
                  </div>
                </div>
              </div>
              
              <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-xl p-4 animate-float hidden lg:block" style={{ animationDelay: '1s' }}>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                    <Zap className="text-purple-600" size={24} />
                  </div>
                  <div>
                    <p className="font-semibold text-text">合成样例展示</p>
                    <p className="text-sm text-text-light">用时 30秒</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 animate-fade-in">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center"
                style={{ animationDelay: `${0.2 * index}s` }}
              >
                <p className="text-3xl sm:text-4xl font-bold text-white mb-2">{stat.value}</p>
                <p className="text-white/60 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-white/60 rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      <section className="py-20 bg-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Tag className="bg-primary/10 text-primary font-medium mb-4 px-4 py-1">核心功能</Tag>
            <h2 className="text-3xl sm:text-4xl font-bold text-text mb-4">
              全方位职业规划解决方案
            </h2>
            <p className="text-text-light max-w-2xl mx-auto">
              从知识积累到面试准备，职映为你提供一站式职业发展支持
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={index}
                  ref={(el) => (cardRefs.current[index] = el)}
                  className={`p-6 rounded-2xl border-0 shadow-card hover:shadow-card-hover transition-all duration-300 cursor-pointer group ${
                    visibleCards.includes(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${index * 0.1}s` }}
                  onClick={() => navigate(feature.path)}
                >
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="text-white" size={28} />
                  </div>
                  <h3 className="text-xl font-semibold text-text mb-2 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-text-light text-sm mb-4">
                    {feature.description}
                  </p>
                  <div className="flex items-center text-primary font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                    立即体验
                    <ArrowRight className="ml-1 group-hover:translate-x-1 transition-transform" size={16} />
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-3xl blur-2xl" />
              <img
                src={`${import.meta.env.BASE_URL}illustrations/career-collaboration.svg`}
                alt="团队协作"
                className="relative w-full rounded-2xl shadow-lg"
              />
            </div>

            <div>
              <Tag className="bg-accent/10 text-accent font-medium mb-4 px-4 py-1">为什么选择我们</Tag>
              <h2 className="text-3xl sm:text-4xl font-bold text-text mb-6">
                让AI成为你的职业导师
              </h2>
              <p className="text-text-light mb-8">
                这里保留职业工具的前端设计与交互流程。分析、匹配和面试评分是固定示例，没有接入模型、职业数据库或实时数据。
              </p>

              <div className="space-y-4">
                {[
                  '固定评分与标签的交互展示',
                  '岗位分析展示使用固定合成示例',
                  '没有行业趋势、薪资数据或真实职业数据库',
                  '合成简历预览与固定题目练习',
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                      <CheckCircle className="text-primary" size={14} />
                    </div>
                    <span className="text-text">{item}</span>
                  </div>
                ))}
              </div>

              <Button
                className="mt-8 bg-primary hover:bg-primary-light text-white font-semibold rounded-xl px-8 py-3 shadow-lg hover:shadow-xl transition-all hover:scale-105"
                onClick={() => navigate('/knowledge-base')}
              >
                开始使用
                <ArrowRight className="ml-2" size={16} />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Tag className="bg-green-100 text-green-600 font-medium mb-4 px-4 py-1">虚构体验文案</Tag>
            <h2 className="text-3xl sm:text-4xl font-bold text-text mb-4">
              听听他们怎么说
            </h2>
            <p className="text-text-light max-w-2xl mx-auto">
              以下为排版用虚构评价，不代表真实用户、运营规模或使用成效
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: '演示用户A',
                role: '产品经理',
                avatar: 'Z',
                content: '虚构文案：展示评价卡片的排版与配色，不代表真实求职结果。',
                color: 'from-blue-500 to-blue-600',
              },
              {
                name: '演示用户B',
                role: '软件工程师',
                avatar: 'L',
                content: '虚构文案：演练固定题目流程，不代表录用、模型能力或面试效果。',
                color: 'from-purple-500 to-pink-500',
              },
              {
                name: '演示用户C',
                role: '设计师',
                avatar: 'W',
                content: '虚构文案：查看固定JD展示样例，不代表真实解析或通过率。',
                color: 'from-green-500 to-teal-500',
              },
            ].map((review, index) => (
              <Card
                key={index}
                className="p-6 rounded-2xl border-0 shadow-card hover:shadow-card-hover transition-all"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${review.color} flex items-center justify-center text-white font-bold`}>
                    {review.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-text">{review.name}</p>
                    <p className="text-sm text-text-light">{review.role}</p>
                  </div>
                </div>
                <p className="text-text-light">{review.content}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-primary to-primary-light">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            准备好开启你的职业新篇章了吗？
          </h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            体验六个前端页面的交互流程；目前没有真实AI分析、用户运营数据或职业建议服务。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="large"
              className="bg-white text-primary hover:bg-gray-light font-semibold rounded-xl px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all hover:scale-105"
              onClick={() => navigate('/knowledge-base')}
            >
              免费体验
              <ArrowRight className="ml-2" size={20} />
            </Button>
            <Button
              size="large"
              variant="outline"
              className="border-2 border-white/30 text-white hover:bg-white/10 font-semibold rounded-xl px-8 py-6 text-lg transition-all hover:scale-105"
            >
              了解更多
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
