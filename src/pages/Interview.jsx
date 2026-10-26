import { useState, useEffect } from 'react';
import { Button, Card, Input, Tag, Spin, Avatar, Empty } from 'antd';
import { MessageCircle, Send, Play, Pause, RotateCcw, CheckCircle, XCircle, Clock, Brain } from 'lucide-react';

function Interview() {
  const [isInterviewing, setIsInterviewing] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [interviewHistory, setInterviewHistory] = useState([]);
  const [timeElapsed, setTimeElapsed] = useState(0);

  const questions = [
    {
      id: 1,
      type: 'behavioral',
      question: '请介绍一下你自己？',
      category: '自我介绍',
    },
    {
      id: 2,
      type: 'technical',
      question: '请解释一下React中的虚拟DOM是什么？',
      category: '技术基础',
    },
    {
      id: 3,
      type: 'behavioral',
      question: '你遇到过的最大挑战是什么？你是如何解决的？',
      category: '问题解决',
    },
    {
      id: 4,
      type: 'technical',
      question: '请描述一下你对前端性能优化的理解和实践经验？',
      category: '技术深度',
    },
    {
      id: 5,
      type: 'culture',
      question: '你为什么想来我们公司工作？',
      category: '文化匹配',
    },
  ];

  const mockAnalysis = {
    score: 85,
    feedback: '回答结构清晰，内容详实。建议在描述项目经验时，使用STAR法则，更加突出你的贡献和成果。',
    strengths: ['表达流畅', '逻辑清晰', '内容详实'],
    improvements: ['使用STAR法则', '增加量化数据', '缩短回答时间'],
  };

  useEffect(() => {
    let timer;
    if (isInterviewing) {
      timer = setInterval(() => {
        setTimeElapsed((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isInterviewing]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartInterview = () => {
    setIsInterviewing(true);
    setCurrentQuestion(questions[0]);
    setQuestionIndex(0);
    setInterviewHistory([]);
    setTimeElapsed(0);
  };

  const handleSubmitAnswer = () => {
    if (!userAnswer.trim()) return;

    setIsAnalyzing(true);
    setTimeout(() => {
      const result = {
        ...mockAnalysis,
        question: currentQuestion,
        answer: userAnswer,
        time: formatTime(timeElapsed),
      };
      setAnalysisResult(result);
      setIsAnalyzing(false);
      setInterviewHistory((prev) => [...prev, result]);
    }, 2000);
  };

  const handleNextQuestion = () => {
    if (questionIndex < questions.length - 1) {
      setQuestionIndex((prev) => prev + 1);
      setCurrentQuestion(questions[questionIndex + 1]);
      setUserAnswer('');
      setAnalysisResult(null);
    } else {
      setIsInterviewing(false);
    }
  };

  const getQuestionTypeColor = (type) => {
    switch (type) {
      case 'technical':
        return 'bg-blue-100 text-blue-600';
      case 'behavioral':
        return 'bg-green-100 text-green-600';
      case 'culture':
        return 'bg-purple-100 text-purple-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-bg pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-text">模拟面试</h1>
          <p className="text-text-light mt-1">固定题目与固定评分的交互演练，未接入真实AI</p>
        </div>

        {!isInterviewing && interviewHistory.length === 0 ? (
          <Card className="max-w-3xl mx-auto rounded-2xl border-0 shadow-card py-12">
            <div className="text-center">
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-primary to-primary-light rounded-full flex items-center justify-center">
                <Brain className="text-white" size={48} />
              </div>
              <h2 className="text-xl font-semibold text-text mb-2">准备好开始面试了吗？</h2>
              <p className="text-text-light mb-6">
                原型按固定题库出题并显示固定合成反馈，不对回答进行真实评估
              </p>
              <div className="flex flex-wrap justify-center gap-3 mb-8">
                <Tag className="bg-blue-100 text-blue-600">技术面试</Tag>
                <Tag className="bg-green-100 text-green-600">行为面试</Tag>
                <Tag className="bg-purple-100 text-purple-600">文化适配</Tag>
              </div>
              <Button
                icon={<Play />}
                type="primary"
                size="large"
                onClick={handleStartInterview}
                className="rounded-xl bg-gradient-to-r from-primary to-primary-light"
              >
                开始面试
              </Button>
            </div>
          </Card>
        ) : isInterviewing ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card className="rounded-2xl border-0 shadow-card">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <Avatar
                      size={48}
                      className="bg-gradient-to-br from-primary to-primary-light"
                      icon={<Brain className="text-white" />}
                    />
                    <div>
                      <p className="font-semibold text-text">AI面试官</p>
                      <p className="text-sm text-text-light">
                        第 {questionIndex + 1} / {questions.length} 题
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-primary font-mono text-lg">
                    <Clock size={20} />
                    {formatTime(timeElapsed)}
                  </div>
                </div>

                <div className="bg-gradient-to-r from-primary/5 to-accent/5 p-6 rounded-xl mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Tag className={getQuestionTypeColor(currentQuestion.type)}>
                      {currentQuestion.category}
                    </Tag>
                  </div>
                  <h2 className="text-xl font-semibold text-text">{currentQuestion.question}</h2>
                </div>

                {!analysisResult ? (
                  <>
                    <Input.TextArea
                      placeholder="请输入你的回答..."
                      value={userAnswer}
                      onChange={(e) => setUserAnswer(e.target.value)}
                      rows={6}
                      className="rounded-xl mb-4"
                    />
                    <Button
                      icon={<Send />}
                      type="primary"
                      onClick={handleSubmitAnswer}
                      disabled={!userAnswer.trim() || isAnalyzing}
                      loading={isAnalyzing}
                      className="rounded-lg bg-accent hover:bg-accent-light"
                    >
                      {isAnalyzing ? '分析中...' : '提交回答'}
                    </Button>
                  </>
                ) : (
                  <div className="space-y-4">
                    <div className="p-4 bg-bg-light rounded-xl">
                      <p className="text-sm text-text-light mb-2">你的回答</p>
                      <p className="text-text">{userAnswer}</p>
                    </div>

                    <div className="p-4 bg-green-50 rounded-xl">
                      <div className="flex items-center justify-between mb-3">
                        <p className="font-semibold text-green-700">AI反馈</p>
                        <span className="text-2xl font-bold text-green-600">
                          {analysisResult.score}分
                        </span>
                      </div>
                      <p className="text-text-light mb-4">{analysisResult.feedback}</p>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium text-green-600 mb-2">优点</p>
                          <ul className="space-y-1">
                            {analysisResult.strengths.map((item, index) => (
                              <li key={index} className="flex items-center gap-2 text-sm text-text-light">
                                <CheckCircle size={14} className="text-green-500" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-orange-600 mb-2">改进建议</p>
                          <ul className="space-y-1">
                            {analysisResult.improvements.map((item, index) => (
                              <li key={index} className="flex items-center gap-2 text-sm text-text-light">
                                <XCircle size={14} className="text-orange-500" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <Button
                      icon={<RotateCcw />}
                      type="primary"
                      onClick={handleNextQuestion}
                      className="w-full rounded-xl"
                    >
                      {questionIndex < questions.length - 1 ? '下一题' : '结束面试'}
                    </Button>
                  </div>
                )}
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="rounded-2xl border-0 shadow-card">
                <h3 className="font-semibold text-text mb-4">面试进度</h3>
                <div className="space-y-2">
                  {questions.map((q, index) => (
                    <div
                      key={q.id}
                      className={`flex items-center gap-2 p-2 rounded-lg ${
                        index === questionIndex
                          ? 'bg-primary/10 text-primary'
                          : index < questionIndex
                          ? 'bg-green-50 text-green-600'
                          : 'bg-bg-light text-text-light'
                      }`}
                    >
                      {index < questionIndex ? (
                        <CheckCircle size={16} />
                      ) : (
                        <span className="w-6 h-6 rounded-full bg-white border border-gray-light flex items-center justify-center text-sm">
                          {index + 1}
                        </span>
                      )}
                      <span className="text-sm truncate">{q.category}</span>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="rounded-2xl border-0 shadow-card">
                <h3 className="font-semibold text-text mb-4">面试提示</h3>
                <ul className="space-y-2 text-sm text-text-light">
                  <li className="flex items-start gap-2">
                    <MessageCircle size={16} className="text-primary mt-0.5" />
                    保持回答简洁，控制在2-3分钟内
                  </li>
                  <li className="flex items-start gap-2">
                    <MessageCircle size={16} className="text-primary mt-0.5" />
                    使用STAR法则描述你的经历
                  </li>
                  <li className="flex items-start gap-2">
                    <MessageCircle size={16} className="text-primary mt-0.5" />
                    尽量提供量化的成果数据
                  </li>
                </ul>
              </Card>

              <Button
                icon={<Pause />}
                onClick={() => setIsInterviewing(false)}
                className="w-full rounded-xl"
              >
                暂停面试
              </Button>
            </div>
          </div>
        ) : (
          <Card className="max-w-3xl mx-auto rounded-2xl border-0 shadow-card">
            <h2 className="text-xl font-semibold text-text mb-6 text-center">面试结束</h2>
            
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="text-center p-4 bg-primary/5 rounded-xl">
                <p className="text-3xl font-bold text-primary">{interviewHistory.length}</p>
                <p className="text-sm text-text-light">完成题目</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-xl">
                <p className="text-3xl font-bold text-green-600">
                  {Math.round(interviewHistory.reduce((sum, item) => sum + item.score, 0) / interviewHistory.length)}
                </p>
                <p className="text-sm text-text-light">平均分</p>
              </div>
              <div className="text-center p-4 bg-accent/10 rounded-xl">
                <p className="text-3xl font-bold text-accent">{formatTime(timeElapsed)}</p>
                <p className="text-sm text-text-light">总时长</p>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              {interviewHistory.map((item, index) => (
                <div key={index} className="p-4 bg-bg-light rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-text">{item.question.category}</span>
                    <span className={`font-bold ${
                      item.score >= 80 ? 'text-green-600' : item.score >= 60 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {item.score}分
                    </span>
                  </div>
                  <p className="text-sm text-text-light mb-2">{item.question.question}</p>
                  <p className="text-sm text-text">{item.answer.slice(0, 50)}...</p>
                </div>
              ))}
            </div>

            <div className="flex justify-center gap-4">
              <Button
                icon={<RotateCcw />}
                onClick={handleStartInterview}
                className="rounded-xl"
              >
                重新开始
              </Button>
              <Button
                type="primary"
                className="rounded-xl bg-gradient-to-r from-primary to-primary-light"
              >
                查看详细报告
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}

export default Interview;
