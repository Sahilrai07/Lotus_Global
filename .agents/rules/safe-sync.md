# Safe Sync Rule for Lotus Global School

Before pushing any changes to Git or deploying:
1. Always run `npm run pull-content` to pull the latest live edits made by the client ("Ma'am") from Neon DB into `src/data/siteData.json`.
2. Commit `src/data/siteData.json` so local code remains synchronized.
3. Only then push to `origin main`.
