export const labels: Record<
  "zh" | "en",
  {
    about: string;
    journey: string;
    resume: string;
    personal: string;
    skills: string;
    work: string;
    edu: string;
    connect: string;
    projects: string;
    name: string;
    location: string;
    email: string;
    available: string;
    experience: string;
    languages: string;
    interests: string;
    journeyText: string;
  }
> = {
  zh: {
    about: "About Me",
    journey: "我的经历",
    resume: "简历",
    personal: "个人信息",
    skills: "技术栈",
    work: "工作经历",
    edu: "教育背景",
    connect: "联系我",
    projects: "项目经历",
    name: "姓名",
    location: "所在地",
    email: "邮箱",
    available: "可合作形式",
    experience: "工作年限",
    languages: "语言",
    interests: "兴趣",
    journeyText:
      "在探索多元兴趣后，我选择投身前端研发。热衷用工程化与设计思维解决实际问题，持续打磨可维护、可复用、可观测的前端系统。",
  },
  en: {
    about: "About Me",
    journey: "My Journey",
    resume: "Resume",
    personal: "Personal Information",
    skills: "Technical Skills",
    work: "Work Experience",
    edu: "Education",
    connect: "Let's Connect",
    projects: "Projects",
    name: "Name",
    location: "Location",
    email: "Email",
    available: "Available for",
    experience: "Experience",
    languages: "Languages",
    interests: "Interests",
    journeyText:
      "After exploring diverse interests, I committed to frontend engineering—building maintainable, reusable and observable web systems to solve real problems.",
  },
};

export const skills = [
  { zh: "React", en: "React" },
  { zh: "TypeScript", en: "TypeScript" },
  { zh: "Next.js", en: "Next.js" },
  { zh: "Node.js", en: "Node.js" },
  { zh: "Python", en: "Python" },
  { zh: "MongoDB", en: "MongoDB" },
  { zh: "PostgreSQL", en: "PostgreSQL" },
  { zh: "Docker", en: "Docker" },
  { zh: "AWS", en: "AWS" },
  { zh: "Git", en: "Git" },
  { zh: "Tailwind CSS", en: "Tailwind CSS" },
  { zh: "Ant Design", en: "Ant Design" },
];

export const experiences = [
  {
    role: {
      zh: "前端开发工程师（智能驾驶）",
      en: "Frontend Engineer (Autonomous Driving)",
    },
    company: { zh: "商汤科技", en: "SenseTime" },
    period: "2019.06 – Present",
    description: {
      zh: "负责商汤智能驾驶云控与运营平台的前端整体交付，主导 React/Vue/TypeScript 技术栈建设与工程规范（私有 npm 组件、Git hooks、ESLint/Prettier、Docker 发布），并在地图/实时通信/可视化等核心模块落地。对外支撑 ToB 场景，对内沉淀可复用能力。",
      en: "Owned end‑to‑end delivery of SenseTime’s AD Cloud Control & Ops platforms, leading React/Vue/TypeScript stack and engineering standards (private npm components, Git hooks, ESLint/Prettier, Docker releases) while shipping core modules for maps, realtime comms and analytics. Delivered reusable capabilities for both internal and B2B use.",
    },
    projects: [
      {
        name: {
          zh: "自动驾驶运营平台",
          en: "Autonomous Driving Operations Platform",
        },
        company: { zh: "商汤科技", en: "SenseTime" },
        period: "2022 – 2024",
        tech: [
          { zh: "React", en: "React" },
          { zh: "TypeScript", en: "TypeScript" },
          { zh: "Ant Design", en: "Ant Design" },
          { zh: "ECharts", en: "ECharts" },
          { zh: "WebSocket", en: "WebSocket" },
          { zh: "RTSP", en: "RTSP" },
          { zh: "Baidu Map GL", en: "Baidu Map GL" },
        ],
        highlights: {
          zh: [
            "实时展示车辆位置、运营数据与视频流，提高调度与运维效率",
            "基于 bmapgl 实现车辆移动、渐变轨迹、区域高亮及覆盖物交互",
            "ECharts 构建饼图/柱状图/仪表盘等可视化，支持条件筛选与联动",
            "落地 WebSocket 长连接稳定重连与心跳（ping-pong）",
            "Node 侧封装大文件分片上传组件，支持断点续传",
          ],
          en: [
            "Real‑time vehicle location, ops metrics and live video to improve dispatch & operations",
            "Implemented vehicle movement, gradient tracks, region highlighting and overlays on bmapgl",
            "Built analytics (pie/bar/gauge) with ECharts, supporting filters and cross‑chart linking",
            "Hardened WebSocket connection with reconnection and ping‑pong heartbeats",
            "Implemented chunked uploads with resume support on Node.js",
          ],
        },
      },
      {
        name: {
          zh: "云控平台（车路云一体化）",
          en: "Cloud Control Platform (Vehicle‑Road‑Cloud)",
        },
        company: { zh: "商汤科技", en: "SenseTime" },
        period: "2020 – 2022",
        tech: [
          { zh: "Vue", en: "Vue" },
          { zh: "TypeScript", en: "TypeScript" },
          { zh: "Pinia", en: "Pinia" },
          { zh: "Element Plus", en: "Element Plus" },
          { zh: "Docker", en: "Docker" },
        ],
        highlights: {
          zh: [
            "从 0‑1 搭建后台：布局/路由/权限、请求与 store 封装",
            "通过 Git hook + ESLint/TS/Prettier 统一提交与代码风格",
            "配合运维优化 Docker 构建与部署流程，缩短发布时延",
          ],
          en: [
            "Bootstrapped admin from scratch: layout/routing/ACL, request & store abstractions",
            "Standardized commits & code style via Git hooks + ESLint/TS/Prettier",
            "Optimized Docker build & release flow with DevOps to reduce deployment latency",
          ],
        },
      },
    ],
  },
  {
    role: { zh: "前端开发工程师", en: "Frontend Engineer" },
    company: { zh: "砼车信息技术有限公司", en: "Concrete Truck InfoTech Co." },
    period: "2019.07 – 2021.05",
    description: {
      zh: "负责公司 B 端地图与 ERP 后台的前端交付与迭代，独立完成 Vue+Element 的 0‑1 搭建与工程优化，并联动后端/小程序完成业务闭环。",
      en: "Delivered the company’s B‑side map and ERP admin UIs, bootstrapping Vue+Element from 0‑1 with build optimizations, and partnering with backend/mini‑program teams to complete the business loop.",
    },
    projects: [
      {
        name: {
          zh: "搅拌车监管调度平台（ERP/地图）",
          en: "Concrete Truck Dispatch (ERP & Map)",
        },
        company: {
          zh: "砼车信息技术有限公司",
          en: "Concrete Truck InfoTech Co.",
        },
        period: "2019.07 – 2021.05",
        tech: [
          { zh: "Vue", en: "Vue" },
          { zh: "Element UI", en: "Element UI" },
          { zh: "AMap", en: "AMap" },
          { zh: "PHP", en: "PHP" },
          { zh: "MySQL", en: "MySQL" },
        ],
        highlights: {
          zh: [
            "独立完成从 0‑1 的前端架构与迭代，交付登录/CRUD 等核心功能",
            "实现高德地图标记、轨迹回放、聚合与信息窗等",
            "接入腾讯 IM，自定义语音消息协议，支持 Web 端录制与发送",
          ],
          en: [
            "Owned 0‑1 frontend architecture & iterations; delivered auth/CRUD and core flows",
            "Implemented AMap markers, track playback, clustering and info windows",
            "Integrated Tencent IM with a custom voice message protocol for web recording/sending",
          ],
        },
      },
      {
        name: {
          zh: "微信小程序（订单/支付/通知）",
          en: "WeChat Mini‑Program (Orders/Pay/Notifications)",
        },
        company: {
          zh: "砼车信息技术有限公司",
          en: "Concrete Truck InfoTech Co.",
        },
        period: "2020 – 2021",
        tech: [
          { zh: "微信小程序", en: "WeChat Mini‑Program" },
          { zh: "Node.js", en: "Node.js" },
          { zh: "微信支付", en: "WeChat Pay" },
        ],
        highlights: {
          zh: [
            "实现订单列表、个人中心、下单流程与服务通知",
            "联调微信支付，完善下单‑支付‑配送闭环",
          ],
          en: [
            "Shipped order list, profile, checkout flow and service notifications",
            "Integrated WeChat Pay to complete the order‑pay‑delivery loop",
          ],
        },
      },
    ],
  },
];

export const education = [
  {
    degree: { zh: "英语本科", en: "B.A. in English" },
    school: { zh: "上海师范大学", en: "Shanghai Normal University" },
    period: "2015.09 – 2019.06",
    description: {
      zh: "英语专八，能流畅阅读英文技术文档与进行英文沟通。",
      en: "TEM-8; comfortable reading technical documentation and communicating in English.",
    },
  },
];
export const personalStory = {
  gapReason: {
    zh: `这段时间我在技术上基本是停滞的。一开始面试的时候还挺自信，可能是因为“无知者无畏”，觉得自己学得快，就敢去试。但接触得越多，就越发现自己不懂的东西太多了，学习清单无限延长，慢慢就有了恐惧感——怕能力不够，怕永远学不完。我还总给自己定一些不切实际的目标，比如“一天看懂 React 源码”，结果当然做不到，反而变得不太敢尝试。完美主义让我在焦虑的时候更容易去刷短视频消磨时间，虽然偶尔也能学到点东西，但很快被冲淡。

后来我意识到，自己对前端的兴趣其实一直在，只是被“应试思维”和外界的声音盖住了。父亲去世之后，我的动力一度降到最低，他虽然不算亲密，但陪伴了我大部分人生，也在某种程度上让我希望让他骄傲。失去这个目标后，我花了很长时间去找回自己的节奏。`,
    en: `During this gap, I was basically stagnant in terms of tech. Early on, I was quite confident—maybe "ignorance is bliss"—thinking I learn fast so I could just go for interviews. But the more I saw, the more I realized how much I didn’t know. My to-learn list kept growing, and I started feeling afraid—afraid I wasn’t capable enough, afraid I’d never catch up. I often set unrealistic goals for myself, like “master React source code in a day,” and of course, I’d fail, which made me hesitant to even try. Perfectionism made it easier to waste time on short videos when I felt anxious, and even if I learned something small, it didn’t stick.

Later I realized my interest in frontend never really left—it was just buried under "exam-mode thinking" and outside noise. After my father passed away, my motivation dropped to its lowest. We weren’t very close, but he had been there for most of my life, and in some way, I wanted to make him proud. Losing that goal took me a long time to recover from.`,
  },
  whyMajor: {
    zh: `我原本是文科转前端，但理科底子不差。高考时，父亲强烈希望我读师范，因为稳定、体面。那时候上海的师范选择只有两所：华师大（免费但要签约，不当老师要赔）和上师大（不签约，毕业当老师还能退学费）。我不想做老师，但也不清楚自己想要什么，于是第一志愿填了上师大分数最高的英语专业，第二填计算机师范，分差 30 分。现在回头看，这个选择至少给自己留了后路，没有把自己锁死在不喜欢的职业上。`,
    en: `I switched from liberal arts to frontend, but I’ve always had a decent science background. In the college entrance exam, my father strongly wanted me to study education—for stability and respectability. Back then in Shanghai, there were only two teacher-training options: ECNU (free tuition but requires a contract, with penalties if you don’t teach) and SHNU (no contract, tuition refund if you teach after graduation). I didn’t want to be a teacher, but I also didn’t know what I wanted. So I put SHNU’s highest-scoring English major as my first choice, and Computer Science Education as my second, with a 30-point gap. Looking back, that at least gave me a backup plan—I didn’t lock myself into a career I didn’t like.`,
  },
  careerThoughts: {
    zh: `我不是特别勤奋的人，读书时更多靠小聪明应付考试，但转到前端这条路并不轻松。我经历过“不要上海户口、不要 985、不要非科班”这些限制。我理解企业会要 React 源码、LeetCode 这些要求，因为掌握底层原理后，解决问题的思路更广，代码结构也更清晰。现在我在尝试放下单纯的结果导向，把更多精力放在打好基础、优化思路、享受探索的过程。`,
    en: `I’m not the most hardworking person—back in school, I mostly relied on quick thinking to get through exams—but switching to frontend wasn’t easy. I faced limitations like “no Shanghai household registration, no 985, no non-CS background.” I understand why companies value React source code and LeetCode skills—once you master the fundamentals, you get more ways to solve problems and write cleaner code. Now, I’m trying to let go of a purely results-driven mindset and put more focus on building strong foundations, refining my thinking, and enjoying the process of exploring.`,
  },
};
