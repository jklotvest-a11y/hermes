# 孔小洁 Jessie · Portfolio

个人求职作品集网站。做了 8 年空间设计，今年开始折腾一些新的事——正在学怎么做 AI 产品经理，喜欢动手把想法变成能用的小工具。

🔗 线上地址：[Coming Soon](#)

---

## ✨ 板块

- **About** — 自我介绍
- **Skills** — 技能
- **Experience** — 经历
- **Works** — 作品集（VIBE CODING / SPATIAL DESIGN 两个 Tab）
- **Contact** — 联系方式

---

## 📂 目录结构

```
.
├── index.html      # 页面入口
├── css/
│   └── style.css   # 全部样式
├── js/
│   └── main.js     # 交互脚本（Works Tab 切换）
├── LICENSE         # MIT 协议
└── README.md       # 本文件
```

---

## 🛠 技术栈

- **HTML5** — 语义化结构
- **CSS3** — 原生样式，Flexbox + Grid 布局，响应式设计
- **Vanilla JavaScript** — 无任何依赖，纯原生 JS
- **字体** — 微软雅黑（中文） / 无衬线（英文）

设计风格：雾蓝 + 灰白，留白克制，卡片柔和。

---

## 🚀 本地预览

直接双击 `index.html` 即可在浏览器打开，无需任何构建步骤。

或者在终端运行：

```bash
# macOS
open index.html

# 或启动一个简单的本地服务器
python3 -m http.server 8000
# 然后访问 http://localhost:8000
```

## 🧠 家plus MiniMax 后端部署

如果要让家plus Demo 真实调用 MiniMax 生成改造图，可以把本仓库部署为 Render Web Service。

Render 设置：

```text
Build Command:
npm install

Start Command:
npm start
```

环境变量：

```text
MINIMAX_API_KEY=你的 MiniMax API Key
MINIMAX_IMAGE_MODEL=image-01
CORS_ORIGIN=你的个人网站域名
```

部署完成后先访问：

```text
https://你的服务名.onrender.com/health
```

如果返回 `{"ok":true,"minimaxConfigured":true}`，说明后端已经可以读取 MiniMax Key。

然后把家plus Demo 的 API 地址配置到：

```text
demos/jiaplus/config.js
```

示例：

```js
window.JIAPLUS_API_BASE_URL = "https://你的服务名.onrender.com";
```

---

## 📝 TODO

- [ ] 上传头像照片
- [ ] 替换自我介绍占位文字
- [ ] 替换技能标签
- [ ] 替换经历内容
- [ ] 替换作品集占位（上传真实项目 + 截图）
- [ ] 替换联系方式（邮箱 / GitHub / 微信）
- [ ] 部署到线上（GitHub Pages / Vercel / Netlify）

---

## 📄 License

[MIT](./LICENSE) © 2026 Kong Xiaojie
