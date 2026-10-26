import { useState } from 'react';
import { Button, Card, Input, Upload, Tag, Spin, Progress, Select } from 'antd';
import { Download, Image, FileText, Sparkles, Edit2, Check, Palette, Printer, Save } from 'lucide-react';

function ResumeGenerator() {
  const [activeTab, setActiveTab] = useState('preview');
  const [isGenerating, setIsGenerating] = useState(false);
  const [resumeData, setResumeData] = useState({
    personal: {
      name: '演示同学',
      title: '前端岗位候选人（示例）',
      phone: '未填写',
      email: 'demo@example.com',
      location: '演示城市',
      summary: '此处为合成简历占位，能力、学校与经历均不代表作者真实履历。',
    },
    education: [
      { school: '示例大学', major: '计算机相关专业（示例）', degree: '本科（示例）', year: '20XX-20XX' },
    ],
    experience: [
      {
        company: '示例科技团队',
        position: '前端工程师',
        period: '20XX-20XX',
        description: '负责核心业务线前端开发，主导多个大型项目的架构设计和技术选型。',
        achievements: '示例成果：完成一次前端流程演练。',
      },
    ],
    skills: ['React', 'Vue', 'TypeScript', 'Node.js', 'Webpack', '性能优化'],
    projects: [
      {
        name: '电商平台重构',
        role: '技术负责人',
        description: '负责电商平台前端架构重构，采用微前端方案，提升系统可维护性。',
      },
    ],
  });
  const [template, setTemplate] = useState('modern');
  const [photo, setPhoto] = useState(null);

  const templates = [
    { key: 'modern', label: '现代简约', color: 'from-blue-500 to-blue-600' },
    { key: 'professional', label: '专业商务', color: 'from-gray-700 to-gray-800' },
    { key: 'creative', label: '创意设计', color: 'from-purple-500 to-pink-500' },
    { key: 'elegant', label: '优雅经典', color: 'from-amber-500 to-orange-500' },
  ];

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
    }, 3000);
  };

  const handleDownload = () => {
    alert('简历下载功能即将上线');
  };

  return (
    <div className="min-h-screen bg-bg pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-text">简历智能生成</h1>
            <p className="text-text-light mt-1">合成简历编辑预览；生成动画、打印和PDF下载均为未完成占位</p>
          </div>
          <div className="flex gap-3">
            <Button
              icon={<Printer />}
              onClick={handleDownload}
              className="rounded-lg"
            >
              打印
            </Button>
            <Button
              icon={<Download />}
              type="primary"
              onClick={handleDownload}
              className="rounded-lg"
            >
              下载PDF
            </Button>
          </div>
        </div>

        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab('preview')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'preview' ? 'bg-primary text-white' : 'bg-bg-light text-text-light hover:text-text'
            }`}
          >
            预览
          </button>
          <button
            onClick={() => setActiveTab('edit')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'edit' ? 'bg-primary text-white' : 'bg-bg-light text-text-light hover:text-text'
            }`}
          >
            编辑内容
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            {activeTab === 'preview' ? (
              <Card className="rounded-2xl border-0 shadow-card overflow-hidden">
                <div className={`bg-gradient-to-r ${templates.find((t) => t.key === template)?.color} p-6 text-white`}>
                  <div className="flex items-center gap-6">
                    {photo ? (
                      <img
                        src={photo}
                        alt="头像"
                        className="w-24 h-24 rounded-full object-cover border-4 border-white/30"
                      />
                    ) : (
                      <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center">
                        <span className="text-3xl font-bold">{resumeData.personal.name[0]}</span>
                      </div>
                    )}
                    <div>
                      <h2 className="text-2xl font-bold">{resumeData.personal.name}</h2>
                      <p className="text-white/80 mt-1">{resumeData.personal.title}</p>
                      <div className="flex gap-4 mt-3 text-sm">
                        <span>{resumeData.personal.phone}</span>
                        <span>{resumeData.personal.email}</span>
                        <span>{resumeData.personal.location}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <section className="mb-8">
                    <h3 className="text-lg font-bold text-text mb-3 flex items-center gap-2">
                      <span className="w-8 h-0.5 bg-primary" />
                      个人简介
                    </h3>
                    <p className="text-text-light">{resumeData.personal.summary}</p>
                  </section>

                  <section className="mb-8">
                    <h3 className="text-lg font-bold text-text mb-3 flex items-center gap-2">
                      <span className="w-8 h-0.5 bg-primary" />
                      教育背景
                    </h3>
                    {resumeData.education.map((item, index) => (
                      <div key={index} className="flex justify-between mb-4">
                        <div>
                          <p className="font-semibold text-text">{item.school}</p>
                          <p className="text-sm text-text-light">{item.major} · {item.degree}</p>
                        </div>
                        <p className="text-sm text-text-light">{item.year}</p>
                      </div>
                    ))}
                  </section>

                  <section className="mb-8">
                    <h3 className="text-lg font-bold text-text mb-3 flex items-center gap-2">
                      <span className="w-8 h-0.5 bg-primary" />
                      工作经历
                    </h3>
                    {resumeData.experience.map((item, index) => (
                      <div key={index} className="mb-6">
                        <div className="flex justify-between mb-2">
                          <div>
                            <p className="font-semibold text-text">{item.company}</p>
                            <p className="text-sm text-primary">{item.position}</p>
                          </div>
                          <p className="text-sm text-text-light">{item.period}</p>
                        </div>
                        <p className="text-text-light text-sm mb-2">{item.description}</p>
                        <p className="text-text-light text-sm">{item.achievements}</p>
                      </div>
                    ))}
                  </section>

                  <section className="mb-8">
                    <h3 className="text-lg font-bold text-text mb-3 flex items-center gap-2">
                      <span className="w-8 h-0.5 bg-primary" />
                      专业技能
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {resumeData.skills.map((skill, index) => (
                        <Tag key={index} className="bg-primary/10 text-primary">
                          {skill}
                        </Tag>
                      ))}
                    </div>
                  </section>

                  <section>
                    <h3 className="text-lg font-bold text-text mb-3 flex items-center gap-2">
                      <span className="w-8 h-0.5 bg-primary" />
                      项目经验
                    </h3>
                    {resumeData.projects.map((item, index) => (
                      <div key={index} className="mb-4">
                        <div className="flex justify-between mb-1">
                          <p className="font-semibold text-text">{item.name}</p>
                          <p className="text-sm text-primary">{item.role}</p>
                        </div>
                        <p className="text-text-light text-sm">{item.description}</p>
                      </div>
                    ))}
                  </section>
                </div>
              </Card>
            ) : (
              <Card className="rounded-2xl border-0 shadow-card">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-text mb-4">个人信息</h3>
                    <Input
                      placeholder="姓名"
                      value={resumeData.personal.name}
                      onChange={(e) =>
                        setResumeData((prev) => ({
                          ...prev,
                          personal: { ...prev.personal, name: e.target.value },
                        }))
                      }
                      className="mb-3 rounded-lg"
                    />
                    <Input
                      placeholder="职位"
                      value={resumeData.personal.title}
                      onChange={(e) =>
                        setResumeData((prev) => ({
                          ...prev,
                          personal: { ...prev.personal, title: e.target.value },
                        }))
                      }
                      className="mb-3 rounded-lg"
                    />
                    <Input
                      placeholder="手机号"
                      value={resumeData.personal.phone}
                      onChange={(e) =>
                        setResumeData((prev) => ({
                          ...prev,
                          personal: { ...prev.personal, phone: e.target.value },
                        }))
                      }
                      className="mb-3 rounded-lg"
                    />
                    <Input
                      placeholder="邮箱"
                      value={resumeData.personal.email}
                      onChange={(e) =>
                        setResumeData((prev) => ({
                          ...prev,
                          personal: { ...prev.personal, email: e.target.value },
                        }))
                      }
                      className="mb-3 rounded-lg"
                    />
                    <Input
                      placeholder="所在地"
                      value={resumeData.personal.location}
                      onChange={(e) =>
                        setResumeData((prev) => ({
                          ...prev,
                          personal: { ...prev.personal, location: e.target.value },
                        }))
                      }
                      className="mb-3 rounded-lg"
                    />
                  </div>

                  <div>
                    <h3 className="font-semibold text-text mb-4">个人简介</h3>
                    <Input.TextArea
                      placeholder="请输入个人简介"
                      value={resumeData.personal.summary}
                      onChange={(e) =>
                        setResumeData((prev) => ({
                          ...prev,
                          personal: { ...prev.personal, summary: e.target.value },
                        }))
                      }
                      rows={6}
                      className="rounded-lg"
                    />
                  </div>
                </div>

                <Button
                  icon={<Save />}
                  type="primary"
                  className="mt-6 rounded-lg"
                >
                  保存修改
                </Button>
              </Card>
            )}
          </div>

          <div className="space-y-6">
            <Card className="rounded-2xl border-0 shadow-card">
              <h3 className="font-semibold text-text mb-4 flex items-center gap-2">
                <Palette size={18} className="text-primary" />
                选择模板
              </h3>
              <div className="space-y-3">
                {templates.map((t) => (
                  <button
                    key={t.key}
                    onClick={() => setTemplate(t.key)}
                    className={`w-full p-3 rounded-xl border-2 transition-all ${
                      template === t.key
                        ? 'border-primary bg-primary/5'
                        : 'border-gray-light hover:border-primary/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${t.color}`} />
                      <span className="font-medium text-text">{t.label}</span>
                      {template === t.key && <Check size={16} className="text-primary ml-auto" />}
                    </div>
                  </button>
                ))}
              </div>
            </Card>

            <Card className="rounded-2xl border-0 shadow-card">
              <h3 className="font-semibold text-text mb-4 flex items-center gap-2">
                <Image size={18} className="text-primary" />
                上传照片
              </h3>
              <Upload
                accept="image/*"
                showUploadList={false}
                beforeUpload={() => false}
                onChange={(info) => {
                  if (info.file.status === 'done') {
                    const reader = new FileReader();
                    reader.onload = (e) => setPhoto(e.target.result);
                    reader.readAsDataURL(info.file.originFileObj);
                  }
                }}
              >
                <Button icon={<Image />} className="w-full rounded-lg">
                  {photo ? '更换照片' : '上传照片'}
                </Button>
              </Upload>
              {photo && (
                <div className="mt-3 flex justify-center">
                  <img
                    src={photo}
                    alt="预览"
                    className="w-20 h-20 rounded-full object-cover"
                  />
                </div>
              )}
            </Card>

            <Card className="rounded-2xl border-0 shadow-card">
              <Button
                icon={<Sparkles />}
                type="primary"
                onClick={handleGenerate}
                loading={isGenerating}
                className="w-full rounded-xl bg-gradient-to-r from-accent to-accent-light"
              >
                {isGenerating ? '生成中...' : 'AI智能优化'}
              </Button>
              <p className="text-center text-sm text-text-light mt-3">
                基于匹配分析结果，自动优化简历内容
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResumeGenerator;
