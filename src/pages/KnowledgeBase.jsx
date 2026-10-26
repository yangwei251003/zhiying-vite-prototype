import { useState } from 'react';
import { Button, Card, Tabs, Input, Select, Upload, Tag, Progress, Modal } from 'antd';
import { Save, Eye, Plus, Edit2, Check, User, Briefcase, GraduationCap, Award, MapPin, Calendar, Globe, FileText, MessageSquare } from 'lucide-react';

const { TextArea } = Input;

const knowledgeModules = [
  {
    key: 'basic',
    label: '基本信息',
    icon: User,
    fields: [
      { name: 'name', label: '姓名', type: 'input' },
      { name: 'gender', label: '性别', type: 'select', options: ['男', '女'] },
      { name: 'phone', label: '手机号', type: 'input' },
      { name: 'email', label: '邮箱', type: 'input' },
      { name: 'location', label: '所在地', type: 'input' },
      { name: 'photo', label: '照片', type: 'upload' },
    ],
  },
  {
    key: 'education',
    label: '教育背景',
    icon: GraduationCap,
    fields: [
      { name: 'school', label: '学校名称', type: 'input' },
      { name: 'major', label: '专业', type: 'input' },
      { name: 'degree', label: '学历', type: 'select', options: ['高中', '专科', '本科', '硕士', '博士'] },
      { name: 'startDate', label: '入学时间', type: 'date' },
      { name: 'endDate', label: '毕业时间', type: 'date' },
      { name: 'gpa', label: 'GPA', type: 'input' },
      { name: 'awards', label: '获奖情况', type: 'textarea' },
    ],
  },
  {
    key: 'experience',
    label: '工作经历',
    icon: Briefcase,
    fields: [
      { name: 'company', label: '公司名称', type: 'input' },
      { name: 'position', label: '职位', type: 'input' },
      { name: 'startDate', label: '入职时间', type: 'date' },
      { name: 'endDate', label: '离职时间', type: 'date' },
      { name: 'description', label: '工作描述', type: 'textarea' },
      { name: 'achievements', label: '主要成就', type: 'textarea' },
    ],
  },
  {
    key: 'skills',
    label: '专业技能',
    icon: Award,
    fields: [
      { name: 'hardSkills', label: '硬技能', type: 'textarea' },
      { name: 'softSkills', label: '软技能', type: 'textarea' },
      { name: 'languages', label: '语言能力', type: 'textarea' },
      { name: 'certifications', label: '证书', type: 'textarea' },
    ],
  },
  {
    key: 'projects',
    label: '项目经验',
    icon: FileText,
    fields: [
      { name: 'projectName', label: '项目名称', type: 'input' },
      { name: 'role', label: '担任角色', type: 'input' },
      { name: 'startDate', label: '开始时间', type: 'date' },
      { name: 'endDate', label: '结束时间', type: 'date' },
      { name: 'description', label: '项目描述', type: 'textarea' },
      { name: 'achievements', label: '项目成果', type: 'textarea' },
    ],
  },
  {
    key: 'goals',
    label: '职业目标',
    icon: MapPin,
    fields: [
      { name: 'targetPosition', label: '目标岗位', type: 'input' },
      { name: 'targetIndustry', label: '目标行业', type: 'input' },
      { name: 'targetCity', label: '目标城市', type: 'input' },
      { name: 'salaryExpectation', label: '薪资期望', type: 'input' },
      { name: 'shortTermGoal', label: '短期目标', type: 'textarea' },
      { name: 'longTermGoal', label: '长期目标', type: 'textarea' },
    ],
  },
  {
    key: 'timeline',
    label: '时间线',
    icon: Calendar,
    fields: [
      { name: 'milestones', label: '重要里程碑', type: 'textarea' },
      { name: 'plans', label: '未来规划', type: 'textarea' },
    ],
  },
  {
    key: 'network',
    label: '人脉资源',
    icon: Globe,
    fields: [
      { name: 'connections', label: '重要联系人', type: 'textarea' },
      { name: 'socialMedia', label: '社交媒体', type: 'textarea' },
    ],
  },
  {
    key: 'notes',
    label: '备注信息',
    icon: MessageSquare,
    fields: [
      { name: 'notes', label: '其他信息', type: 'textarea' },
    ],
  },
];

function KnowledgeBase() {
  const [activeTab, setActiveTab] = useState('basic');
  const [formData, setFormData] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('zhiying_vite_prototype_knowledge_base') || '{}');
      return saved && typeof saved === 'object' && !Array.isArray(saved) ? saved : {};
    } catch { return {}; }
  });
  const [savedModules, setSavedModules] = useState(new Set());
  const [showPreview, setShowPreview] = useState(false);
  const [isEditing, setIsEditing] = useState(true);

  const handleFieldChange = (moduleKey, fieldName, value) => {
    setFormData((prev) => ({
      ...prev,
      [moduleKey]: {
        ...prev[moduleKey],
        [fieldName]: value,
      },
    }));
  };

  const handleSaveModule = () => {
    setSavedModules((prev) => new Set([...prev, activeTab]));
    localStorage.setItem('zhiying_vite_prototype_knowledge_base', JSON.stringify(formData));
  };

  const handleSaveAll = () => {
    localStorage.setItem('zhiying_vite_prototype_knowledge_base', JSON.stringify(formData));
    setSavedModules(new Set(knowledgeModules.map((m) => m.key)));
  };

  const handlePreview = () => {
    setShowPreview(true);
  };

  const renderField = (moduleKey, field) => {
    const value = formData[moduleKey]?.[field.name] || '';

    switch (field.type) {
      case 'input':
        return (
          <Input
            key={field.name}
            placeholder={`请输入${field.label}`}
            value={value}
            onChange={(e) => handleFieldChange(moduleKey, field.name, e.target.value)}
            className="rounded-lg"
          />
        );
      case 'select':
        return (
          <Select
            key={field.name}
            placeholder={`请选择${field.label}`}
            value={value}
            onChange={(v) => handleFieldChange(moduleKey, field.name, v)}
            className="rounded-lg"
          >
            {field.options.map((option) => (
              <Select.Option key={option} value={option}>
                {option}
              </Select.Option>
            ))}
          </Select>
        );
      case 'textarea':
        return (
          <TextArea
            key={field.name}
            placeholder={`请输入${field.label}`}
            value={value}
            onChange={(e) => handleFieldChange(moduleKey, field.name, e.target.value)}
            rows={4}
            className="rounded-lg"
          />
        );
      case 'date':
        return (
          <Input
            key={field.name}
            type="date"
            value={value}
            onChange={(e) => handleFieldChange(moduleKey, field.name, e.target.value)}
            className="rounded-lg"
          />
        );
      case 'upload':
        return (
          <Upload
            key={field.name}
            accept="image/*"
            onChange={(info) => {
              if (info.file.status === 'done') {
                handleFieldChange(moduleKey, field.name, info.file.response?.url || '');
              }
            }}
          >
            <Button icon={<Plus />}>上传照片</Button>
          </Upload>
        );
      default:
        return null;
    }
  };

  const completedPercentage = Math.round((savedModules.size / knowledgeModules.length) * 100);

  return (
    <div className="min-h-screen bg-bg pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-text">职业知识库</h1>
            <p className="text-text-light mt-1">系统化梳理你的职业信息</p>
          </div>
          <div className="flex gap-3">
            <Button
              icon={<Eye />}
              onClick={handlePreview}
              className="rounded-lg"
            >
              预览
            </Button>
            <Button
              icon={<Save />}
              type="primary"
              onClick={handleSaveAll}
              className="rounded-lg"
            >
              保存全部
            </Button>
          </div>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-text">完成进度</span>
            <span className="text-sm font-bold text-primary">{completedPercentage}%</span>
          </div>
          <Progress percent={completedPercentage} strokeColor="#1F3864" className="h-2" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <Card className="sticky top-24 rounded-2xl border-0 shadow-card">
              <div className="space-y-1">
                {knowledgeModules.map((module) => {
                  const Icon = module.icon;
                  const isSaved = savedModules.has(module.key);
                  return (
                    <button
                      key={module.key}
                      onClick={() => setActiveTab(module.key)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                        activeTab === module.key
                          ? 'bg-primary text-white shadow-lg'
                          : 'text-text-light hover:bg-gray-light/50 hover:text-text'
                      }`}
                    >
                      <Icon size={20} />
                      <span className="flex-1 text-left">{module.label}</span>
                      {isSaved && (
                        <Check size={16} className={activeTab === module.key ? 'text-white' : 'text-green-500'} />
                      )}
                    </button>
                  );
                })}
              </div>
            </Card>
          </div>

          <div className="lg:col-span-3">
            <Card className="rounded-2xl border-0 shadow-card">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  {(() => {
                    const module = knowledgeModules.find((m) => m.key === activeTab);
                    const Icon = module?.icon;
                    return (
                      <>
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                          <Icon className="text-primary" size={24} />
                        </div>
                        <div>
                          <h2 className="text-xl font-semibold text-text">{module?.label}</h2>
                          <p className="text-sm text-text-light">填写相关信息</p>
                        </div>
                      </>
                    );
                  })()}
                </div>
                <Button
                  icon={<Save />}
                  type="primary"
                  onClick={handleSaveModule}
                  className="rounded-lg"
                >
                  保存
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {knowledgeModules
                  .find((m) => m.key === activeTab)
                  ?.fields.map((field) => (
                    <div key={field.name}>
                      <label className="block text-sm font-medium text-text mb-2">
                        {field.label}
                      </label>
                      {renderField(activeTab, field)}
                    </div>
                  ))}
              </div>

              {savedModules.has(activeTab) && (
                <div className="mt-6 flex items-center gap-2 text-green-600 bg-green-50 px-4 py-2 rounded-lg">
                  <Check size={16} />
                  <span className="text-sm">已保存</span>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>

      <Modal
        title="知识库预览"
        open={showPreview}
        onCancel={() => setShowPreview(false)}
        footer={null}
        width={800}
        className="rounded-2xl"
      >
        <div className="space-y-6">
          {knowledgeModules.map((module) => {
            const data = formData[module.key];
            const hasData = data && Object.values(data).some((v) => v);
            if (!hasData) return null;

            const Icon = module.icon;
            return (
              <div key={module.key} className="p-4 bg-bg-light rounded-xl">
                <div className="flex items-center gap-2 mb-4">
                  <Icon className="text-primary" size={20} />
                  <h3 className="font-semibold text-text">{module.label}</h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {module.fields.map((field) => {
                    const value = data?.[field.name];
                    if (!value) return null;
                    return (
                      <div key={field.name}>
                        <p className="text-sm text-text-light">{field.label}</p>
                        <p className="text-text">{value}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </Modal>
    </div>
  );
}

export default KnowledgeBase;
