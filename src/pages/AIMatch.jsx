import { useState, useEffect, useMemo } from 'react';
import { Button, Card, Progress, Tag, Spin, Empty, Statistic } from 'antd';
import { Zap, CheckCircle, AlertCircle, Clock, Target, TrendingUp, ArrowRight } from 'lucide-react';

function AIMatch() {
  const [isMatching, setIsMatching] = useState(true);
  const [matchResult, setMatchResult] = useState(null);

  const mockMatchResult = useMemo(() => ({
    overallScore: 82,
    matchLevel: '高匹配',
    jobTitle: '高级前端工程师',
    company: '某互联网大厂',
    directMatch: [
      { name: 'React/Vue开发', score: 95, description: '3年以上React开发经验' },
      { name: 'TypeScript', score: 90, description: '熟练使用TypeScript' },
      { name: 'Webpack/Vite', score: 85, description: '熟悉构建工具配置' },
    ],
    relatedMatch: [
      { name: 'Node.js', score: 70, description: '有后端开发经验' },
      { name: '性能优化', score: 65, description: '了解前端性能优化' },
    ],
    needsImprovement: [
      { name: '微前端架构', score: 40, description: '需要学习微前端知识' },
      { name: '跨端开发', score: 35, description: '缺少跨端开发经验' },
    ],
    learningPath: [
      { stage: '第一阶段', title: '微前端基础', duration: '2周', items: ['了解微前端概念', '学习qiankun框架', '实践微前端项目'] },
      { stage: '第二阶段', title: '跨端开发', duration: '3周', items: ['学习React Native', '了解Flutter', '实践跨端项目'] },
      { stage: '第三阶段', title: '架构进阶', duration: '4周', items: ['大型项目架构设计', '性能优化实践', '团队协作流程'] },
    ],
  }), []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMatchResult(mockMatchResult);
      setIsMatching(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, [mockMatchResult]);

  const getMatchLevelColor = (level) => {
    switch (level) {
      case '高匹配':
        return 'text-green-600 bg-green-100';
      case '中匹配':
        return 'text-yellow-600 bg-yellow-100';
      case '低匹配':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-bg pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-text">AI岗位匹配</h1>
          <p className="text-text-light mt-1">智能分析你的能力与岗位的匹配度</p>
        </div>

        {isMatching ? (
          <Card className="max-w-2xl mx-auto rounded-2xl border-0 shadow-card py-16">
            <div className="text-center">
              <div className="relative w-32 h-32 mx-auto mb-6">
                <div className="absolute inset-0 bg-primary/10 rounded-full animate-ping" />
                <div className="relative w-full h-full bg-gradient-to-br from-primary to-primary-light rounded-full flex items-center justify-center">
                  <Zap className="text-white" size={48} />
                </div>
              </div>
              <h2 className="text-xl font-semibold text-text mb-2">正在分析匹配度...</h2>
              <p className="text-text-light">AI正在对比你的职业知识库与岗位需求</p>
              <div className="mt-8">
                <Progress percent={0} strokeColor="#1F3864" className="h-2" status="active" />
              </div>
            </div>
          </Card>
        ) : matchResult ? (
          <div className="space-y-6">
            <Card className="rounded-2xl border-0 shadow-card">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="col-span-1 md:col-span-2">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="w-24 h-24 bg-gradient-to-br from-primary to-primary-light rounded-2xl flex items-center justify-center">
                        <span className="text-white text-3xl font-bold">{matchResult.overallScore}</span>
                      </div>
                      <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-accent rounded-full flex items-center justify-center shadow-lg">
                        <Target className="text-white" size={20} />
                      </div>
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-text mb-1">
                        {matchResult.jobTitle}
                      </h2>
                      <p className="text-text-light mb-2">{matchResult.company}</p>
                      <Tag className={`px-3 py-1 rounded-full ${getMatchLevelColor(matchResult.matchLevel)}`}>
                        {matchResult.matchLevel}
                      </Tag>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <Statistic
                    title="直接匹配项"
                    value={matchResult.directMatch.length}
                    suffix="/5"
                    valueStyle={{ color: '#10B981' }}
                  />
                </div>
                <div className="text-center">
                  <Statistic
                    title="综合得分"
                    value={matchResult.overallScore}
                    suffix="分"
                    valueStyle={{ color: '#1F3864' }}
                  />
                </div>
              </div>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="rounded-2xl border-0 shadow-card">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
                    <CheckCircle className="text-green-600" size={20} />
                  </div>
                  <h3 className="font-semibold text-text">直接匹配</h3>
                  <Tag className="bg-green-100 text-green-600 text-xs">优势</Tag>
                </div>

                <div className="space-y-4">
                  {matchResult.directMatch.map((item, index) => (
                    <div key={index} className="p-4 bg-bg-light rounded-xl">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-text">{item.name}</span>
                        <span className="text-green-600 font-bold">{item.score}%</span>
                      </div>
                      <p className="text-sm text-text-light mb-2">{item.description}</p>
                      <Progress
                        percent={item.score}
                        strokeColor="#10B981"
                        className="h-2"
                        showInfo={false}
                      />
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="rounded-2xl border-0 shadow-card">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-yellow-100 flex items-center justify-center">
                    <AlertCircle className="text-yellow-600" size={20} />
                  </div>
                  <h3 className="font-semibold text-text">可关联</h3>
                  <Tag className="bg-yellow-100 text-yellow-600 text-xs">潜力</Tag>
                </div>

                <div className="space-y-4">
                  {matchResult.relatedMatch.map((item, index) => (
                    <div key={index} className="p-4 bg-bg-light rounded-xl">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-text">{item.name}</span>
                        <span className="text-yellow-600 font-bold">{item.score}%</span>
                      </div>
                      <p className="text-sm text-text-light mb-2">{item.description}</p>
                      <Progress
                        percent={item.score}
                        strokeColor="#F59E0B"
                        className="h-2"
                        showInfo={false}
                      />
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="rounded-2xl border-0 shadow-card">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center">
                    <Clock className="text-red-600" size={20} />
                  </div>
                  <h3 className="font-semibold text-text">待补强项</h3>
                  <Tag className="bg-red-100 text-red-600 text-xs">改进</Tag>
                </div>

                <div className="space-y-4">
                  {matchResult.needsImprovement.map((item, index) => (
                    <div key={index} className="p-4 bg-bg-light rounded-xl">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-text">{item.name}</span>
                        <span className="text-red-600 font-bold">{item.score}%</span>
                      </div>
                      <p className="text-sm text-text-light mb-2">{item.description}</p>
                      <Progress
                        percent={item.score}
                        strokeColor="#EF4444"
                        className="h-2"
                        showInfo={false}
                      />
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            <Card className="rounded-2xl border-0 shadow-card">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <TrendingUp className="text-white" size={24} />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-text">学习路径推荐</h2>
                  <p className="text-sm text-text-light">为你定制的能力提升计划</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {matchResult.learningPath.map((stage, index) => (
                  <div key={index} className="relative">
                    <div className="p-6 bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl border border-primary/10">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm font-semibold text-primary">{stage.stage}</span>
                        <Tag className="bg-accent/10 text-accent">{stage.duration}</Tag>
                      </div>
                      <h4 className="font-semibold text-text mb-3">{stage.title}</h4>
                      <ul className="space-y-2">
                        {stage.items.map((item, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm text-text-light">
                            <CheckCircle size={14} className="text-primary" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    {index < matchResult.learningPath.length - 1 && (
                      <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gray-light" />
                    )}
                  </div>
                ))}
              </div>
            </Card>

            <div className="flex justify-center gap-4">
              <Button
                icon={<ArrowRight />}
                type="primary"
                size="large"
                className="rounded-xl bg-gradient-to-r from-primary to-primary-light"
              >
                生成简历
              </Button>
              <Button
                size="large"
                className="rounded-xl"
              >
                查看更多岗位
              </Button>
            </div>
          </div>
        ) : (
          <Card className="max-w-2xl mx-auto rounded-2xl border-0 shadow-card py-16">
            <Empty description="暂无匹配结果，请先完成职业知识库和JD解析" />
          </Card>
        )}
      </div>
    </div>
  );
}

export default AIMatch;
