# Lotus Global School - Developer & Agent Guidelines

## ⚠️ CRITICAL RULE: Sync Live CMS Content Before Any Git Push
The school client ("Ma'am") edits website content (banners, text, notices, faculty, documents, desks, etc.) directly on the live production CMS at `https://lotusglobalschool.com/#admin`.
These edits are stored in the cloud database (Neon PostgreSQL).

**MANDATORY PROTOCOL:**
1. Before committing or running `git push` to GitHub, you **MUST ALWAYS** run:
   ```bash
   npm run pull-content
   ```
2. If `src/data/siteData.json` has changed, stage and commit the updated file along with your code:
   ```bash
   git add src/data/siteData.json
   git commit -m "sync: Pull live CMS edits from client into local data"
   ```
3. Only after `src/data/siteData.json` is synced and committed, proceed to push:
   ```bash
   git push origin main
   ```

**NEVER** push without running `npm run pull-content` first, as doing so will overwrite Ma'am's live website edits with stale local data.
