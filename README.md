# Telegram Seed Enticement

## 在 Netlify 部署

1. 安装依赖并构建
```bash
npm ci
npm run build
```

2. 配置文件（已在仓库根目录）
- `netlify.toml`
  - build: `npm run build`
  - publish: `.next`
  - plugins: `@netlify/plugin-nextjs`

3. 连接仓库部署
- 在 Netlify 控制台：Add new site → Import an existing project → 选择你的仓库
- Build command: `npm run build`
- Publish directory: `.next`
- 其余保持默认 → Deploy

4. 本地联动预览（可选）
```bash
npx netlify-cli login
npx netlify dev
```

5. 验证
- 页面携带 `?seed=` 参数访问
- 点击“下载”，应触发 `/api/download?seed=xxx` 并以 `telegram-for-xxx.exe` 文件名保存

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
