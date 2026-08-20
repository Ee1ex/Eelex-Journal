export const publicProfile = {
  name: "Eelex",
  role: "兴趣使然的个人开发者",
  introduction: "在代码、界面与持续学习之间，记录那些值得反复推敲的小发现。",
  learningFocus: ["前端工程", "界面设计", "内容表达"],
  skills: ["TypeScript", "React", "CSS", "设计系统"],
  avatar: {
    src: "/ee1ex-github-avatar.png",
    alt: "Eelex 的 GitHub 头像",
  },
  contacts: [
    {
      label: "GitHub",
      href: "https://github.com/Ee1ex",
      external: true,
    },
  ],
  projects: [
    {
      label: "GitHub 项目",
      description: "查看 Eelex 已公开的代码与实验",
      href: "https://github.com/Ee1ex",
      external: true,
    },
  ],
  feedback: {
    label: "通过 GitHub 反馈",
    href: "https://github.com/Ee1ex",
    external: true,
  },
} as const;
