# 依赖安全范围

核对日期：2026-10-26。原型初始安装报告15项（7high/8moderate），兼容更新后仍有Vite5等记录；本次将开发/构建工具迁移到Vite6.4.5与兼容React插件4.7.0，最终报告 **0critical / 0high / 5moderate**。没有隐藏或标记剩余为已修。

[Vite官方支持政策](https://vite.dev/releases) 已停止支持5.x，6.4仍收安全补丁；本次参考 [v5→v6迁移说明](https://v6.vite.dev/guide/migration)，仅使用普通React构建、静态资源和base，没有实验Runtime/SSR API。Node24满足运行要求。

| 剩余模块 | 原因与项目实际范围 |
|---|---|
| react-router / react-router-dom6 | 审计涉及 [反斜线开放重定向](https://github.com/advisories/GHSA-wrjc-x8rr-h8h6) 和 [SSR反序列化](https://github.com/advisories/GHSA-337j-9hxr-rhxg)。本项目只用客户端HashRouter，没有SSR、服务端渲染或hydration数据；Link/useNavigate参数来自源码固定内部路由，不把输入表单或URL参数当跳转目标。这是当前源码核对，非完整漏洞利用测试，依赖本身记录仍保留。 |
| postcss-selector-parser / postcss-nested / Tailwind3 | 来自 [选择器解析CPU耗尽](https://github.com/advisories/GHSA-rj75-hqrm-r3gf) 的构建链和传递记录。当前仅构建仓库自有CSS，没有接受用户上传CSS的服务；不代表解析库已修。审计建议涉及Tailwind4/解析器7的升级，留待CSS与界面完整迁移回归。 |

没有执行 `npm audit fix --force` 将整套迁移到Vite8/Tailwind4/Router7，也没有用未知fork替换。后续采用第三方CSS、外部跳转参数、SSR或新后端时，应先更新/复核这些范围。完整精简审计见 `verification/dependency-security.json`。

本次是本地构建与合成浏览器演示检查，不是生产安全认证、渗透测试或无漏洞保证。开发/预览默认请绑定127.0.0.1，Pages发布的是dist静态文件，不能运行开发服务器或模型。ESLint8存在上游停止维护提示；后续应独立升级检查工具，未把弃用提示抹去。
