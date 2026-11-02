# Aditya Manjrekar, Portfolio

Live site: https://manjrekadi.github.io

Personal portfolio for my MSc research and engineering work. Built with Next.js (static export), TypeScript, Tailwind CSS, and Framer Motion, and deployed to GitHub Pages with GitHub Actions.

## Credit

The design, layout, and animations (including the cursor build intro) come from [Krishi Shah's portfolio](https://github.com/krishi-shah/krishi-shah.github.io), reused with his permission. I changed the palette to blue, replaced all content with my own, and rebuilt the project case study pages.

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Editing content

- `data/site.json`: name, bio, links, hero stats, status line, and optional `portrait` and `resume` paths
- `data/projects.json`: projects; each one gets a case study page at `/projects/<slug>/`
- `components/ExperienceSection.tsx`, `components/AboutSection.tsx`, `components/RecognitionSection.tsx`: experience, education, toolkit, and milestones

To add a photo, put it in `public/images/` and set `"portrait": "/images/portrait.webp"`. A cutout on a transparent background looks best. To add a resume, put it at `public/resume.pdf` and set `"resume": "/resume.pdf"`. The download links stay hidden until those fields are set.

## Deployment

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds the static site into `./out` and publishes it to GitHub Pages. In the repo settings, Pages must have its source set to GitHub Actions.

```bash
npm run build   # static site in ./out
```
