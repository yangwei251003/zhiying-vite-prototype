import { useState } from 'react';
import { Button, Card, Input, Upload, Tag, Progress, Spin, Empty } from 'antd';
import { FileText, Upload as UploadIcon, Sparkles, Target, Search, ArrowRight, Download } from 'lucide-react';

function JDParse() {
  const [jdText, setJdText] = useState('');
  const [isParsing, setIsParsing] = useState(false);
  const [parseResult, setParseResult] = useState(null);
  const [activeTab, setActiveTab] = useState('analysis');

  const mockParseResult = {
    jobTitle: '高级前端工程师',
    company: '某互联网大厂',
    location: '演示城市',
    salary: '合成示例，未提供薪资',
    experience: '3-5年',
    education: '本科及以上',
    requirements: [
      { type: '硬技能', items: ['React/Vue', 'TypeScript', 'Webpack/Vite', 'Node.js'] },
      { type: '软技能', items: ['团队协作', '沟通能力', '问题解决'] },
      { type: '加分项', items: ['开源贡献', '性能优化经验', '跨端开发'] },
    ],
    keywords: ['React', 'TypeScript', '前端架构', '性能优化', '微前端'],
    talentProfile: {
      title: '理想候选人画像',
      description: '3-5年前端开发经验，精通React/Vue等主流框架，熟悉TypeScript，有大型项目架构经验，具备良好的团队协作能力和沟通能力。',
      attributes: [
        { name: '技术深度', value: 90 },
        { name: '架构能力', value: 85 },
        { name: '团队协作', value: 80 },
        { name: '学习能力', value: 95 },
      ],
    },
  };

  const handleParse = () => {
    if (!jdText.trim()) return;
    
    setIsParsing(true);
    setTimeout(() => {
      setParseResult(mockParseResult);
      setIsParsing(false);
    }, 2000);
  };

  const handleFileUpload = () => {
    setIsParsing(true);
    setTimeout(() => {
      setParseResult(mockParseResult);
      setIsParsing(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-bg pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-text">JD智能解析</h1>
          <p className="text-text-light mt-1">固定合成结果演示，不随输入生成真实分析</p>
        </div>

        {!parseResult ? (
          <Card className="max-w-3xl mx-auto rounded-2xl border-0 shadow-card">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <FileText className="text-primary" size={24} />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-text">岗位描述</h2>
                <p className="text-sm text-text-light">粘贴JD文本或上传文件</p>
              </div>
            </div>

            <div className="mb-6">
              <Input.TextArea
                placeholder="请在此粘贴岗位描述文本，或使用下方上传按钮上传文件..."
                value={jdText}
                onChange={(e) => setJdText(e.target.value)}
                rows={8}
                className="rounded-xl"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <Upload
                beforeUpload={() => false}
                onChange={handleFileUpload}
                accept=".txt,.pdf,.doc,.docx"
                showUploadList={false}
                className="w-full sm:w-auto"
              >
                <Button
                  icon={<UploadIcon />}
                  className="w-full sm:w-auto rounded-xl"
                >
                  上传文件
                </Button>
              </Upload>
              <Button
                icon={<Sparkles />}
                type="primary"
                onClick={handleParse}
                disabled={!jdText.trim() || isParsing}
                className="w-full sm:w-auto rounded-xl bg-accent hover:bg-accent-light"
              >
                {isParsing ? (
                  <Spin size="small" className="mr-2" />
                ) : null}
                {isParsing ? '解析中...' : '开始解析'}
              </Button>
            </div>

            <div className="mt-8 p-4 bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl">
              <h3 className="font-semibold text-text mb-3">支持的格式</h3>
              <div className="flex flex-wrap gap-2">
                <Tag className="bg-white border border-gray-light">.txt</Tag>
                <Tag className="bg-white border border-gray-light">.pdf</Tag>
                <Tag className="bg-white border border-gray-light">.doc</Tag>
                <Tag className="bg-white border border-gray-light">.docx</Tag>
                <Tag className="bg-white border border-gray-light">文本粘贴</Tag>
              </div>
            </div>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card className="rounded-2xl border-0 shadow-card">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Target className="text-primary" size={24} />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-text">岗位信息</h2>
                    <p className="text-sm text-text-light">提取的基本信息</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[
                    { label: '岗位名称', value: parseResult.jobTitle },
                    { label: '公司', value: parseResult.company },
                    { label: '地点', value: parseResult.location },
                    { label: '薪资', value: parseResult.salary },
                    { label: '经验要求', value: parseResult.experience },
                    { label: '学历要求', value: parseResult.education },
                  ].map((item, index) => (
                    <div key={index} className="p-4 bg-bg-light rounded-xl">
                      <p className="text-sm text-text-light mb-1">{item.label}</p>
                      <p className="font-semibold text-text">{item.value}</p>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="rounded-2xl border-0 shadow-card">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                    <Search className="text-accent" size={24} />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-text">需求拆解</h2>
                    <p className="text-sm text-text-light">分类整理的岗位要求</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {parseResult.requirements.map((category, index) => (
                    <div key={index}>
                      <h3 className="font-semibold text-primary mb-2">{category.type}</h3>
                      <div className="flex flex-wrap gap-2">
                        {category.items.map((item, i) => (
                          <Tag key={i} className="bg-primary/10 text-primary">
                            {item}
                          </Tag>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="rounded-2xl border-0 shadow-card">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                    <Sparkles className="text-purple-600" size={24} />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-text">关键词提取</h2>
                    <p className="text-sm text-text-light">AI识别的核心关键词</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  {parseResult.keywords.map((keyword, index) => (
                    <Tag
                      key={index}
                      className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 font-medium px-4 py-2 rounded-full"
                    >
                      {keyword}
                    </Tag>
                  ))}
                </div>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="rounded-2xl border-0 shadow-card">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                    <Sparkles className="text-green-600" size={24} />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-text">人才画像</h2>
                    <p className="text-sm text-text-light">理想候选人特征</p>
                  </div>
                </div>

                <p className="text-text-light text-sm mb-6">
                  {parseResult.talentProfile.description}
                </p>

                <div className="space-y-4">
                  {parseResult.talentProfile.attributes.map((attr, index) => (
                    <div key={index}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-text">{attr.name}</span>
                        <span className="text-sm font-semibold text-primary">{attr.value}%</span>
                      </div>
                      <Progress
                        percent={attr.value}
                        strokeColor="#1F3864"
                        className="h-2"
                        showInfo={false}
                      />
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="rounded-2xl border-0 shadow-card">
                <div className="p-6 text-center">
                  <Button
                    icon={<ArrowRight />}
                    type="primary"
                    className="w-full rounded-xl bg-gradient-to-r from-primary to-primary-light"
                  >
                    进行AI匹配
                  </Button>
                  <Button
                    icon={<Download />}
                    className="w-full mt-3 rounded-xl"
                  >
                    导出解析结果
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default JDParse;
